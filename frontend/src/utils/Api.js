

export default class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}users/me`, {
			headers: this._headers
		})
			.then((res) => this._getResponse(res))
	}

	parseUserInfo({ name, about }) {
		return fetch(`${this._baseUrl}users/me`, {
			headers: this._headers,
			method: 'PATCH',
			body: JSON.stringify({ name, about })
		})
			.then(this._getResponse);
	}

	getInitialCards() {
		return fetch(`${this._baseUrl}cards`, {
			headers: this._headers
		})
			.then(this._getResponse)
	}

	updateUserAvatar({ avatar }) {
		return fetch(`${this._baseUrl}users/me/avatar`, {
			headers: this._headers,
			method: 'PATCH',
			body: JSON.stringify({ avatar })
		})
			.then(this._getResponse);
	}

	updateUserInfo(userInfo) {
		return fetch(`${this._baseUrl}users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify(userInfo)
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	createCard({name, link}) {
		return fetch(`${this._baseUrl}cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({name, link})
		})
			.then(this._getResponse)
	}

	deleteCard(cardId) {
		return fetch(`${this._baseUrl}cards/${cardId}`, {
			method: 'DELETE',
			headers: this._headers
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	addLike(id, isLiked) {
		return fetch(`${this._baseUrl}cards/likes/${id}`, {
			method: isLiked ? 'PUT' : 'DELETE',
			headers: this._headers
		})
			.then(this._getResponse);
	}

	deleteLike(id) {
		return fetch(`${this._baseUrl}cards/likes/${id}`, {
			method: 'DELETE',
			headers: this._headers
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	_getResponse(res) {
		if (!res.ok) {
			return Promise.reject(`Error: ${res.status} ${res.statusText}`);
		}
		return res.json();
	}
}

