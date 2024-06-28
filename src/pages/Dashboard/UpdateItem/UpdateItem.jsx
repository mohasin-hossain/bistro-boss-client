import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const { name, recipe, price, category, _id } = useLoaderData();

  const { register, handleSubmit } = useForm();
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
    }
  };

  return (
    <div>
      <SectionTitle
        heading="Update an Item"
        subHeading="Update Now"
      ></SectionTitle>

      <div className="px-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
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
          <div>
            <input
              {...register("image")}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn">
            Update Item
            <FaUtensils></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
