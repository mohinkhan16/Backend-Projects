import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlogApi } from "../api/blogApi";
import { PenTool, Image, AlertCircle, ArrowLeft } from "lucide-react";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    Discription: "",
    Category: "Technology",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    "Technology",
    "Sports",
    "Politics",
    "Events",
    "Motivated",
    "fun",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("Discription", formData.Discription);
      data.append("Category", formData.Category);
      if (file) {
        data.append("BlogImg", file);
      }

      const res = await createBlogApi(data);
      if (res.success) {
        navigate("/");
      }
    } catch (err) {
      console.error("Create Blog Error:", err);
      setError(err.response?.data?.message || "Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container form-page-container">
      <button onClick={() => navigate(-1)} className="btn-back">
        <ArrowLeft size={18} /> Back
      </button>

      <div className="form-card">
        <div className="form-header">
          <div className="icon-badge">
            <PenTool size={24} />
          </div>
          <h2>Create New Blog</h2>
          <p>Share your ideas and experiences with the community</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="standard-form">
          <div className="form-group">
            <label htmlFor="title">Blog Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="Give your blog an engaging title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Category">Category</label>
            <select
              id="Category"
              name="Category"
              value={formData.Category}
              onChange={handleChange}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="Discription">Blog Content / Description</label>
            <textarea
              id="Discription"
              name="Discription"
              rows={8}
              required
              placeholder="Write your story here..."
              value={formData.Discription}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Cover Image (Optional)</label>
            <div className="file-upload-box">
              {preview ? (
                <div className="image-preview-wrapper cover-preview">
                  <img src={preview} alt="Blog Cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                    className="btn-remove-preview"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <label className="file-upload-label">
                  <Image size={24} className="upload-icon" />
                  <span>Upload a blog header image (JPEG, PNG, WebP)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input-hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? "Publishing Blog..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
