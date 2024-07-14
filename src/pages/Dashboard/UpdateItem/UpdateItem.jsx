import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const { name, recipe, price, category, _id, image } = useLoaderData();
  const [imagePreview, setImagePreview] = useState(image);

  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    let imageUrl = image;

    if (data.image && data.image.length > 0) {
      // Upload image to imgbb and get an url
      const imgFile = { image: data.image[0] };
      const res = await axiosPublic.post(image_hosting_api, imgFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        imageUrl = res.data.data.display_url;
      }
    }
    
    // Now send the menu item data to the server with the image url
    const menuItem = {
      name: data.name,
      category: data.category,
      price: parseFloat(data.price),
      recipe: data.recipeDetails,
      image: imageUrl,
    };
    const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
    if (menuRes.data.modifiedCount > 0) {
      // Show Success Popup
      // reset();
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `${data.name} updated to the Menu!`,
        showConfirmButton: false,
        timer: 1500,
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
    <div className="mb-10">
      <SectionTitle
        heading="Update an Item"
        subHeading="Update Now"
      ></SectionTitle>

      <div className="px-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 font-inter font-normal"
        >
          {/* Recipe Name */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe Name*</span>
            </div>
            <input
              {...register("name")}
              defaultValue={name}
              type="text"
              placeholder="Recipe Name"
              className="input input-bordered w-full"
            />
          </label>

          <div className="md:flex gap-6">
            {/* Category */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Category*</span>
              </div>
              <select
                {...register("category")}
                className="select select-bordered w-full"
                defaultValue={category}
              >
                <option disabled value="default">
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
            </label>

            {/* Price */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Price*</span>
              </div>
              <input
                {...register("price")}
                defaultValue={price}
                type="text"
                placeholder="Recipe Name"
                className="input input-bordered w-full"
              />
            </label>
          </div>

          {/* Recipe Details */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe Details*</span>
            </div>
            <textarea
              defaultValue={recipe}
              {...register("recipeDetails")}
              className="textarea textarea-bordered"
              placeholder="Recipe Details"
            ></textarea>
          </label>

          {/* Image */}
          <div className="flex gap-3 md:gap-8 items-center">
            <div>
              <div className="label">
                <span className="label-text font-semibold">Image Preview</span>
              </div>
              <img src={imagePreview} className="w-48 rounded-md" alt="" />
            </div>
            <div>
              <div className="label">
                <span className="label-text">Update Recipe Image*</span>
              </div>
              <input
                {...register("image")}
                type="file"
                className="file-input w-full max-w-xs"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button className="btn rounded-none bg-gradient-to-r from-[#835D23] to-[#B58130] text-white w-60 font-cinzel mt-8">
              Update Item
              <FaUtensils></FaUtensils>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
