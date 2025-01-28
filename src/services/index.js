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

export const getJobs = async () => {
  const response = await fetch(`${BACKEND_URL}/api/job/getJobs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    return response.json();
  }
  throw new Error("Something went wrong!");
};

export const getJobDetails = async (id) => {
  const response = await fetch(`${BACKEND_URL}/api/job/getJob/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    return response.json();
  }
  throw new Error("Something went wrong!");
};

export const createJob = async (data) => {
  const response = await fetch(`${BACKEND_URL}/api/job/create`, {
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
