import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { updateBlogApi } from "../api/blogApi";
import { Edit3, Image, AlertCircle, ArrowLeft } from "lucide-react";

const EditBlog = () => {
  const { id } = useParams();
  const location = useLocation();
  const existingBlog = location.state?.blog || {};

  const [formData, setFormData] = useState({
    title: existingBlog.title || "",
    Discription: existingBlog.Discription || "",
    Category: existingBlog.Category || "Technology",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(existingBlog.BlogImg || null);
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

      const res = await updateBlogApi(id, data);
      if (res.success) {
        navigate("/");
      }
    } catch (err) {
      console.error("Update Blog Error:", err);
      setError(err.response?.data?.message || "Failed to update blog.");
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
            <Edit3 size={24} />
          </div>
          <h2>Edit Blog</h2>
          <p>Update your blog details</p>
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
              value={formData.Discription}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Cover Image</label>
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
                    Change Image
                  </button>
                </div>
              ) : (
                <label className="file-upload-label">
                  <Image size={24} className="upload-icon" />
                  <span>Upload a new cover image</span>
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
            {loading ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
