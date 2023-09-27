import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBlog } from "../context/BlogContext";

const BlogsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { categories, createBlog, updateBlog, getBlog } = useBlog();
  const { user } = useAuth();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const [blog] = await getBlog(params.id);
        if (blog.idUser !== user.id) {
          return navigate('/blogs')
        }
        setValue("title", blog.title);
        setValue("description", blog.description);
        setValue("body", blog.body);
        setValue("category", blog.category); // Agregar valor para el campo "category"
      } else {
        setValue("title", "");
        setValue("description", "");
        setValue("body", "");
        setValue("category", ""); // Agregar valor por defecto para el campo "category"
      }
    }
    loadTask();
  }, []);

  const onSubmit = (data) => {
    if (params.id) {
      updateBlog(params.id, data);
    } else {
      createBlog(data);
    }
    navigate("/blogs");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-extrabold text-center mb-4">
          {params.id ? "Edit blog" : "Create Blog"}
        </h1>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block mb-2 font-semibold">Title</label>
            <input
              autoFocus
              type="text"
              name="title"
              placeholder="Write a title"
              {...register("title", { required: true })}
              className="w-full p-2 border border-slate-600 rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
            />
            {errors.title && <p className="text-red-500">Title is required</p>}

            <label className="block mt-4 mb-2 font-semibold">Description</label>
            <textarea
              name="description"
              rows="6"
              maxLength="255"
              {...register("description", { required: true })}
              placeholder="Write a description"
              className="w-full p-2 border border-slate-600 rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
            ></textarea>
            {errors.description && (
              <p className="text-red-500">Description is required</p>
            )}

            <label className="block mt-4 mb-2 font-semibold">Body</label>
            <textarea
              name="body"
              rows="9"
              {...register("body", { required: true })}
              placeholder="Write the body of the blog"
              className="w-full p-2 border border-slate-600 rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
            ></textarea>
            {errors.body && <p className="text-red-500">Body is required</p>}

            <label className="block mt-4 mb-2 font-semibold">Category</label>
            <select
              name="category"
              {...register("category", { required: true })}
              className="w-full p-2 border border-slate-600 rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500">Category is required</p>
            )}

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogsForm;
