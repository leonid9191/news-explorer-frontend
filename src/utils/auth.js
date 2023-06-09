const BASE_URL = "https://api.news-leo.mooo.com";
// const BASE_URL = "http://localhost:3000";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    `Something goes wrong: ${res.status} ${res.statusText}`
  );
}

export async function register(email, password, username) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json",
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
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email
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
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  return checkResponse(response);
}
