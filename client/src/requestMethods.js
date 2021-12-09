import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxN2ZlYWQwYTEzOTlmMDkwMTI1MDlkOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNzcwODYwNiwiZXhwIjoxNjM3OTY3ODA2fQ.kWiOmJKKDjxRFLRUSYfPBNeJS_cqfQeeoI8hCeHk4A0";

export const publicRequest = axios.create(
	{
		baseUrl: BASE_URL,
	}
);

export const userRequest = axios.create(
	{
		baseUrl: BASE_URL,
		header: {token: `Token ${TOKEN}`}
	}
);