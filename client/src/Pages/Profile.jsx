import React from "react";
import { useBlog } from "../context/BlogContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { profileBlogs } = useBlog();
  const { user } = useAuth();

  const renderMain = () => {
    if (profileBlogs.length === 0) {
      return <h3 className="text-xl text-center mt-8">No Blogs Yet</h3>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profileBlogs.map((blog) => (
          <div className="bg-white rounded-md shadow-md p-4 transition transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-2 text-center">
              {blog.title}
            </h3>
            <p className="text-gray-600 mb-4">{blog.description}</p>
            <Link
              to={`/blogs/${blog.idBlog}`}
              className="text-blue-500 hover:underline"
            >
              Leer mas
            </Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-2 text-center">{user.user}</h1>
        <p className="text-gray-600">{user.biography}</p>
      </div>

      <div className="bg-white p-4 rounded-md">{renderMain()}</div>
    </div>
  );
};

export default Profile;
