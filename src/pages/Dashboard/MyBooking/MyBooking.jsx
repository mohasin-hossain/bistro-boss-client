import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyBooking = () => {
    const axiosSecure = useAxiosSecure();

    const {data: bookings = []} = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings')
            return res.data;
        }
    })

    return (
        <div>
            <SectionTitle heading="My Booking" subHeading="Excellent Ambience"></SectionTitle>
      
            <div className="overflow-x-auto px-12">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, idx) => (
              <tr key={booking._id}>
                <th>{idx + 1}</th>
                <td>{booking.name}</td>
                <td>{booking.menu}</td>
                <td>{booking.guest}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td className="text-red-500">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default MyBooking;