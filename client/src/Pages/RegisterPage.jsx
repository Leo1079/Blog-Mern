import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export const RegisterPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (values) => {
    await signup(values);
  });

  const isUsernameValid = (value) => !/\s/.test(value);

  useEffect(() => {
    if (isAuthenticated) navigate("/blogs");
  }, [isAuthenticated]);

  return (
    <div>
      <div className="flex justify-center items-center py-20 flex-col bg-white">
        <h1 className="text-4xl font-bold text-black mb-8 border-b border-black">
          Blogs Users
        </h1>
        <form
          onSubmit={onSubmit}
          className="max-w-md bg-gray-200 p-8 rounded-md w-full"
        >
          <h1 className="text-2xl font-bold mb-4 text-black text-center underline">
            Register
          </h1>
          <div className="mb-4">
            <input
              type="text"
              {...register("username", { 
                required:'Username is required',
                validate: {
                  noSpaces: (value) => isUsernameValid(value) || 'No spaces allowed in username'
                }
              })}
              className="bg-gray-300 text-black rounded-md px-4 py-2 w-96 h-15"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="email"
              {...register("email", { required: true })}
              className="bg-gray-300 text-black rounded-md px-4 py-2 w-96 h-15"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </div>

          <div className="mb-4">
            <textarea
              rows="10"
              {...register("biography", { required: true })}
              placeholder="Write a Biography or description"
              className="bg-gray-300 text-black rounded-md px-4 py-2 w-96 h-15"
            ></textarea>
            {errors.biography && (
              <p className="text-red-500">Biography is required</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="password"
              {...register("password", { required: true })}
              className="bg-gray-300 text-black rounded-md px-4 py-2 w-96 h-15"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </button>
            {registerErrors.length > 0 && (
              <div className="ml-4 ">
                {registerErrors.map((error, index) => (
                  <p key={index} className="text-red-500">
                    {error}
                  </p>
                ))}
              </div>
            )}
          </div>
        </form>
        <p className="text-black mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
