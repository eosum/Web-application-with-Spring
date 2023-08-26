import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Main from './components/Main';
import reportWebVitals from './reportWebVitals';
import './css/index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NotFound from './components/NotFound';
import Login from './components/Login';
import { goToLogin, goToMain, validateToken } from './utils';
import PrivateRoute from './components/PrivateRoute';
import 'primereact/resources/themes/lara-dark-blue/theme.css';
import 'primereact/resources/primereact.min.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<Router>
		<Provider store={store}>
			<Routes>
				<Route index path = '/' element = {<PrivateRoute element = {<Main />} accessFunction = {HaveAccess} onFail = {goToLogin}/>}/>
				<Route path = '/login' element = {<PrivateRoute element = {<Login />} accessFunction = {HaveNotToken} onFail = {goToMain}/>} />

				<Route path = '*' element = {<NotFound />} />
			</Routes>
		</Provider>
	</Router>
);

async function HaveAccess() {
	let isHaveAccess = undefined;
	await validateToken()
		.then((result) => {
			if (!result) {
				window.localStorage.removeItem("jwt-token");
				return false;
			}
			return true;
		})
		.then((result) => {
			isHaveAccess = result;
		})
		.catch(() => {
			isHaveAccess = false;
		});
	
	return isHaveAccess;
}

async function HaveNotToken() {
	let isHaveToken = undefined;

	await HaveAccess()
		.then((result) => {
			isHaveToken = result;
		})
		.catch(() => {
			isHaveToken = false;
		});
		

	return !isHaveToken;
}

reportWebVitals();
