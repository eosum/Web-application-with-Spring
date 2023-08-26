package com.lab4.repository;

import com.lab4.data.Point;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PointRepository extends JpaRepository<Point, Long> {
    List<Point> findAllByOwner(String owner);
}
