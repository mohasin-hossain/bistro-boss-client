import { MdDeleteForever } from "react-icons/md";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { PiSmileySadLight } from "react-icons/pi";
import { IoRocket } from "react-icons/io5";

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
    <div className="p-12">
      <div className="flex justify-between">
        <h3 className="text-3xl font-semibold">Total Order: {cart.length}</h3>
        <h3 className="text-3xl font-semibold">
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

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Item Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={item._id}>
                <th>{idx + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="h-16 w-16">
                      <img src={item.image} alt="Item image" />
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <th>
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="btn btn-ghost btn-lg p-2"
                  >
                    <MdDeleteForever className="text-3xl text-red-500" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        {!cart.length && (
          <div className="text-2xl font-thin mt-20 w-1/2 flex justify-center items-center p-4 bg-[#D1A054] text-white mx-auto">
            <PiSmileySadLight className="text-3xl mr-2" />
            Your Cart is Hungry! Fill it Up and Stay Healthy!
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
