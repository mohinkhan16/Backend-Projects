import API from "./axiosInstance";

// 1. Register User (accepts FormData for Profile_Pic)
export const registerApi = async (formData) => {
  const response = await API.post("/JWT/auth/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// 2. Login User
export const loginApi = async (credentials) => {
  const response = await API.post("/JWT/auth/login", credentials);
  return response.data;
};

// 3. Authenticated User Profile
export const getMeApi = async () => {
  const response = await API.post("/JWT/auth/authLogin");
  return response.data;
};

// 4. Logout from all devices
export const logoutAllApi = async () => {
  const response = await API.get("/JWT/auth/logoutAll");
  return response.data;
};

// 5. Update user profile (Name, Address, Phone, Profile_Pic)
export const updateProfileApi = async (formData) => {
  const response = await API.patch("/JWT/auth/Update", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// 6. Delete User Account
export const deleteAccountApi = async () => {
  const response = await API.delete("/JWT/auth/deleteUser");
  return response.data;
};

// 7. Get All Users
export const getAllUsersApi = async () => {
  const response = await API.get("/JWT/auth/getAll");
  return response.data;
};
