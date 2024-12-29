import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import RegisterPageImg from "../../assets/home/banner.jpg";
import { HiArrowUturnLeft } from "react-icons/hi2";
import Logo from "../../assets/logo.png";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    const imgFile = { image: data.photo[0] };
    const res = await axiosPublic.post(image_hosting_api, imgFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const photo = res.data.data.display_url;
      setImagePreview(photo);

      createUser(data.email, data.password).then(() => {
        updateUserProfile(data.name, photo)
          .then(() => {
            // Send user to the database
            const newUser = {
              name: data.name,
              email: data.email,
            };

            axiosPublic.post("/users", newUser).then((res) => {
              if (res.data.insertedId) {
                setLoading(false);
                reset(); // Reset the form
                Swal.fire({
                  title: "User Created Successfully",
                  icon: "success",
                });
                navigate("/");
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Register</title>
      </Helmet>
      <div className="bg-[#B58130] flex items-center min-h-screen">
        <div className="flex items-center justify-center md:h-[600px] max-w-6xl mx-auto shadow-lg drop-shadow-lg">
          <div className="md:flex items-center justify-center md:h-[600px]">
            <div
              className="md:w-1/2 w-full h-[650px] pb-16 bg-[#F3F3F3] flex justify-center items-center bg-form-image"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <div className="w-full h-[650px] px-2 lg:px-12 pt-10">
                <img className="w-10 h-10 mx-auto" src={Logo} alt="" />
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="card-body -mt-12"
                >
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Name*</span>
                    </label>
                    <input
                      type="text"
                      {...register("name", {
                        required: true,
                        minLength: 6,
                        maxLength: 12,
                      })}
                      placeholder="Type here"
                      className="input rounded-none"
                    />
                    {errors.name?.type === "required" && (
                      <p className="text-red-600 text-xs">Name is required</p>
                    )}
                    {errors.name?.type === "minLength" && (
                      <p className="text-red-600 text-xs">
                        Name must be atleast 6 characters long
                      </p>
                    )}
                    {errors.name?.type === "maxLength" && (
                      <p className="text-red-600 text-xs">
                        Name must be within 6 to 10 characters
                      </p>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Email*</span>
                    </label>
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      placeholder="Type here"
                      className="input rounded-none"
                    />
                    {errors.email?.type === "required" && (
                      <p className="text-red-600 text-xs">Email is required</p>
                    )}
                  </div>
                  <div className="form-control relative">
                    <label className="label">
                      <span className="label-text font-bold">Password*</span>
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        pattern:
                          /(?=..*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}/,
                      })}
                      className="input rounded-none"
                    />
                    {password ? (
                      <button
                        className="text-2xl text-[#B58130] absolute right-2 top-12"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent any default behavior
                          setShowPassword(!showPassword);
                        }}
                      >
                        {showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}
                      </button>
                    ) : (
                      ""
                    )}
                    {errors.password?.type === "required" && (
                      <p className="text-red-600 text-xs">
                        Password is required
                      </p>
                    )}
                    {errors.password?.type === "minLength" && (
                      <p className="text-red-600 text-xs">
                        Password Must be 8 characters long
                      </p>
                    )}
                    {errors.password?.type === "pattern" && (
                      <p className="text-red-600 text-xs">
                        Password must include 1 uppercase, 1 lowercase, 1
                        special character, 1 number.
                      </p>
                    )}
                  </div>
                  <div className="form-control">
                    <div className={imagePreview ? "flex items-center" : ""}>
                      <div>
                        <label className="label">
                          <span className="label-text font-bold">Photo</span>
                        </label>
                        <input
                          {...register("photo")}
                          type="file"
                          className={`file-input rounded-none ${
                            imagePreview ? "max-w-sm" : "w-full"
                          }`}
                          onChange={handleImageChange}
                        />
                      </div>
                      {imagePreview && (
                        <div className="pt-8 pl-3">
                          <img
                            src={imagePreview}
                            className="w-16 h-16 object-cover rounded-none"
                            alt=""
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-control mt-2">
                    <button
                      type="submit"
                      className="btn bg-gradient-to-r from-[#835D23] to-[#B58130] text-white rounded-none font-cinzel text-xl"
                    >
                      {!loading && "Register"}
                      {loading ? (
                        <span className="loading loading-spinner text-white justify-end"></span>
                      ) : (
                        ""
                      )}
                    </button>
                  </div>
                </form>
                <p className="text-orange-500 text-center text-base -mt-4 font-cinzel">
                  Already Registered?{" "}
                  <Link className="font-bold" to="/login">
                    Please Log In
                  </Link>
                </p>
                <SocialLogin title="Sign Up With"></SocialLogin>
              </div>
            </div>

            <div
              className="md:w-1/2 h-full relative"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <img
                className="object-cover w-full h-full"
                src={RegisterPageImg}
                alt=""
              />
              <div className="absolute left-4 top-4">
                <Link to="/">
                  <button className="btn-sm btn btn-outline rounded-none shadow-md text-[#B58130] flex justify-center items-center gap-3 font-bold">
                    Go Back <HiArrowUturnLeft />
                  </button>
                </Link>
              </div>
              <div className="absolute inset-0 m-auto w-80 lg:w-2/3 h-1/2 bg-black bg-opacity-30 flex flex-col justify-center items-center">
                <h2 className="text-6xl font-cinzel text-white font-semibold">
                  Register
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
