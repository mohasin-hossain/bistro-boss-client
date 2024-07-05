import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { PiSmileySadLight } from "react-icons/pi";
import moment from "moment";

const MyBooking = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <SectionTitle
        heading="My Booking"
        subHeading="Excellent Ambience"
      ></SectionTitle>

      <div className="overflow-x-auto px-12">
        <table className="table">
          {/* head */}
          <thead className="bg-[#D1A054] text-white">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Booked Item</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="font-inter font-normal">
            {bookings.map((booking, idx) => (
              <tr
                key={booking._id}
                className={
                  booking.status === "confirmed" ? "bg-green-100" : "bg-red-100"
                }
              >
                <th>{idx + 1}</th>
                <td>{booking.name}</td>
                <td>{booking.menu}</td>
                <td>{booking.guest}</td>
                <td>{booking.date}</td>
                <td>{moment(booking.time, "HH:mm").format("hh:mm A")}</td>
                <td
                  className={
                    booking.status == "confirmed"
                      ? "text-green-500 font-bold uppercase"
                      : "text-red-500 font-semibold uppercase"
                  }
                >
                  {booking.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!bookings.length && (
          <div className="text-2xl font-thin mt-20 w-1/2 flex justify-center items-center p-4 bg-[#D1A054] text-white mx-auto">
            <PiSmileySadLight className="text-3xl mr-2" />
            Don't wait—book your item today!
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
