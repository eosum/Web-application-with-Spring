import {setRows} from "./features/tableHandler/tableSlice";
import { clearFormError, setFormError } from "./features/formHandler/formSlice";
import { clearMap } from "./components/Map";

export const serverAPIPath = "http://localhost:8081/api";

export function returnBack() {
    window.location.href = document.referrer;
}
export function goToLogin() {
    window.location.replace("/login");
}
export function goToMain() {
    window.location.replace("/");
}

export async function validateToken() {
    let jwtToken = window.localStorage.getItem("jwt-token");
    if (jwtToken === undefined) return false;
    let isTokenCorrect = false;
    await fetch(serverAPIPath + "/token-validation?token=" + jwtToken, {
        method: "GET",
        headers: {
            Authentication: "Bearer " + jwtToken
        }
    })
        .then(
            async (result) => {
                if (result.ok) {
                    isTokenCorrect = true;
                    await result.text().then((text) => {
                        isTokenCorrect = text === "true";
                    });
                }
            }
        );
    return isTokenCorrect;
}

export function getAllPoints(dispatch) {
    clearMap();
    fetch(serverAPIPath + "/secure/points", {
        method: "GET",
        headers: { "Content-Type": "application/json", Authentication: "Bearer " + window.localStorage.getItem("jwt-token") }
    })
        .then(
            (result) => {
                if (result.ok) {

                    result.text().then(
                        (text) => { dispatch(setRows(JSON.parse(text))); }
                    );
                }
                else if (result.status === 504)
                    dispatch(setFormError("Сервер недоступен"));
                else if (result.status === 401)
                    dispatch(setFormError("У вас нет доступа к серверу. Пройдите авторизацию"));
                else
                    result.text().then(
                        (text) => { dispatch(setFormError(JSON.parse(text).message)) }
                    );
            })
        .catch(() => {
            dispatch(setFormError("Сервер недоступен"));
        });
};


export function sendCoordinates(dispatch, x, y, r) {
    dispatch(clearFormError());

    fetch(serverAPIPath + "/secure/addpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authentication: "Bearer " + window.localStorage.getItem("jwt-token") },
        body: JSON.stringify({ x: x, y: y, r: r })
    })
        .then(
            (result) => {
                if (result.ok) {
                    getAllPoints(dispatch);
                }
                else if (result.status === 401)
                    dispatch(setFormError("У вас нет доступа к серверу. Пройдите авторизацию"));
                else if (result.status === 504)
                    dispatch(setFormError("Сервер недоступен"));
                else {
                    result.text().then(
                        (text) => { dispatch(setFormError(JSON.parse(text).message)) }
                    );
                }
            })
        .catch(() => {
            dispatch(setFormError("Сервер недоступен"));
        });
}

export function saveTokenInStorage(token) {
    window.localStorage.setItem("jwt-token", token);
}