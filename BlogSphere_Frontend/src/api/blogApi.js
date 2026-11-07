import API from "./axiosInstance";

// 1. Get All Blogs
export const getAllBlogsApi = async () => {
  const response = await API.get("/blog");
  return response.data;
};

// 2. Create Blog (accepts FormData for BlogImg)
export const createBlogApi = async (formData) => {
  const response = await API.post("/blog", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// 3. Update Blog by ID
export const updateBlogApi = async (id, formData) => {
  const response = await API.patch(`/blog/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// 4. Delete Blog by ID
export const deleteBlogApi = async (id) => {
  const response = await API.delete(`/blog/${id}`);
  return response.data;
};
