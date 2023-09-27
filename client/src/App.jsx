import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import { BlogContextProvider } from "./context/BlogContext";
import ProtectedRoute from "./ProtectedRoutes";

import BlogForm from "./Pages/BlogsForm";
import BlogsPage from "./Pages/BlogsPage";
import SingleBlogPage from "./Pages/SingleBlog";

import HomePage from "./Pages/HomePage";
import LoginForm from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ProfilePage from "./Pages/Profile";
import BlogsByCategory from "./Pages/BlogsByCategory";

const App = () => {
  return (
    <AuthContextProvider>
      <BlogContextProvider>
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/add-blog" element={<BlogForm />} />
            <Route path="/blogs/:id" element={<SingleBlogPage />} />
            <Route path="/blogs/edit/:id" element={<BlogForm />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/categories/:category" element={<BlogsByCategory />} />
        </Routes>
      </BlogContextProvider>
    </AuthContextProvider>
  );
};

export default App;
