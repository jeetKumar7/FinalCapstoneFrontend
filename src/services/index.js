const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getTotalClicks = async () => {
  const response = await fetch(`${BACKEND_URL}/analytics/totalClicks`, {
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

export const getDateWiseClicks = async () => {
  const response = await fetch(`${BACKEND_URL}/analytics/dateWiseClicks`, {
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

export const getDeviceWiseClicks = async () => {
  const response = await fetch(`${BACKEND_URL}/analytics/deviceWiseClicks`, {
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

export const deleteUser = async () => {
  const response = await fetch(`${BACKEND_URL}/api/user/delete`, {
    method: "DELETE",
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

export const editUser = async (data) => {
  const response = await fetch(`${BACKEND_URL}/api/user/edit`, {
    method: "PUT",
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

export const getAnalytics = async () => {
  const response = await fetch(`${BACKEND_URL}/analytics/getAnalytics`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  console.log("Analytics in services");
  if (response.status === 200) {
    return response.json();
  }
  throw new Error("Something went wrong!");
};

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

export const deleteShortUrl = async (hash) => {
  const response = await fetch(`${BACKEND_URL}/api/url/delete/${hash}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  if (response.status === 200) {
    return response.json();
  }
  throw new Error("Something went wrong! in frontend");
};
