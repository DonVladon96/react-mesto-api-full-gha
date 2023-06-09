export default class Api {
	constructor({ url, headers }) {
		this._url = url;
		this._headers = headers;
	}

	getInitialCards() {
		return fetch(`${this._url}/cards`, {
			headers: this._headers
		}).then(this._getResponse)
	}

	createCard({ name, link }) {
		return fetch(`${this._url}/cards`, {
			headers: this._headers,
			method: "POST",
			body: JSON.stringify({ name, link })
		})
			.then(this._getResponse)
	}

	deleteCard(id) {
		return fetch(`${this._url}/cards/${id}`, {
			headers: this._headers,
			method: "DELETE",
		})
			.then(this._getResponse)
	}

	deleteLike(id, isLiked) {
		return fetch(`${this._url}/cards/${id}/likes`, {
			headers: this._headers,
			method: isLiked ? "PUT" : "DELETE",
		})
			.then(this._getResponse)
	}

	getUserInfo() {
		return fetch(`${this._url}/users/me`, {
			headers: this._headers,
		})
			.then((res) => this._getResponse(res))
	}

	parseUserInfo({ name, about }) {
		return fetch(`${this._url}/users/me`, {
			headers: this._headers,
			method: "PATCH",
			body: JSON.stringify({ name, about })
		})
			.then(this._getResponse)
	}

	updateUserAvatar({ avatar }) {
		return fetch(`${this._url}/users/me/avatar`, {
			headers: this._headers,
			method: "PATCH",
			body: JSON.stringify({ avatar })
		})
			.then(this._getResponse)
	}
	toggleLike(id, isLiked) {
		return fetch(`${this._url}/cards/${id}/likes`, {
			headers: this._headers,
			method: isLiked ? "PUT" : "DELETE",
		})
			.then(this._getResponse)
	}

	_getResponse(res) {
		if (!res.ok) {
			return Promise.reject(`Error: ${res.status} ${res.statusText}`);
		}
		return res.json();
	}
}

