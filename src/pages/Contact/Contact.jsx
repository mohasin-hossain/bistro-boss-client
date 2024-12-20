import Cover from "../Shared/Cover/Cover";
import ContactPageImg from "../../assets/contact/banner.jpg";
import SectionTitle from "../../components/SectionTitle";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlinePermPhoneMsg } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(AuthContext);
  const axiosSecure = useAxiosSecure();


  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    setLoading(true);

    const message = {
      name: data.name || user.displayName,
      email: data.email || user.email,
      phone: data.phone,
      message: data.message,
    };

    axiosSecure.post(`/messages`, message).then((res) => {
      if (res.data.insertedId) {
        reset();
        setLoading(false);
        Swal.fire({
          title: "Message Sent!",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Contact</title>
      </Helmet>
      <Cover
        img={ContactPageImg}
        title="Contact Us"
        subTitle="Do you have any queries?"
      ></Cover>
      <SectionTitle heading="Our Location" subHeading="Visit Us"></SectionTitle>

      <div
        className="max-w-6xl pb-4 px-10 mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 font-inter"
        data-aos="fade-up"
      >
        <div className="border">
          <div className="bg-[#D1A054] p-3">
            <MdOutlinePermPhoneMsg className="text-2xl text-white mx-auto" />
          </div>
          <div className="mx-2 mb-2 bg-[#F3F3F3] p-8 text-center">
            <h3 className="font-semibold uppercase">Phone</h3>
            <p>+38 (012) 34 56 789</p>
            <p>+48 (012) 39 78 000</p>
          </div>
        </div>

        <div className="border flex flex-col">
          <div className="bg-[#D1A054] p-3">
            <FaLocationDot className="text-2xl text-white mx-auto" />
          </div>
          <div className="mx-2 mb-2 bg-[#F3F3F3] p-8 text-center grow">
            <h3 className="font-semibold uppercase">Address</h3>
            <p>123 New Colony Street, P21, Bangladesh</p>
          </div>
        </div>
        <div className="border">
          <div className="bg-[#D1A054] p-3">
            <IoTime className="text-2xl text-white mx-auto" />
          </div>
          <div className="mx-2 mb-2 bg-[#F3F3F3] p-8 text-center">
            <h3 className="font-semibold uppercase">Working Hours</h3>
            <p>Mon - Fri: 08:00 - 22:00</p>
            <p>Sat - Sun: 10:00 - 23:00</p>
          </div>
        </div>
      </div>

      <SectionTitle
        heading="Contact Form"
        subHeading="Send us a message"
      ></SectionTitle>

      <div className="max-w-6xl px-10 mx-auto mb-20" data-aos="fade-up">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#F3F3F3] p-6 md:p-12"
        >
          <div className="flex md:flex-row flex-col gap-4 mb-2">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text font-semibold">Name*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                className="input text-base"
                defaultValue={user?.displayName}
                {...register("name")}
                required
              />
            </div>
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text font-semibold">Email*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                defaultValue={user?.email}
                className="input text-base"
                {...register("email")}
                required
              />
            </div>
          </div>

          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text font-semibold">Phone*</span>
            </label>
            <input
              type="number"
              placeholder="Enter your phone number"
              name="phone"
              className="input text-base"
              {...register("phone", { required: true })}
              required
            />
            {errors.phone && <span>Phone Number is required</span>}
          </div>

          <div>
            <label className="form-control">
              <div className="label">
                <span className="label-text font-semibold">Your Message*</span>
              </div>
              <textarea
                name="message"
                className="textarea h-48 text-base"
                placeholder="Write your message here"
                {...register("message", { required: true })}
              ></textarea>
              {errors.message && <span className="text-red-400">Please enter your message.</span>}
            </label>
          </div>

          <div className="flex justify-center mt-8">
            <button className="btn rounded-none bg-gradient-to-r from-[#835D23] to-[#B58130] text-white w-60 font-cinzel">
              {loading ? (
                <span className="loading loading-spinner text-white justify-end"></span>
              ) : (
                <>
                  Send Message
                  <IoIosSend className="text-2xl"></IoIosSend>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
