class Auth {
	constructor({ url }) {
		this._url = url;
	}

	authorize( email, password ) {
		return fetch(`${this._url}/signin`, {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		}).then(this._getResponse);
	}

	register( email, password ) {
		return fetch(`${this._url}/signup`, {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		}).then(this._getResponse);
	}

	checkToken(jwt) {
		return fetch(`${this._url}/users/me`, {
			method: "GET",
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



const auth = new Auth({ url: 'https://api.donvladon.nomoredomains.rocks' });

export default auth;
