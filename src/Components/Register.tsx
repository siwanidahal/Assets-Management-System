import axios from "axios";
import { FormEvent, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const formData = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      password2: data.get("password2"),
      first_name: data.get("first_name"),
      last_name: data.get("last_name"),
      phone_number: data.get("phone_number"),
      address: data.get("address"),
    };
    console.log("form data", formData);
    try {
      const response = await axios.post(
        "https://2k8mf0hg-8001.inc1.devtunnels.ms/api/user/register/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      window.alert("Registration Successfull");
      navigate("/login");
    } catch (error) {
      console.log(error);
      window.alert("registration fail");
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center">
          <div className="w-120 h-180 shadow-2xl border-2 border-gray-100 rounded-xl ">
            <div className="border-b-3 border-t-3 border-radius-2xl border-t-blue-300 border-gray-200 pb-4 pt-1 mb-5 flex justify-center items-center">
              <h1>Create an Account</h1>
            </div>
            <div className="flex justify-items-start">
              <div className="space-y-6 ">
                <InputComp
                  label="UserName"
                  type="text"
                  name="username"
                  placeholder="enter username"
                />
                <InputComp
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="enter email"
                />
                <InputComp
                  label="First Name"
                  type="text"
                  name="first_name"
                  placeholder="Enter first name"
                />
                <InputComp
                  label="Last Name"
                  type="text"
                  name="last_name"
                  placeholder="Enter last name"
                />
                <InputComp
                  label="Address"
                  type="text"
                  name="address"
                  placeholder="Enter your Address"
                />
                <InputComp
                  label="Phone Number"
                  type="number"
                  name="phone_number"
                  placeholder="Enter phone number"
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
                <div className="relative">
                  <InputComp
                    label="Retype Password"
                    type={showPassword2 ? "text" : "password"}
                    name="password2"
                    placeholder="enter password"
                  />
                  <span
                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer "
                    onClick={() => setShowPassword2(!showPassword2)}
                  >
                    {showPassword2 ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-blue-300 w-49 mt-5 p-1 flex justify-center font-semibold "
              >
                Submit
              </button>
            </div>
            <p className="mt-7 ml-7 flex justify-center items-center">
              Already Have an Account?
              <button
                type="button"
                className=" text-blue-700 text-sm p-1 m-1"
                onClick={() => navigate("/login")}
              >
                login
              </button>
            </p>
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
