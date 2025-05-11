import axios from "axios";
import { FormEvent, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://2k8mf0hg-8001.inc1.devtunnels.ms/api/user/login/",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
        window.alert("Login Successful");
        navigate("/");
      }

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      window.alert("Login Failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <div className="flex w-[80%] max-w-5xl h-[70%] bg-white shadow-2xl rounded-2xl overflow-hidden">
          {/* Left Panel */}
          <div className="w-1/2 bg-purple-400 text-white flex flex-col justify-center items-center p-10 rounded-tr-lg rounded-br-full transition-all duration-700 ease-in-out ">
            <h2 className="text-3xl font-bold mb-4">Hello, Welcome!</h2>
            <p className="mb-6">Don't have an account?</p>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="border border-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-blue-500 transition"
            >
              Register
            </button>
          </div>

          {/* Right Panel (Login Form) */}
          <div className="w-1/2 p-10 flex flex-col justify-center">
            <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
            <div className="space-y-6">
              <InputComp
                label="Email"
                type="email"
                name="email"
                placeholder="Enter email"
              />
              <div className="relative">
                <InputComp
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                />
                <span
                  className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <button
                type="submit"
                className="bg-purple-400 text-white py-2 rounded font-semibold w-full hover:bg-white hover:border-2 hover:border-purple-400 hover:text-blue-500 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

type InputProps = {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
};

function InputComp({
  label,
  type = "text",
  name,
  placeholder = "",
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-col w-full">
      <label className="mb-1 font-medium text-sm">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="border border-gray-400 rounded p-2 focus:outline-none focus:ring-1 focus:ring-purple-400"
        {...rest}
      />
    </div>
  );
}
