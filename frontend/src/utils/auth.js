class Auth {
	constructor(baseUrl) {
		this._baseUrl = baseUrl;
	}

	_getErrorFromServer(res) {
		return res.json().then((res) => {
			throw new Error(res.message);
		});
	}

	register({ email, password }) {
		const url = `${this._baseUrl}/signup`;
		return fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		}).then((res) => {
			if (res.ok) return res.json();
			return this._getErrorFromServer(res);
		});
	}

	authorize({ email, password }) {
		const url = `${this._baseUrl}/signin`;
		return fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	checkToken(token) {
		const url = `${this._baseUrl}/users/me`;
		return fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}
}

const auth = new Auth('https://auth.nomoreparties.co');

export default auth;
