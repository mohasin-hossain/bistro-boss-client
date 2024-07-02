import { SlCalender } from "react-icons/sl";
import SectionTitle from "../../../components/SectionTitle";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Reservation = () => {
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

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const booking = {
      menu: data.menuName,
      name: data.reserverName,
      phone: data.reserverPhone,
      email: data.reserverEmail,
      date: data.date,
      time: data.time,
      guest: data.guest,
      status: "pending for approval",
    };

    axiosSecure.post("/bookings", booking).then((res) => {
      if (res.data.insertedId) {
        reset();
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
      <SectionTitle
        heading="Reservation"
        subHeading="Book a Table"
      ></SectionTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Menu Name */}
        <div className="px-12">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                Which Menu Item you would like to book?
              </span>
            </div>
            <select
              defaultValue="default"
              {...register("menuName")}
              className="select select-bordered w-full"
            >
              <option disabled value="default">
                Select One
              </option>
              {menuNames.map((menuName, idx) => (
                <option key={idx}>{menuName.name}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex gap-3 justify-center mt-4">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Date*</span>
            </div>
            <input
              {...register("date")}
              type="date"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Time*</span>
            </div>
            <input
              {...register("time")}
              type="time"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Guest*</span>
            </div>
            <select
              {...register("guest")}
              className="select select-bordered w-full max-w-xs"
              defaultValue="1 Person"
            >
              <option>1 Person</option>
              <option>2 Person</option>
              <option>3 Person</option>
              <option>4 Person</option>
            </select>
          </label>
        </div>

        <div className="flex gap-3 justify-center mt-4">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Name*</span>
            </div>
            <input
              {...register("reserverName")}
              defaultValue={user?.displayName}
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email*</span>
            </div>
            <input
              {...register("reserverEmail")}
              defaultValue={user?.email}
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Phone*</span>
            </div>
            <input
              {...register("reserverPhone")}
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>

        <button className="btn rounded-none bg-gradient-to-r from-[#835D23] to-[#B58130] text-white flex mx-auto mt-4">
          Book a Table
          <SlCalender className="text-xl" />
        </button>
      </form>
    </div>
  );
};

export default Reservation;
