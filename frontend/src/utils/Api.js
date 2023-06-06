import apiConfig from './apiConfig';

class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}users/me`, {
			method: 'GET',
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

	parseUserInfo({ name, about }) {
		return fetch(`${this._baseUrl}users/me`, {
			headers: this._headers,
			method: 'PATCH',
			body: JSON.stringify({ name, about })
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

	getInitialCards() {
		return fetch(`${this._baseUrl}cards`, {
			headers: this._headers
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

	updateUserAvatar({ avatar }) {
		return fetch(`${this._baseUrl}users/me/avatar`, {
			headers: this._headers,
			method: 'PATCH',
			body: JSON.stringify({ avatar })
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

	createCard(cardInfo) {
		return fetch(`${this._baseUrl}cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify(cardInfo)
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
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.catch((err) => {
				console.log(err);
			});
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
}

const api = new Api(apiConfig);

export default api;
