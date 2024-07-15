import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
moment().format();

const ManageOrders = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  const handleOrderStatus = (payment, status) => {
    axiosSecure.patch(`/payments/${payment._id}`, { status }).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Order Status Updated!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDeleteOrder = (payment) => {
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
        axiosSecure.delete(`/payments/${payment._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Order has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Manage Orders</title>
      </Helmet>
      <SectionTitle
        heading={`Total Orders: ${payments.length}`}
        subHeading="At a Glance"
      ></SectionTitle>

      <div className="overflow-x-auto md:px-12 mb-12">
        <table className="table table-xs md:table-md">
          {/* head */}
          <thead className="bg-[#D1A054] text-white">
            <tr className="text-center">
              <th className="hidden md:table-cell">#</th>
              <th className="hidden lg:table-cell">Email</th>
              <th className="hidden lg:table-cell">Transaction ID</th>
              <th>Items</th>
              <th className="hidden md:table-cell">Total Price</th>
              <th className="hidden lg:table-cell">Payment Time</th>
              <th>Status</th>
              <th className="hidden md:table-cell">Delete</th>
            </tr>
          </thead>
          <tbody className="font-inter font-normal">
            {payments.map((payment, idx) => (
              <tr
                key={payment._id}
                className={
                  payment.status === "pending" || payment.status === "failed"
                    ? "bg-red-100"
                    : "bg-green-100"
                }
              >
                <th className="hidden md:table-cell">{idx + 1}</th>
                <td className="hidden lg:table-cell">{payment.email}</td>
                <td className="hidden lg:table-cell">
                  {payment.transactionId}
                </td>
                <td>
                  {/* User Order List Modal */}
                  <button
                    className="link text-[#D1A054] block"
                    onClick={() =>
                      document.getElementById("my_modal_2").showModal()
                    }
                  >
                    View Items
                  </button>

                  <dialog
                    id="my_modal_2"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box ">
                      <h3 className="text-2xl text-center">User Order</h3>
                      <div className="divider"></div>
                      {payment.menuItemNames.map((name, idx) => (
                        <li className=" list-disc" key={idx}>
                          {name} - 1x
                        </li>
                      ))}
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </td>
                <td className="hidden md:table-cell">${payment.price}</td>
                <td className="hidden lg:table-cell">
                  {moment(payment.date).format("MMMM Do YYYY, h:mm a")}
                </td>
                <td>
                  <select
                    onChange={(e) => handleOrderStatus(payment, e.target.value)}
                    value={payment.status}
                    className={`select select-bordered border-[#D1A054] border-2 rounded-md w-full max-w-sm uppercase ${
                      payment.status === "pending" ||
                      payment.status === "failed"
                        ? "border-red-500 text-red-500"
                        : "border-green-500 text-green-500"
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="successful">Successful</option>
                    <option value="failed">Failed</option>
                    <option value="order accepted">Order Accepted</option>
                    <option value="cooking">Cooking</option>
                    <option value="packaging">Packaging</option>
                    <option value="picked by rider">Picked by Rider</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
                <td className="text-center hidden md:table-cell">
                  <button
                    onClick={() => handleDeleteOrder(payment)}
                    className="btn btn-sm text-white bg-red-500 hover:bg-red-500 hover:bg-opacity-90"
                  >
                    <MdDeleteForever className="text-xl"></MdDeleteForever>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
