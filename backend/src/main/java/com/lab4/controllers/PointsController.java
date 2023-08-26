package com.lab4.controllers;

import com.lab4.data.Point;
import com.lab4.repository.PointRepository;
import com.lab4.services.*;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.time.ZonedDateTime;
import java.util.List;

@RestController
@RequestMapping(value = "/api/secure/")
public class PointsController {

    private final HeadersService headersService;
    private final AuthService authService;
    private final ValidationService validationService;
    private final HitCheckService hitCheckService;
    private final PointRepository pointsDAO;

    @Autowired
    public PointsController(HeadersService headersService,
                            AuthService authService,
                            ValidationService validationService,
                            HitCheckService hitCheckService,
                            PointRepository pointsDAO) {
        this.headersService = headersService;
        this.authService = authService;
        this.validationService = validationService;
        this.hitCheckService = hitCheckService;
        this.pointsDAO = pointsDAO;
    }

    @PostMapping(value = "/addpoint", consumes = "application/json")
    public void addPoint(@RequestBody PointBody pointBody, HttpServletRequest request) {

        String jwt = headersService.getJWTFromHeader(request).get(); // фильтр гарантирует существование jwt

        long startTime = System.currentTimeMillis();
        Point point = new Point();

        if (validationService.validateInputData(pointBody.x, pointBody.y, pointBody.r)) {
            boolean result = hitCheckService.checkCoordinates(pointBody.x, pointBody.y, pointBody.r);
            point.setStatus(result ? "hit" : "no hit");
        }
        else point.setStatus("error");

        point.setX(pointBody.x);
        point.setY(pointBody.y);
        point.setR(pointBody.r);

        point.setDate(ZonedDateTime.now());

        point.setExecution(System.currentTimeMillis() - startTime);

        point.setOwner(authService.decodeJWT(jwt).getClaim("login").asString());

        try {
            pointsDAO.save(point);
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Ошибка базы данных на сервере");
        }
    }

    @GetMapping("/points")
    public List<Point> getPoints(HttpServletRequest request) {

        String jwt = headersService.getJWTFromHeader(request).get(); // фильтр гарантирует существование jwt

        return pointsDAO.findAllByOwner(authService.decodeJWT(jwt).getClaim("login").asString());
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    private static class PointBody {
        private double x;
        private double y;
        private double r;
    }
}
