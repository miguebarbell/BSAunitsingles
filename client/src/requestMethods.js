import axios from 'axios';

// const BASE_URL = "http://localhost:5000/api/";
// to heroku

// const BASE_URL = "http://bsaserver.herokuapp.com:5000";
// const BASE_URL = "https://bsaserver.herokuapp.com/api/";
const BASE_URL = (process.env.NODE_URL === 'production' ? "http://localhost:5000/" : "https://bsaserver.herokuapp.com/")
// if (process.env.NODE_ENV !== 'production') {
// 	const BASE_URL = "http://localhost:5000/api/";
// }
// const BASE_URL = "https://bsaserver.herokuapp.com:5000/api/";
// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxN2ZlYWQwYTEzOTlmMDkwMTI1MDlkOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNzcwODYwNiwiZXhwIjoxNjM3OTY3ODA2fQ.kWiOmJKKDjxRFLRUSYfPBNeJS_cqfQeeoI8hCeHk4A0";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;


export const userRequest = axios.create(
    {
        baseURL: BASE_URL,
        // baseUrl: 'http://bsaserver.herokuapp.com/api',
        headers: {token: `Bearer ${TOKEN}`}
    }
);

export const publicRequest = axios.create({
    baseURL: BASE_URL,
    // baseUrl: 'http://bsaserver.herokuapp.com/api',
});
