import axios from "axios";
import { FormEvent, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";
import Assets from "../Assets/Assets.png";
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
    console.log("form Data", formData);
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
      console.log(response.data);
      // window.alert("Login Successfull");
      // navigate("/");
      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
        window.alert("Login Successfull");
        navigate("/");
      }
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.log(error);
      window.alert("Login Failed");
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mt-10 ">
          <div className="w-110 h-130  shadow-2xl border-2 border-gray-100 rounded-xl">
            <div className="border-b-3 border-t-3 border-radius-2xl border-t-blue-900 border-gray-200 pb-4 pt-1 mb-5 flex justify-center items-center">
              <h1 className="font-semibold text-2xl">Login</h1>
            </div>
            <div className="flex justify-items-start">
              <div className="space-y-6 ">
                <InputComp
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="enter email"
                />

                <div className="relative ">
                  <InputComp
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="enter password"
                  />
                  <span
                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer "
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-blue-900 text-white w-49 mt-5 p-1 flex justify-center font-semibold "
              >
                Submit
              </button>
            </div>

            <p className="mt-7 ml-7 flex justify-center items-center">
              Don't Have an Account?
              <button
                type="button"
                className=" text-blue-900 text-sm p-1 m-1"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </p>
          </div>
          <div className="h-130 w-130 flex justify-center items-center">
            <img src={Assets} />
          </div>
        </div>
      </form>
    </>
  );
}
function InputComp({
  label = "text",
  type = "text",
  placeholder = "text",
  ...rest
}) {
  return (
    <div className="flex items-center space-x-4">
      <label className="ml-5 w-20 font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="border-2 border-gray-500 pl-3 p-1"
        {...rest}
      />
    </div>
  );
}
