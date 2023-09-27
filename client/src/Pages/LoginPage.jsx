import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated, errors: loginErrors } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((values) => {
    signin(values);
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/blogs')
  }, [isAuthenticated]);

  return (
    <div>
      <div className="flex justify-center items-center py-20 flex-col bg-white">
        <h1 className="text-4xl font-bold text-black mb-8 border-b border-black">
          Tasks Users
        </h1>
        <form
          onSubmit={onSubmit}
          className="max-w-md bg-gray-200 p-8 rounded-md w-full"
        >
          <h1 className="text-2xl font-bold mb-4 text-black text-center">
            Login
          </h1>
          <div className="mb-4">
            <input
              type="text"
              {...register("username", { required: true })}
              className="bg-gray-300 text-black rounded-md px-4 py-2 w-96 h-15"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500">Username is required</p>
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
          <div className="flex items-center  justify-between mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
            {loginErrors.length > 0 && (
              <div className="ml-4">
                {loginErrors.map((error, index) => (
                  <p key={index} className="text-red-500">
                    {error}
                  </p>
                ))}
              </div>
            )}
          </div>
        </form>
        <p className="text-black mt-4">
          You do not have an account yet{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
