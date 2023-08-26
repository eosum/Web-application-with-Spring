import React from 'react';

import '../css/Map.css';

import $ from 'jquery';
import { sendCoordinates } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { selectR, setFormError } from '../features/formHandler/formSlice';
import { selectRows } from '../features/tableHandler/tableSlice';

const coefficientX = 101;
const coefficientY = 101;

const width = 300;
const height = 300;

const circleSize = 4;

function Map() {

    const dispatch = useDispatch();

    const r = useSelector(selectR);

    const rows = useSelector(selectRows);


    const handleClick = (event) => {
        if (r === undefined) {
            dispatch(setFormError("Выберите радиус"));
            return;
        }

        if (r <= 0) {
            dispatch(setFormError("Радиус должен быть положительным"));
            return;
        }

        let canvas = $('canvas.map')[0];
        let coordinates = getMouseCoordinates(canvas, event, r);

        sendCoordinates(dispatch, Number(coordinates.x), -coordinates.y, r);
    }

    rows.forEach(element => {
        if (element.r === r && element.status !== "error") {
            drawCircle($('canvas.map')[0].getContext("2d"), element.x * coefficientX / r + 150,
            -element.y * coefficientY / r + 150,
            circleSize, element.status==="hit"?"green":"red");
        }
    });

    return (
        <div className='Map'>
            <canvas width={width} height={height} onClick={handleClick} className="map" />
            <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox={"0 0 " + width + " " + height}>
                <rect x="150" y="100" width="100" height = "50" fill = "#43F3D4" fillOpacity=".4"/>
                <path d = "M150 150 L 99 150 L 150 51" fill = "#43F3D4" fillOpacity=".4"/>
                <path d="M250 150 A 100 100 90 0 1 150 250" fill="#43F3D4" fillOpacity=".4"/>
                <path d="M150 150 L 250 150 L 150 250" fill="#43F3D4" fillOpacity=".4"/>
                <path d = "M150 20 L 150 280" stroke = "#000"/>
                <path d = "M20 150 L 280 150" stroke = "#000"/>
            </svg>
        </div>
    );
}

export function clearMap() {
    let canvas = $('canvas.map')[0];

    if (canvas === undefined) return;

    let ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, width, height);
}

function drawCircle(context, x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.stroke();

    context.fill();
}

function getMouseCoordinates(canvas, event, r) {
    let rect = canvas.getBoundingClientRect();

    let x = event.clientX - rect.left - 150;
    let y = event.clientY - rect.top - 150;

    x *= (r / coefficientX);
    y *= (r / coefficientY);

    return {
        "x": x.toFixed(3),
        "y": y.toFixed(3)
    };
}

export default Map;