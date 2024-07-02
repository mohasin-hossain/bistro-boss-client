import SectionTitle from "../../../components/SectionTitle";
import { useForm } from "react-hook-form";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { IoRocket } from "react-icons/io5";

const AddReview = () => {
  const [rating, setRating] = useState(0);
  const axiosSecure = useAxiosSecure();

  const { data: menuNames = [] } = useQuery({
    queryKey: ["menu-names"],
    queryFn: async () => {
      const res = await axiosSecure.get("/menu-names");
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const review = {
      name: data.name,
      menuName: data.menuName,
      review: data.review,
      rating: rating,
    };

    axiosSecure.post("/reviews", review).then((res) => {
      if (res.data.insertedId) {
        reset();
        setRating(0);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thanks for the feedback!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <SectionTitle
        heading="Add a Review"
        subHeading="Sharing is Caring"
      ></SectionTitle>

      <div className="px-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 bg-[#F3F3F3] p-8 mb-12">
          <div className="flex justify-center flex-col items-center">
            <h3 className="text-3xl uppercase mb-4">Rate Us!</h3>
            <Rating
              style={{ maxWidth: 300 }}
              value={rating}
              onChange={setRating}
            />
          </div>

          {/* Menu Name */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Which Menu you liked most?</span>
            </div>
            <select
              defaultValue="default"
              {...register("menuName")}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled value="default">
                Select One
              </option>
              {menuNames.map((menuName, idx) => (
                <option key={idx}>{menuName.name}</option>
              ))}
            </select>
          </label>

            {/* Your Name */}
          <div className="md:flex gap-6">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Your Name</span>
              </div>
              <input
                {...register("name")}
                type="text"
                placeholder="Name"
                className="input input-bordered w-full"
              />
            </label>
          </div>

          {/* Review */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                Kindly express your care in a short way.
              </span>
            </div>
            <textarea
              {...register("review")}
              className="textarea textarea-bordered"
              placeholder="Review in details..."
            ></textarea>
          </label>

          <button className="btn rounded-none bg-gradient-to-r from-[#835D23] to-[#B58130] text-white">
            Send Review
            <IoRocket className="text-xl" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
