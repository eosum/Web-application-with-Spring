import React, {useState} from "react";
import {Button} from 'primereact/button';
import AuthField from "./AuthField";
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrorMessage, selectErrorMessage, selectIsLogin, selectLogin,
    selectPassword, setErrorMessage, switchIsLogin
} from "../features/auth/authSlice";
import {returnBack, serverAPIPath, saveTokenInStorage } from "../utils";
import AppBar from "react-toolbox/lib/app_bar/AppBar";

import "../css/Login.css";

function Login() {

    const isLogin = useSelector(selectIsLogin);
    const login = useSelector(selectLogin);
    const password = useSelector(selectPassword);
    const errorMessage = useSelector(selectErrorMessage);

    const [namePage, setNamePage] = useState("Log in");

    let buttonInfo = { name: undefined, action: undefined };
    let switchButtonInfo = undefined;

    const dispatch = useDispatch();

    const validateFields = () => {
        if (login === "" || login === undefined) {
            dispatch(setErrorMessage("Логин не может быть пустым"));
            return false;
        }

        if (password === "" || password === undefined) {
            dispatch(setErrorMessage("Пароль не может быть пустым"));
            return false;
        }

        if (password.length < 6) {
            dispatch(setErrorMessage("Пароль должен состоять из не менее 6 символов"));
            return false;
        }

        return true;
    };

    const getTokenByLogin = () => {
        clearErrorMessage();
        if (!validateFields()) return;

        fetch(serverAPIPath + "/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login: login, password: password })
        })
            .then(
                (result) => {
                    if (result.ok) {
                        result.text().then(
                            (text) => { saveTokenInStorage(text); }
                        );
                        returnBack();
                    }
                    else {
                        if (result.status === 504) dispatch(setErrorMessage("Сервер недоступен"));
                        else
                            result.text().then(
                                (text) => { dispatch(setErrorMessage(JSON.parse(text).message)) }
                            );
                    }
                })
            .catch(() => {
                dispatch(setErrorMessage("Сервер недоступен"));
            });
    };

    const getTokenByRegister = () => {
        clearErrorMessage();
        if (!validateFields()) return;

        fetch(serverAPIPath + "/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login: login, password: password })
        })
            .then(
                (result) => {
                    if (result.ok) {
                        result.text().then(
                            (text) => { saveTokenInStorage(text); }
                        );

                        returnBack();
                    }
                    else {
                        if (result.status === 504)
                            dispatch(setErrorMessage("Сервер недоступен"));
                        else
                            result.text().then(
                                (text) => { dispatch(setErrorMessage(JSON.parse(text).message)) }
                            );
                    }
                })
            .catch(() => {
                dispatch(setErrorMessage("Сервер недоступен"));
            });
    };

    if (isLogin) {
        buttonInfo = { name: "Sign in", action: getTokenByLogin };
        switchButtonInfo = "Switch to register";
        clearErrorMessage();
    }
    else {
        buttonInfo = { name: "Sign up", action: getTokenByRegister };
        switchButtonInfo = "Switch to log in";
        clearErrorMessage();
    }

    return (
        <div className="Login">
            <AppBar title="Karaulova Anastasia P32111. Variant: 117347"/>
            <div className= "authPanel">
                <h2>{namePage}</h2>
                <AuthField/>
                <Button className = "authBtn" label={buttonInfo.name} onClick={() => buttonInfo.action()} />
                <Button label={switchButtonInfo} onClick={() => {
                    dispatch(switchIsLogin());
                    setNamePage(namePage === "Log in" ? "Sign up" : "Log in");
                }} />
                <p className="errorMessage">{errorMessage}</p>
            </div>
        </div>
    );
}

export default Login;