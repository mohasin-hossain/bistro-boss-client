import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    // Upload image to imgbb and get an url
    const imgFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imgFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // Now send the menu item data to the server with the image url
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipeDetails,
        image: res.data.data.display_url,
      };
      const menuRes = await axiosSecure.post("/menu", menuItem);
      if (menuRes.data.insertedId) {
        // Show Success Popup
        reset();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${data.name} added to the Menu!`,
          showConfirmButton: false,
          timer: 1500,
        });
        setImagePreview(null);
      }
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
    <div>
      <SectionTitle
        heading="Add an Item"
        subHeading="What's New"
      ></SectionTitle>

      <div className="px-12 font-inter font-normal">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {/* Recipe Name */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe Name*</span>
            </div>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Recipe Name"
              className="input input-bordered w-full"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-600 text-xs">Name is required</p>
            )}
          </label>

          <div className="md:flex gap-6">
            {/* Category */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Category*</span>
              </div>
              <select
                {...register("category", { required: true })}
                className="select select-bordered w-full"
                defaultValue=""
              >
                <option disabled value="">
                  Select a category
                </option>
                <option value="offered">Offer</option>
                <option value="popular">Popular</option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
              {errors.category?.type === "required" && (
                <p className="text-red-600 text-xs">Please select a category</p>
              )}
            </label>

            {/* Price */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Price*</span>
              </div>
              <input
                {...register("price", { required: true })}
                type="text"
                placeholder="Recipe Name"
                className="input input-bordered w-full"
              />
              {errors.price?.type === "required" && (
                <p className="text-red-600 text-xs">Price is required</p>
              )}
            </label>
          </div>

          {/* Recipe Details */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe Details*</span>
            </div>
            <textarea
              {...register("recipeDetails", { required: true, minLength: 70 })}
              className="textarea textarea-bordered"
              placeholder="Recipe Details"
            ></textarea>
            {errors.recipeDetails?.type === "required" && (
              <p className="text-red-600 text-xs">Recipe Detail is required</p>
            )}
            {errors.recipeDetails?.type === "minLength" && (
              <p className="text-red-600 text-xs">
                Details must be atleast 70 characters!
              </p>
            )}
          </label>

          {/* Image */}
          <div className="flex gap-3 md:gap-8 items-center">
            {imagePreview && (
              <div>
                <div className="label">
                  <span className="label-text font-semibold">
                    Image Preview
                  </span>
                </div>
                <img src={imagePreview} className="w-48 rounded-md" alt="" />
              </div>
            )}
            <div>
              <div className="label">
                <span className="label-text">Add Recipe Image*</span>
              </div>
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input w-full max-w-md"
                onChange={handleImageChange}
              />
              {errors.image?.type === "required" && (
                <p className="text-red-600 text-xs">Image is required</p>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button className="btn rounded-none bg-gradient-to-r from-[#835D23] to-[#B58130] text-white w-60 font-cinzel">
              Add Item
              <FaUtensils></FaUtensils>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
