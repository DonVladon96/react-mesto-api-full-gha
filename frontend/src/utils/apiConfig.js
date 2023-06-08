const token = '8449ac58-7a24-4246-806a-a59752bbc1d5';

const apiConfig = {
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60/',
	headers: {
		authorization: token,
		'Content-Type': 'application/json'
	}
};

export default apiConfig;
