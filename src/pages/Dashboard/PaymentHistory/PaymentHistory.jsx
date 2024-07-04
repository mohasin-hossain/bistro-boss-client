import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { PiSmileySadLight } from "react-icons/pi";
import moment from "moment";
moment().format();

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <SectionTitle
        heading={`Total Payments: ${payments.length}`}
        subHeading="At a Glance"
      ></SectionTitle>

      <div className="overflow-x-auto px-12">
        <table className="table">
          {/* head */}
          <thead className="bg-[#D1A054] text-white">
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Transaction ID</th>
              <th>Total Price</th>
              <th>Payment Date & Time</th>
              <th>Status</th>
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
                <td>{moment(payment.date).format("MMMM Do YYYY, h:mm a")}</td>
                <td
                  className={
                    payment.status === "successful"
                      ? "text-green-500 uppercase font-bold"
                      : "text-red-500 font-semibold uppercase"
                  }
                >
                  {payment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!payments.length && (
          <div className="text-2xl font-thin mt-20 w-1/2 flex justify-center items-center p-4 bg-[#D1A054] text-white mx-auto">
            <PiSmileySadLight className="text-3xl mr-2" />
            Invest in your health — make a payment today!
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
