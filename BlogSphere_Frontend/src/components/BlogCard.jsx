import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Edit2, Trash2, User } from "lucide-react";

const BlogCard = ({ blog, onDelete }) => {
  const { user } = useAuth();

  // Author can be either an object with _id (populated) or a string ID
  const authorId = blog.Author?._id || blog.Author;
  const authorName = blog.Author?.Name || "Author";
  const isAuthor = user && user._id && authorId && (user._id === authorId);

  return (
    <div className="blog-card">
      {blog.BlogImg && (
        <div className="blog-card-image">
          <img src={blog.BlogImg} alt={blog.title} />
          {blog.Category && <span className="category-badge">{blog.Category}</span>}
        </div>
      )}

      <div className="blog-card-content">
        {!blog.BlogImg && blog.Category && (
          <span className="category-badge category-badge-inline">{blog.Category}</span>
        )}

        <h3 className="blog-title">{blog.title}</h3>
        <p className="blog-description">{blog.Discription}</p>

        <div className="blog-footer">
          <div className="author-info">
            <User size={16} className="author-icon" />
            <span>{authorName}</span>
          </div>

          {isAuthor && (
            <div className="card-actions">
              <Link
                to={`/edit-blog/${blog._id}`}
                className="btn-icon btn-edit"
                title="Edit Blog"
                state={{ blog }}
              >
                <Edit2 size={16} />
              </Link>
              <button
                onClick={() => onDelete(blog._id)}
                className="btn-icon btn-delete"
                title="Delete Blog"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
