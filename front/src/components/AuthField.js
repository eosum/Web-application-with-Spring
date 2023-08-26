import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectLogin, selectPassword, setLogin, setPassword} from "../features/auth/authSlice";
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import '../css/Auth.css'

function AuthField() {

    const login = useSelector(selectLogin);
    const password = useSelector(selectPassword);

    const dispatch = useDispatch();

    return (
        <div className="Login">
            <span className = "p-float-label">
                <InputText required id = "login" value={login}
                           onChange={(e) => dispatch(setLogin(e.target.value))}/>
                <label htmlFor = "login">Username</label>
            </span>

            <span className = "p-float-label">
                <Password required id = "password" value={password}
                          onChange={(e) => dispatch(setPassword(e.target.value))}
                          minLength="6"
                          feedback={false}/>
                <label htmlFor = "password">Password</label>
            </span>
        </div>
    );
}



export default AuthField;