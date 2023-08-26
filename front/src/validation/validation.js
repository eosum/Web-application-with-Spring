import {setFormError} from "../features/formHandler/formSlice";

export default function validation(x, y, r, dispatch) {

    if (x === undefined) {
        dispatch(setFormError("Выберете координату x"));
        return false;
    }

    if (y === undefined) {
        dispatch(setFormError("Введите координату y"));
        return false;
    }

    if (r === undefined) {
        dispatch(setFormError("Выберете радиус"));
        return false;
    }

    if (x < -2) {
        dispatch(setFormError("Координата X должна быть больше либо равна -2"));
        return false;
    }

    if (x > 2) {
        dispatch(setFormError("Координата X должна быть больше либо равна 2"));
        return false;
    }

    if (y < -5) {
        dispatch(setFormError("Координата Y должна быть больше либо равна -5"));
        return false;
    }
    if (y > 5) {
        dispatch(setFormError("Координата Y должна быть меньше либо равна 5"));
        return false;
    }

    if (r <= 0) {
        dispatch(setFormError("Радиус - положительное число"));
        return false;
    }

    return true;
}