'use client'

import React from 'react'
import { useState, useEffect } from 'react'

const LoginPage = () => {
	const [loginData, setLoginData] = useState({});
	const handleSubmit = (e: any) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		setLoginData(data);
		window.location.href = '/trial';
	}
	useEffect(() => {
		console.log('loginData:', loginData);
	}, [loginData])
	return (
		<main>
			<form onSubmit={handleSubmit}>
				<label>
					Participant ID:
					<input type="text" name="participantID" />
				</label>
				<br />
				<label>
					Session Number:
					<input type="text" name="sessionNumber" />
				</label>
				<br />
				<button type="submit">
					Login
				</button>
			</form>
		</main>
	)
}

export default LoginPage
