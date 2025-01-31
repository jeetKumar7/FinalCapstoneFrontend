const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const register = async (data) => {
  const response = await fetch(`${BACKEND_URL}/api/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.status === 200 || response.status == 400) {
    return response.json();
  }
  throw new Error("Something went wrong!");
};

export const login = async (data) => {
  const response = await fetch(`${BACKEND_URL}/api/user/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.status === 200 || response.status == 400) {
    return response.json();
  }
  throw new Error("Something went wrong!");
};

export const getlinks = async () => {
  const response = await fetch(`${BACKEND_URL}/dashboard/links`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  if (response.status === 200) {
    return response.json();
  }
  throw new Error("Something went wrong!");
};

export const getUserDetails = async () => {
  const response = await fetch(`${BACKEND_URL}/api/user/getuser`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  if (response.status === 200) {
    return response.json();
  }
  throw new Error("Something went wrong!");
};

export const createShortUrl = async (data) => {
  const response = await fetch(`${BACKEND_URL}/api/url/shorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
  if (response.status === 200) {
    return response.json();
  }
  throw new Error("Something went wrong!");
};

export const editShortUrl = async (hash, data) => {
  const response = await fetch(`${BACKEND_URL}/api/url/edit/${hash}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
  if (response.status === 200) {
    return response.json();
  }
  throw new Error("Something went wrong!");
};

export const fetchShortUrl = async (hash) => {
  const response = await fetch(`${BACKEND_URL}/api/url/edit/${hash}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  if (response.status === 200) {
    return response.json();
  }
  throw new Error("Something went wrong!");
};
