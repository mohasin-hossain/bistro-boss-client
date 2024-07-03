import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";

const ManagePayments = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  const handlePaymentStatus = (payment, status) => {
    axiosSecure.patch(`/payments/${payment._id}`, { status }).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Payment Status Updated!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDeletePayment = (payment) => {
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
              text: "Payment has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <SectionTitle
        heading={`Total Payments: ${payments.length}`}
        subHeading="At a Glance"
      ></SectionTitle>

      <div className="overflow-x-auto px-12 mb-12">
        <table className="table">
          {/* head */}
          <thead className="bg-[#D1A054] text-white">
            <tr className="text-center">
              <th>#</th>
              <th>Email</th>
              <th>Transaction ID</th>
              <th>Total Price</th>
              <th>Payment Date</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr
                key={payment._id}
                className={
                  payment.status === "successful"
                    ? "bg-green-100"
                    : "bg-red-100"
                }
              >
                <th>{idx + 1}</th>
                <td>{payment.email}</td>
                <td>{payment.transactionId}</td>
                <td>${payment.price}</td>
                <td>{payment.date}</td>
                <td>
                  <select
                    onChange={(e) =>
                      handlePaymentStatus(payment, e.target.value)
                    }
                    value={payment.status}
                    className={`select select-bordered border-[#D1A054] border-2 rounded-md w-full max-w-md uppercase ${
                      payment.status === "successful"
                        ? "border-green-500 text-green-500"
                        : "border-red-500 text-red-500"
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="successful">Successful</option>
                    <option value="failed">Failed</option>
                  </select>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleDeletePayment(payment)}
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

export default ManagePayments;
