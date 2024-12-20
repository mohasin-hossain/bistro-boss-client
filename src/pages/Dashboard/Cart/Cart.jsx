import { MdDeleteForever } from "react-icons/md";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { PiSmileySadLight } from "react-icons/pi";
import { IoRocket } from "react-icons/io5";
import { Helmet } from "react-helmet-async";

const Cart = () => {
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((total, cv) => (total += cv.price), 0);
  const axiosSecure = useAxiosSecure();

  const handleDeleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="py-12 md:px-12 px-2">
      <Helmet>
        <title>Bistro Boss | Cart</title>
      </Helmet>
      <div className="flex md:flex-row flex-col items-end justify-between">
        <h3 className="text-base md:text-3xl font-semibold">
          Items: {cart.length}
        </h3>
        <h3 className="text-base md:text-3xl font-semibold">
          Total Price: ${totalPrice.toFixed(2)}
        </h3>
        {cart.length ? (
          <Link to="/dashboard/payment">
            <button className="btn bg-gradient-to-r from-[#835D23] to-[#B58130] text-white hover:bg-opacity-90 rounded-none">
              Order Now <IoRocket className="text-xl" />
            </button>
          </Link>
        ) : (
          <button
            disabled
            className="btn rounded-none bg-gradient-to-r from-[#835D23] to-[#B58130] text-black "
          >
            Order Now <IoRocket className="text-xl" />
          </button>
        )}
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="table">
          {/* head */}
          <thead className="bg-[#D1A054] text-white">
            <tr>
              <th>#</th>
              <th className="hidden md:table-cell">Item Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={item._id}>
                <th>{idx + 1}</th>
                <td className="hidden md:table-cell">
                  <div className="flex items-center gap-3">
                    <div>
                      <img
                        className="w-12 h-12 rounded-md"
                        src={item.image}
                        alt="Item image"
                      />
                    </div>
                  </div>
                </td>
                <td className="text-xs md:text-base">{item.name}</td>
                <td>${item.price}</td>
                <th>
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="btn btn-ghost btn-sm text-white bg-red-500 hover:bg-red-500 hover:bg-opacity-90"
                  >
                    <MdDeleteForever className="text-2xl " />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        {!cart.length && (
          <div className="text-2xl font-thin mt-20 md:w-1/2 flex justify-center items-center p-4 bg-[#D1A054] text-white mx-auto text-center">
            <PiSmileySadLight className="text-3xl mr-2" />
            Your Cart is Hungry! Fill it Up and Stay Healthy!
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
