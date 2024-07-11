import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaCartPlus } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import { MdReviews } from "react-icons/md";
import useAdmin from "../../../hooks/useAdmin";

const FoodCard = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [, refetch] = useCart();
  const [isAdmin] = useAdmin();

  // Reviews Modal
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", _id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews/${name}`);
      return res.data;
    },
  });
  // Reviews Modal

  const handleAddToCart = () => {

    if (isAdmin) {
      Swal.fire("Admin Can't purchase! Please Login as a Customer.");
      return;
    }

    if (user && user.email) {
      // send to the database
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        price,
        image,
      };

      axiosSecure.post("/carts", cartItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${name} Added To Cart!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        // Refetch cart to update the cart items count
        refetch();
      });
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
        <div className="p-2 md:p-4 grow">
          <h2 className="text-xl mb-4 text-center mx-auto font-cinzel font-medium">
            {name}
          </h2>
          <p className="text-gray-500 font-inter">
            {recipe.length > 70 ? recipe.slice(0, 70) + "..." : recipe}
          </p>
          <div className="card-actions items-center justify-between mt-8">
            {/* Reviews Modal */}
            <button
              className="btn font-cinzel text-xs btn-ghost link uppercase text-[#BB8506]"
              onClick={() =>
                document.getElementById(`my_modal_${_id}`).showModal()
              }
            >
              <MdReviews className="text-2xl" />
              Reviews
            </button>

            <button
              onClick={handleAddToCart}
              className="btn uppercase text-[#BB8506] font-cinzel"
            >
              <FaCartPlus className="text-2xl" />
            </button>

            <dialog
              id={`my_modal_${_id}`}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box border-[#D1A054]">
                <h3 className="font-bold text-lg font-cinzel">
                  Reviews of {name}
                </h3>
                <div className="py-4">
                  {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                      <div
                        key={index}
                        className="mt-4 flex flex-col items-center space-y-2 bg-[#D1A054] bg-opacity-40 p-4 rounded-lg font-inter"
                      >
                        <Rating
                          style={{ maxWidth: 180 }}
                          value={review.rating}
                          readOnly
                          className="text-center"
                        />
                        <p className="text-sm">{review.review}</p>
                        <p className="text-xs text-gray-500">- {review.name}</p>
                      </div>
                    ))
                  ) : (
                    <p className="bg-[#D1A054] bg-opacity-40 p-4">
                      No reviews available.
                    </p>
                  )}
                </div>
                <div className="modal-action sticky -bottom-4 bg-base-200 p-4 font-cinzel">
                  <Link to="/dashboard/review" state={{ menuName: name }}>
                    <button className="btn bg-gradient-to-r from-[#835D23] to-[#B58130] text-white ">
                      Add a Review
                    </button>
                  </Link>

                  <form method="dialog">
                    <button className="btn bg-gradient-to-r from-[#e04e4e] to-[#b01313] text-white ">
                      Close
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
            {/* Reviews Modal */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
