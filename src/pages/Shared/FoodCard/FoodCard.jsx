import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";

const FoodCard = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();


  const handleAddToCart = () => {
    if (user && user.email) {

      // send to the database
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        price, 
        image,
      }

      axiosSecure.post('/carts', cartItem)
      .then(res => {
        if(res.data.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${name} Added To Cart!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
        // Refetch cart to update the cart items count
        refetch();
      })

    } else {
      Swal.fire({
        title: "You are not logged In!",
        text: "Please Login to add prodducts to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div>
      <div className="bg-base-100 shadow-md rounded-none flex flex-col">
        <figure className="relative">
          <img className="w-full" src={image} alt="" />
          <p className="p-1 bg-slate-900 text-white w-20 absolute top-4 right-4">
            ${price}
          </p>
        </figure>
        <div className="card-body grow">
          <h2 className="card-title mx-auto">{name}</h2>
          <p className="text-gray-500">
            {recipe.length > 80 ? recipe.slice(0, 80) + "..." : recipe}
          </p>
          <div className="card-actions justify-center">
            <button
              onClick={handleAddToCart}
              className="btn btn-outline border-0 border-b-2 border-[#BB8506] bg-[#E8E8E8] uppercase text-[#BB8506]"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
