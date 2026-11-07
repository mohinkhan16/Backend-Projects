import React, { useEffect, useState } from "react";
import { getAllBlogsApi, deleteBlogApi } from "../api/blogApi";
import BlogCard from "../components/BlogCard";
import { Search, PlusCircle, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { isAuthenticated } = useAuth();

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getAllBlogsApi();
      if (res.success && Array.isArray(res.blog)) {
        setBlogs(res.blog);
      } else {
        setBlogs([]);
      }
    } catch (err) {
      console.error("Failed to load blogs:", err);
      setError(err.response?.data?.message || "Failed to load blogs from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlogApi(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete blog.");
    }
  };

  const categories = ["All", "Events", "sports", "Motivated", "fun", "Technology", "Politics"];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title?.toLowerCase().includes(search.toLowerCase()) ||
      blog.Discription?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || blog.Category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-container">
      {/* Hero Header */}
      <header className="hero-section">
        <h1>Welcome to <span className="highlight">BlogSphere</span></h1>
        <p>Explore articles, stories, ideas, and insights from the community.</p>

        {isAuthenticated && (
          <Link to="/create-blog" className="btn-hero">
            <PlusCircle size={20} />
            Create Your Blog
          </Link>
        )}
      </header>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search blogs by title or content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="category-chips">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`chip ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      {loading ? (
        <div className="state-message">
          <RefreshCw className="spinner" size={32} />
          <p>Fetching blogs...</p>
        </div>
      ) : error ? (
        <div className="state-message error-box">
          <p>{error}</p>
          <button onClick={fetchBlogs} className="btn-retry">
            Try Again
          </button>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="state-message empty-box">
          <h3>No blogs found</h3>
          <p>Be the first to share your thoughts!</p>
          {isAuthenticated && (
            <Link to="/create-blog" className="btn-primary">
              Write Blog Now
            </Link>
          )}
        </div>
      ) : (
        <div className="blogs-grid">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
