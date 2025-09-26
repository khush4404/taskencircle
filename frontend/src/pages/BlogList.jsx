import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBlogs } from "../features/blog/blogSlice";
import { Link } from "react-router-dom";

const BlogList = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">All Blogs</h2>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      <div className="grid gap-6 md:grid-cols-2">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <Link to={`/blog/${blog._id}`} key={blog._id} className="bg-white rounded shadow p-4 hover:shadow-lg transition">
              <img src={blog.blog_image} alt="Blog" className="rounded mb-2 w-full h-48 object-cover" />
              <h3 className="font-bold text-lg mb-1">{blog.blog_title}</h3>
              <p className="text-gray-700 mb-2">{blog.blog_description.substring(0, 100)}...</p>
              <span className="text-xs text-gray-500">Status: {blog.blog_status}</span>
            </Link>
          ))
        ) : (
          <div className="col-span-2 text-center">No blogs found.</div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
