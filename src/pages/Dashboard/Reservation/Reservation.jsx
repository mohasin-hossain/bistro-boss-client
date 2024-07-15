import { SlCalender } from "react-icons/sl";
import SectionTitle from "../../../components/SectionTitle";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const Reservation = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: menuNames = [] } = useQuery({
    queryKey: ["menu-names"],
    queryFn: async () => {
      const res = await axiosSecure.get("/menu-names");
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setLoading(true);
    const booking = {
      menu: data.menuName,
      name: data.reserverName,
      phone: data.reserverPhone,
      email: data.reserverEmail,
      date: data.date,
      time: data.time,
      guest: data.guest,
      status: "pending",
    };

    axiosSecure.post("/bookings", booking).then((res) => {
      if (res.data.insertedId) {
        reset();
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Booking Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/myBooking");
      }
    });
  };

  return (
    <div className="px-12">
      <Helmet>
        <title>Bistro Boss | Reservation</title>
      </Helmet>
      <SectionTitle
        heading="Reservation"
        subHeading="Book a Table"
      ></SectionTitle>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="font-inter font-normal"
      >
        {/* Menu Name */}
        <div className="">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                Which Menu Item would you like to book?
              </span>
            </div>
            <select
              defaultValue=""
              {...register("menuName", {
                required: "Menu is required",
                validate: (value) =>
                  value !== "" || "Please select a menu item",
              })}
              className="select select-bordered w-full"
            >
              <option disabled value="">
                Select One
              </option>
              {menuNames.map((menuName, idx) => (
                <option key={idx} value={menuName.name}>
                  {menuName.name}
                </option>
              ))}
            </select>
            {errors.menuName && (
              <p className="text-red-600 text-xs">{errors.menuName.message}</p>
            )}
          </label>
        </div>

        <div className="flex md:flex-row flex-col gap-3 justify-center mt-4">
          <label className="form-control w-full md:max-w-sm">
            <div className="label">
              <span className="label-text">Date*</span>
            </div>
            <input
              {...register("date", { required: true })}
              type="date"
              className="input input-bordered w-full md:max-w-sm"
            />
            {errors.date?.type === "required" && (
              <p className="text-red-600 text-xs">Date is required</p>
            )}
          </label>

          <label className="form-control w-full md:max-w-sm">
            <div className="label">
              <span className="label-text">Time*</span>
            </div>
            <input
              {...register("time", { required: true })}
              type="time"
              className="input input-bordered w-full md:max-w-sm"
            />
            {errors.time?.type === "required" && (
              <p className="text-red-600 text-xs">Time is required</p>
            )}
          </label>

          <label className="form-control w-full md:max-w-sm">
            <div className="label">
              <span className="label-text">Guest*</span>
            </div>
            <select
              {...register("guest", { required: true })}
              className="select select-bordered w-full md:max-w-sm"
              defaultValue="1 Person"
            >
              <option>1 Person</option>
              <option>2 Person</option>
              <option>3 Person</option>
              <option>4 Person</option>
            </select>
            {errors.guest?.type === "required" && (
              <p className="text-red-600 text-xs">Guest is required</p>
            )}
          </label>
        </div>

        <div className="flex md:flex-row flex-col gap-3 justify-center mt-4">
          <label className="form-control w-full md:max-w-sm">
            <div className="label">
              <span className="label-text">Name*</span>
            </div>
            <input
              {...register("reserverName", { required: true })}
              defaultValue={user?.displayName}
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full md:max-w-sm"
            />
            {errors.reserverName?.type === "required" && (
              <p className="text-red-600 text-xs">Name is required</p>
            )}
          </label>

          <label className="form-control w-full md:max-w-sm">
            <div className="label">
              <span className="label-text">Email*</span>
            </div>
            <input
              {...register("reserverEmail", { required: true })}
              defaultValue={user?.email}
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full md:max-w-sm"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-600 text-xs">Email is required</p>
            )}
          </label>

          <label className="form-control w-full md:max-w-sm">
            <div className="label">
              <span className="label-text">Phone*</span>
            </div>
            <input
              {...register("reserverPhone", { required: true })}
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full md:max-w-sm"
            />
            {errors.reserverPhone?.type === "required" && (
              <p className="text-red-600 text-xs">Phone is required</p>
            )}
          </label>
        </div>

        <button className="btn rounded-none bg-gradient-to-r from-[#835D23] to-[#B58130] text-white flex mx-auto mt-4 font-cinzel w-60">
          Book a Table
          {!loading && <SlCalender className="text-xl" />}
          {loading ? <SlCalender className="text-xl animate-pulse" /> : ""}
        </button>
      </form>
    </div>
  );
};

export default Reservation;
