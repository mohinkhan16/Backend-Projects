import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfileApi, deleteAccountApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Edit2,
  Check,
  X,
  LogOut,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Upload,
} from "lucide-react";

const Profile = () => {
  const { user, updateUserState, logout, logoutAll } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    Name: user?.Name || "",
    Address: user?.Address || "",
    Phone: user?.Phone || "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

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

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = new FormData();
      if (formData.Name !== user.Name) data.append("Name", formData.Name);
      if (formData.Address !== user.Address) data.append("Address", formData.Address);
      if (formData.Phone !== user.Phone) data.append("Phone", formData.Phone);
      if (file) data.append("Profile_Pic", file);

      const res = await updateProfileApi(data);
      if (res.success && res.user) {
        updateUserState(res.user);
        setSuccess("Profile updated successfully!");
        setIsEditing(false);
        setFile(null);
        setPreview(null);
      }
    } catch (err) {
      console.error("Update Profile Error:", err);
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you absolutely sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await deleteAccountApi();
      logout();
      navigate("/register");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete account.");
    }
  };

  return (
    <div className="page-container form-page-container">
      <div className="profile-card">
        {/* Profile Header Banner */}
        <div className="profile-header-banner">
          <div className="profile-avatar-container">
            {preview ? (
              <img src={preview} alt="New Preview" className="profile-avatar" />
            ) : user?.Profile_Pic ? (
              <img src={user.Profile_Pic} alt={user.Name} className="profile-avatar" />
            ) : (
              <div className="profile-avatar-placeholder">
                <User size={48} />
              </div>
            )}

            {isEditing && (
              <label className="btn-avatar-upload" title="Change Avatar">
                <Upload size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input-hidden"
                />
              </label>
            )}
          </div>

          <div className="profile-title-info">
            <h2>{user?.Name}</h2>
            <span className="role-tag">
              <Shield size={14} /> {user?.Role || "user"}
            </span>
          </div>
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

        {/* Profile Body / Form */}
        <div className="profile-body">
          {isEditing ? (
            <form onSubmit={handleSave} className="standard-form">
              <div className="form-group">
                <label htmlFor="Name">Full Name</label>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  required
                  value={formData.Name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Phone">Phone Number</label>
                <input
                  type="text"
                  id="Phone"
                  name="Phone"
                  required
                  value={formData.Phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Address">Address</label>
                <input
                  type="text"
                  id="Address"
                  name="Address"
                  required
                  value={formData.Address}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-edit-actions">
                <button type="submit" disabled={loading} className="btn-save">
                  <Check size={16} /> {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setPreview(null);
                    setFile(null);
                  }}
                  className="btn-cancel"
                >
                  <X size={16} /> Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-details-grid">
              <div className="detail-item">
                <Mail className="detail-icon" size={18} />
                <div>
                  <span className="detail-label">Email</span>
                  <p className="detail-value">{user?.Email}</p>
                </div>
              </div>

              <div className="detail-item">
                <Phone className="detail-icon" size={18} />
                <div>
                  <span className="detail-label">Phone</span>
                  <p className="detail-value">{user?.Phone || "Not set"}</p>
                </div>
              </div>

              <div className="detail-item">
                <MapPin className="detail-icon" size={18} />
                <div>
                  <span className="detail-label">Address</span>
                  <p className="detail-value">{user?.Address || "Not set"}</p>
                </div>
              </div>

              <div className="detail-item">
                <Shield className="detail-icon" size={18} />
                <div>
                  <span className="detail-label">Account Verification</span>
                  <p className="detail-value">
                    {user?.isVerified ? "Verified User" : "Standard Account"}
                  </p>
                </div>
              </div>

              <div className="profile-actions-bar">
                <button onClick={() => setIsEditing(true)} className="btn-edit-profile">
                  <Edit2 size={16} /> Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Account Controls */}
        <div className="profile-danger-zone">
          <h3>Account Controls</h3>
          <div className="danger-buttons">
            <button onClick={logoutAll} className="btn-logout-all">
              <LogOut size={16} /> Logout from All Devices
            </button>
            <button onClick={handleDeleteAccount} className="btn-delete-account">
              <Trash2 size={16} /> Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
