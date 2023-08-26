package com.lab4.services;

import org.springframework.stereotype.Service;

@Service
public class ValidationService {
    private final int minX = -2;
    private final int maxX = 2;

    private final double minY = -5;
    private final double maxY = 5;
    private final double maxR = 4;


    public boolean validateInputData(double x, double y, double r) {
        return isXCorrect(x) && isYCorrect(y) && isRCorrect(r);
    }

    private boolean isXCorrect(double x) {
        return minX <= x && x <= maxX;
    }

    private boolean isYCorrect(double y) {
        return minY <= y && y <= maxY;
    }

    private boolean isRCorrect(double r) {
        return r <= maxR && r > 0;
    }
}
