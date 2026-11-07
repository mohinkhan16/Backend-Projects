import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../api/authApi";
import { UserPlus, User, Mail, Lock, MapPin, Phone, Upload, AlertCircle, CheckCircle2 } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
    Address: "",
    Phone: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = new FormData();
      data.append("Name", formData.Name);
      data.append("Email", formData.Email);
      data.append("Password", formData.Password);
      data.append("Address", formData.Address);
      data.append("Phone", formData.Phone);
      if (file) {
        data.append("Profile_Pic", file);
      }

      const res = await registerApi(data);
      if (res.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      console.error("Register Error:", err);
      setError(err.response?.data?.message || "Registration failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card register-card">
        <div className="auth-header">
          <div className="icon-badge">
            <UserPlus size={24} />
          </div>
          <h2>Create Account</h2>
          <p>Join BlogSphere community today</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <CheckCircle2 size={18} />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="Name">Full Name</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  required
                  placeholder="John Doe"
                  value={formData.Name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="Email">Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  required
                  placeholder="john@example.com"
                  value={formData.Email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="Password">Password (min 6 chars)</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  id="Password"
                  name="Password"
                  required
                  placeholder="••••••••"
                  value={formData.Password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="Phone">Phone (10-digit Mobile)</label>
              <div className="input-wrapper">
                <Phone size={18} className="input-icon" />
                <input
                  type="tel"
                  id="Phone"
                  name="Phone"
                  required
                  placeholder="9876543210"
                  value={formData.Phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="Address">Address</label>
            <div className="input-wrapper">
              <MapPin size={18} className="input-icon" />
              <input
                type="text"
                id="Address"
                name="Address"
                required
                placeholder="123 Main Street, City"
                value={formData.Address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Profile Picture (Optional)</label>
            <div className="file-upload-box">
              {preview ? (
                <div className="image-preview-wrapper">
                  <img src={preview} alt="Profile Preview" className="preview-img" />
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                    className="btn-remove-preview"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="file-upload-label">
                  <Upload size={24} className="upload-icon" />
                  <span>Choose Profile Picture (JPEG, PNG)</span>
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
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
