import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { IoCheckmarkCircle } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  const handleConfirm = (booking, status) => {
    Swal.fire({
      title: `Confirm booking for ${booking.menu}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, Confirm it for ${booking.name}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/bookings/${booking._id}`, { status })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Confirmed!",
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleCancel = (booking, status) => {
    Swal.fire({
      title: `Cancel booking for ${booking.menu}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, Cancel it for ${booking.name}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/bookings/${booking._id}`, { status })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Cancelled!",
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleDelete = (booking) => {
    Swal.fire({
      title: `Are you sure you want to delete booking for ${booking.menu}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, Delete it for ${booking.name}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookings/${booking._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
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
        heading="Manage All Bookings"
        subHeading="At a glance"
      ></SectionTitle>

      <div className="overflow-x-auto px-12 mb-12">
        <table className="table">
          {/* head */}
          <thead className="bg-[#D1A054] text-white">
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>Booked Item</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Confirm</th>
              <th>Cancel</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, idx) => (
              <tr
                key={booking._id}
                className={
                  booking.status === "confirmed" ? "bg-green-100" : "bg-red-100"
                }
              >
                <th>{idx + 1}</th>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.menu}</td>
                <td>{booking.guest}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td
                  className={
                    booking.status === "confirmed"
                      ? "text-green-500 font-bold uppercase"
                      : "text-red-500 font-semibold uppercase"
                  }
                >
                  {booking.status}
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleConfirm(booking, "confirm")}
                    className="btn btn-sm text-white bg-[#287855] hover:bg-[#287855] hover:bg-opacity-90"
                    disabled={booking.status === "confirmed"}
                  >
                    <IoCheckmarkCircle className="text-xl"></IoCheckmarkCircle>
                  </button>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleCancel(booking, "cancel")}
                    className="btn btn-sm text-white bg-red-500 hover:bg-red-500 hover:bg-opacity-90"
                    disabled={booking.status === "Sorry, Out of space!"}
                  >
                    <RxCrossCircled className="text-xl" />
                  </button>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleDelete(booking)}
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

export default ManageBookings;
