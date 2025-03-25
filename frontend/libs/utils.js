import axios from "axios";

const API_URL = "http://localhost:8000/api/users";

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const addUser = async (fullName, result) => {
  await axios
    .post(API_URL, { full_name: fullName, result: result })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding user:", error);
      return (
        error?.message || "An unexpected error occurred. Please try again."
      );
    });
};

export const updateUser = async (id, fullName, result) => {
  await axios
    .put(`${API_URL}/${id}`, { full_name: fullName, result: result })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding user:", error);
      return (
        error?.message || "An unexpected error occurred. Please try again."
      );
    });
};

export const deleteUser = async (id) => {
  await axios
    .delete(`${API_URL}/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error adding user:", error);
    });
};
