// const BASE_URL = "https://api.leo-news.mooo.com";
const BASE_URL = "http://localhost:3000";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    `something goes wrong: ${res.status} ${res.statusText}`
  );
}

export async function register(email, password, username) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": BASE_URL,
    },
    body: JSON.stringify({
      name: username,
      password: password,
      email: email,
    }),
  });
  return checkResponse(res);
}

export async function logIn(email, password) {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": BASE_URL,
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  });
  return checkResponse(res);
}

export async function checkingTokenValidity(jwt) {
  if (!jwt) {
    throw new Error("Token is not valid");
  }

  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": BASE_URL,
      Authorization: `Bearer ${jwt}`,
    },
  });
  return checkResponse(response);
}
