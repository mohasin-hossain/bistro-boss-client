import { Link, useNavigate } from "react-router-dom";
import RegisterPageImg from "../../assets/others/authentication1.png";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photo)
        .then(() => {
          reset(); // Reset the form
          Swal.fire({
            title: "User Created Successfully",
            icon: "success",
          });
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Register</title>
      </Helmet>
      <div className="bg-form-image">
        <div className="max-w-7xl mx-auto px-10 flex items-center justify-center min-h-screen">
          <div className="md:flex md:flex-row-reverse items-center justify-center p-12 border-2 shadow-md bg-form-image">
            <div className="md:w-1/2">
              <img src={RegisterPageImg} alt="" />
            </div>
            <div className="md:w-1/2">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <h1 className="text-3xl font-bold text-center">Register</h1>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    {...register("name", {
                      required: true,
                      minLength: 6,
                      maxLength: 12,
                    })}
                    placeholder="Type here"
                    className="input input-bordered"
                  />
                  {errors.name?.type === "required" && (
                    <p className="text-red-600">Name is required</p>
                  )}
                  {errors.name?.type === "minLength" && (
                    <p className="text-red-600">
                      Name must be atleast 6 characters long
                    </p>
                  )}
                  {errors.name?.type === "maxLength" && (
                    <p className="text-red-600">
                      Name must be within 6 to 10 characters
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="text"
                    {...register("photo", {
                      required: true,
                    })}
                    placeholder="Paste photo URL"
                    className="input input-bordered"
                  />
                  {errors.name?.type === "required" && (
                    <p className="text-red-600">Photo URL is required</p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Type here"
                    className="input input-bordered"
                  />
                  {errors.email?.type === "required" && (
                    <p className="text-red-600">Email is required</p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      pattern:
                        /(?=..*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}/,
                    })}
                    className="input input-bordered"
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-600">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-600">
                      Password Must be atleast 6 characters long
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-600">
                      Password must include 1 uppercase, 1 lowercase, 1 special
                      character
                    </p>
                  )}
                </div>
                <div className="form-control mt-6">
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Register"
                  />
                </div>
              </form>
              <p className="text-orange-500 text-center">
                Already Registered?{" "}
                <Link className="font-bold" to="/login">
                  Please Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
