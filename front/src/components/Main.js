import React from 'react';

import '../css/Main.css';

import Form from './Form';
import Header from './Header';
import Map from './Map';
import MyTable from './MyTable';
import HitCount from "./HitCount";

function Main() {

	return (
		<div className="Main">
			<Header />
			<HitCount/>

			<div className='upperMenu'>
				<Map />
				<Form />
			</div>
			<MyTable />
		</div>
	); 
}

export default Main;