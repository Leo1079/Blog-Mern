import React from "react";
import { useBlog } from "../context/BlogContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  // Categorías populares
  const { categories, blogs } = useBlog();
  const sevenBlogs = blogs.slice(0, 7);

  return (
    <div className="bg-gray-100 flex-col grid grid-rows-[auto,1fr,auto]">
      <header className="bg-blue-500 text-white py-3 text-center">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-2">Bienvenido a Mi Sitio</h1>
          <p className="text-lg">Tu fuente de contenidos favorita</p>
        </div>
      </header>

      <main className="container mx-auto my-8 px-4">
        <section className="py-8">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Últimos Blogs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sevenBlogs.map((blog, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">{blog.title}</h3>
                <p className="text-gray-600">{blog.description}</p>
                <Link
                  to={`/blogs/${blog.idBlog}`}
                  className="mt-4 inline-block text-blue-500 hover:underline"
                >
                  Leer mas
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Categorías Populares
          </h2>
          <div className="flex flex-wrap justify-center py-2">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-blue-200 text-blue-800 rounded-full px-4 py-2 m-2 cursor-pointer hover:bg-blue-300"
              >
                <Link to={`/blogs/categories/${category}`} key={index}>
                  {category}
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-5 text-center fixed bottom-0 w-full">
        <div className="container">
          <p className="ml-96">&copy; 2023 Mi Sitio. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
