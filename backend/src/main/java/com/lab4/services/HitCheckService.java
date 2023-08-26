package com.lab4.services;

import org.springframework.stereotype.Service;

@Service
public class HitCheckService {

    public boolean checkCoordinates(double x, double y, double r) {
        return checkTriangle(x, y, r) || checkRectangle(x, y, r) || checkCircle(x, y, r);
    }

    private boolean checkTriangle(double x, double y, double r) {
        return (x <= 0 && y >= 0 && x >= -r/2 && y <= r && y <= 2 * x + r);
    }

    private boolean checkRectangle(double x, double y, double r) {
        return (x >= 0 && x <= r && y <= r / 2 && y >= 0);
    }

    private boolean checkCircle(double x, double y, double r) {
        return (x >= 0 && y <= 0 && x <= r && y >= -r && x * x + y * y <= r * r);
    }
}
