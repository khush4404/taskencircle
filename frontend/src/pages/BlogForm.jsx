import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, editBlog, getBlogById, clearBlog } from "../features/blog/blogSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const BlogForm = ({ editMode = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { blog, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    if (editMode && id) {
      dispatch(getBlogById(id));
    } else {
      dispatch(clearBlog());
    }
  }, [dispatch, editMode, id]);

  const formik = useFormik({
    initialValues: {
      blog_title: blog?.blog_title || "",
      blog_image: blog?.blog_image || "",
      blog_description: blog?.blog_description || "",
      blog_status: blog?.blog_status || "draft",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      blog_title: Yup.string().required("Title is required"),
      blog_image: Yup.mixed()
        .required("Image is required")
        .test(
          "fileType",
          "Only image files are allowed",
          value => value && value.type && value.type.startsWith("image/")
        ),
      blog_description: Yup.string().required("Description required"),
      blog_status: Yup.string().oneOf(["draft", "published"]).required(),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("blog_title", values.blog_title);
      formData.append("blog_description", values.blog_description);
      formData.append("blog_status", values.blog_status);
      if (values.blog_image) {
        formData.append("blog_image", values.blog_image);
      }
      if (editMode && id) {
        await dispatch(editBlog({ id, data: formData }));
      } else {
        await dispatch(addBlog(formData));
      }
      navigate("/");
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{editMode ? "Edit Blog" : "Add Blog"}</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="blog_title"
            className="w-full border px-3 py-2 rounded"
            {...formik.getFieldProps("blog_title")}
          />
          {formik.touched.blog_title && formik.errors.blog_title && (
            <div className="text-red-500 text-sm">{formik.errors.blog_title}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Image</label>
          <input
            type="file"
            name="blog_image"
            accept="image/*"
            className="w-full border px-3 py-2 rounded"
            onChange={e => {
              const file = e.currentTarget.files[0];
              if (file) {
                formik.setFieldValue("blog_image", file);
              }
            }}
          />
          {formik.touched.blog_image && formik.errors.blog_image && (
            <div className="text-red-500 text-sm">{formik.errors.blog_image}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            name="blog_description"
            className="w-full border px-3 py-2 rounded"
            {...formik.getFieldProps("blog_description")}
          />
          {formik.touched.blog_description && formik.errors.blog_description && (
            <div className="text-red-500 text-sm">{formik.errors.blog_description}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Status</label>
          <select
            name="blog_status"
            className="w-full border px-3 py-2 rounded"
            {...formik.getFieldProps("blog_status")}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          {formik.touched.blog_status && formik.errors.blog_status && (
            <div className="text-red-500 text-sm">{formik.errors.blog_status}</div>
          )}
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? (editMode ? "Updating..." : "Adding...") : editMode ? "Update Blog" : "Add Blog"}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
