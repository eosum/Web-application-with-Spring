import React, {useState} from 'react';

import "../css/Form.css";

import {Button} from 'primereact/button';
import {Slider} from "primereact/slider";
import {selectFormError, setR} from '../features/formHandler/formSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPoints, sendCoordinates } from '../utils';
import validation from "../validation/validation";


function Form() {
    const [x, setValueX] = useState(0);
    const [y, setValueY] = useState(0);
    const [r, setValueR] = useState(0);

    const formError = useSelector(selectFormError);

    const dispatch = useDispatch();

    getAllPoints(dispatch);
    const sendCoordinatesByForm = () => {
        if (!validation(x, y, r, dispatch)) return;
        sendCoordinates(dispatch, x, y, r);
    }

    return (
        <div className='Form'>
            <form>
                <h5>X Coordinate: {x}</h5>
                <Slider value = {x}
                        onChange = {(e) => setValueX(e.value)}
                        step = {0.5}
                        min = {-2} max = {2}
                />

                <h5>Y Coordinate: {y}</h5>
                <Slider value = {y}
                        onChange = {(e) => setValueY(e.value)}
                        min = {-5} max = {5}
                />

                <h5>R: {r}</h5>
                <Slider value = {r}
                        onChange = {(e) => {
                            setValueR(e.value);
                            dispatch(setR(e.value));
                        }}
                        step = {0.5}
                        min = {-2} max = {4}
                />
                <Button type="submit" className = "submitBtn" label="Send" onClick={(event) => {event.preventDefault(); sendCoordinatesByForm();} } raised />
            </form>
            <p className='errorMessage'>{formError}</p>
        </div>
    );
}

export default Form;