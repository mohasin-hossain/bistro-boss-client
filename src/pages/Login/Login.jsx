import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import loginPageImg from "../../assets/others/authentication1.png";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const Login = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const { signInUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password).then((result) => {
      console.log(result.user);
      Swal.fire({
        title: "Login Successful",
        icon: "success",
      });
      navigate(from, { replace: true });
    });
  };

  const handleCaptchaValidation = () => {
    const user_captcha_value = captchaRef.current.value;
    if (validateCaptcha(user_captcha_value) == true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Login</title>
      </Helmet>
      <div className="bg-form-image">
        <div className="max-w-7xl mx-auto px-10 flex items-center justify-center min-h-screen">
          <div className="md:flex items-center justify-center p-8 border-2 shadow-md bg-form-image">
            <div className="md:w-1/2">
              <img src={loginPageImg} alt="" />
            </div>
            <div className="md:w-1/2">
              <form onSubmit={handleLogin} className="card-body">
                <h1 className="text-3xl font-bold text-center">Login</h1>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Type here"
                    name="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <LoadCanvasTemplate />
                  </label>
                  <input
                    type="text"
                    placeholder="Type the text above"
                    name="captcha"
                    className="input input-bordered"
                    ref={captchaRef}
                    onBlur={handleCaptchaValidation}
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Login"
                    disabled={disabled}
                  />
                </div>
              </form>
              <p className="text-orange-500 text-center">
                New here?{" "}
                <Link className="font-bold" to="/register">
                  Create an Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
