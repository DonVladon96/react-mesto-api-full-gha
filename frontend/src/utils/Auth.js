class Auth {
	constructor(baseUrl) {
		this._baseUrl = baseUrl;
	}

	_getErrorFromServer(res) {
		return res.json().then((res) => {
			throw new Error(res.message);
		});
	}

	register( email, password ) {
		const url = `${this._baseUrl}/signup`;
		return fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		}).then(this._getResponse);
	}

	authorize( email, password ) {
		const url = `${this._baseUrl}/signin`;
		return fetch(url, {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		})
			.then(this._getResponse);
	}

	checkToken(jwt) {
		const url = `${this._baseUrl}/users/me`;
		return fetch(url, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				"Content-Type": "application/json",
				"Authorization" : `Bearer ${jwt}`
			}
		})
			.then(this._getResponse);
	}

	_getResponse(res) {
		if (!res.ok) {
			return Promise.reject(`Error: ${res.status} ${res.statusText}`);
		}
		return res.json();
	}
}



const auth = new Auth({url: 'https://api.donvladon.nomoredomains.rocks/' });

export default auth;
