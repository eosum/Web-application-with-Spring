import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import formSlice from '../features/formHandler/formSlice';
import tableSlice from '../features/tableHandler/tableSlice';

//store - хранилище состояния всего приложения
//Каждый компонент имеет доступ к этому хранилищу, так что нет необходимости передавать пропы из одного компонента в другой
// или в использовании контекста. Существует 3 основных строительных блока: хранилище, редукторы (reducers) и операции (actions).

export const store = configureStore({
	reducer: {
		formHandler: formSlice,
		auth: authSlice,
		tableHandler: tableSlice
	}
});