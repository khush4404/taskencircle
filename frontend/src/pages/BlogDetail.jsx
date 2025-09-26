import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogById } from "../features/blog/blogSlice";
import axiosInstance from "../api/axiosInstance";

const BlogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blog, loading, error } = useSelector((state) => state.blog);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axiosInstance.delete(`/blogs/${id}`);
      navigate("/");
    } catch (err) {
      alert("Failed to delete blog");
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getBlogById(id));
    }
  }, [dispatch, id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!blog) return <div className="text-center mt-10">Blog not found.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <img src={blog.blog_image} alt="Blog" className="rounded mb-4" />
      <h2 className="text-2xl font-bold mb-2">{blog.blog_title}</h2>
      <p className="text-gray-700 mb-4">{blog.blog_description}</p>
      <span className="text-xs text-gray-500">Status: {blog.blog_status}</span>
      {user && blog.author && (blog.author._id === user._id || blog.author === user._id) && (
        <div className="mt-4 flex gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => navigate(`/edit-blog/${blog._id}`)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
