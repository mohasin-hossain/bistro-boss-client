import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import loginPageImg from "../../assets/home/banner.jpg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import { IoLogInOutline } from "react-icons/io5";
import { HiArrowUturnLeft } from "react-icons/hi2";
import Logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signInUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const onSubmit = (data) => {
    setError("");
    if (validateCaptcha(data.captcha) == true) {
      setLoading(true);
      signInUser(data.email, data.password).then((result) => {
        console.log(result.user);
        setLoading(false);
        Swal.fire({
          title: "Login Successful!",
          icon: "success",
        });
        navigate(from, { replace: true });
      });
    } else {
      setError("Invalid Captcha!");
    }
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Login</title>
      </Helmet>
      <div className="bg-[#B58130] flex items-center min-h-screen">
        <div className="flex items-center justify-center md:h-[600px] max-w-6xl mx-auto shadow-lg drop-shadow-lg">
          <div className="md:flex items-center justify-center md:h-[600px]">
            <div className="md:w-1/2 h-full relative">
              <img
                src={loginPageImg}
                className="object-cover w-full h-full"
                alt=""
              />
              <div className="absolute left-4 top-4">
                <Link to="/">
                  <button className="btn-sm btn btn-outline rounded-none shadow-md text-[#B58130] flex justify-center items-center gap-3 font-bold">
                    Go Back <HiArrowUturnLeft />
                  </button>
                </Link>
              </div>
              <div className="absolute inset-0 m-auto w-80 lg:w-1/2 h-1/2 bg-black bg-opacity-30 flex flex-col justify-center items-center">
                <h2 className="text-6xl font-cinzel text-white font-semibold">
                  Login
                </h2>
              </div>
            </div>
            <div className="md:w-1/2 w-full h-[650px] pb-16 bg-[#F3F3F3] flex justify-center items-center bg-form-image">
              <div className="w-full h-[650px] px-2 lg:px-12 pt-10">
                <img className="w-10 h-10 mx-auto" src={Logo} alt="" />
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold font-inter">
                        Email
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="Type here"
                      name="email"
                      className="input rounded-none"
                      {...register("email", { required: true })}
                    />
                    {errors.email?.type === "required" && (
                      <p className="text-red-600 text-xs">Email is required</p>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold font-inter">
                        Password
                      </span>
                    </label>
                    <input
                      type="password"
                      placeholder="Type here"
                      name="password"
                      className="input rounded-none"
                      {...register("password", { required: true })}
                    />
                    {errors.password?.type === "required" && (
                      <p className="text-red-600 text-xs">
                        Password is required
                      </p>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label ">
                      <LoadCanvasTemplate />
                    </label>
                    <input
                      type="text"
                      placeholder="Enter captcha"
                      name="captcha"
                      className="input rounded-none"
                      {...register("captcha", { required: true })}
                    />
                    {errors.captcha?.type === "required" && (
                      <p className="text-red-600 text-xs">Captcha is Required</p>
                    )}
                    <span className="text-red-600 text-xs">{error}</span>
                  </div>
                  <div className="form-control mt-4">
                    <button className="btn bg-gradient-to-r from-[#835D23] to-[#B58130] text-white rounded-none font-cinzel text-xl">
                     {!loading && <>Login <IoLogInOutline className="text-2xl" /></>}
                      {loading ? (
                        <span className="loading loading-spinner text-white justify-end"></span>
                      ) : (
                        ""
                      )}
                    </button>
                  </div>
                </form>
                <p className="text-orange-500 text-center font-cinzel">
                  New here?{" "}
                  <Link className="font-bold" to="/register">
                    Create an Account
                  </Link>
                </p>
                <SocialLogin title="Sign In With"></SocialLogin>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
