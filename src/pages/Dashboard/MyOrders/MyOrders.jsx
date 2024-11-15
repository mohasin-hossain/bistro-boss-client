import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { PiSmileySadLight } from "react-icons/pi";
import SectionTitle from "../../../components/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
moment().format();

const MyOrders = () => {
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
      <Helmet>
        <title>Bistro Boss | My Orders</title>
      </Helmet>
      <SectionTitle
        heading={`My Orders: ${payments.length}`}
        subHeading="At a Glance"
      ></SectionTitle>

      <div className="overflow-x-auto md:px-12">
        <table className="table min-w-full">
          {/* head */}
          <thead className="bg-[#D1A054] text-white">
            <tr>
              <th>#</th>
              <th className="hidden lg:table-cell">Email</th>
              <th className="hidden lg:table-cell">Transaction ID</th>
              <th>Ordered Items</th>
              <th>Total Price</th>
              <th className="hidden lg:table-cell">Payment Date & Time</th>
              <th>Status</th>
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
                <th>{idx + 1}</th>
                <td className="hidden lg:table-cell">{payment.email}</td>
                <td className="hidden lg:table-cell">
                  {payment.transactionId}
                </td>
                <td>
                  {/* User Order List Modal */}
                  <button
                    className="link text-[#D1A054] block"
                    onClick={() =>
                      document
                        .getElementById(`my_modal_${payment._id}`)
                        .showModal()
                    }
                  >
                    View Items
                  </button>

                  <dialog
                    id={`my_modal_${payment._id}`}
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box ">
                      <h3 className="text-2xl text-center">Your Order</h3>
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
                <td>${payment.price}</td>
                <td className="hidden lg:table-cell">
                  {moment(payment.date).format("MMMM Do YYYY, h:mm a")}
                </td>
                <td
                  className={
                    payment.status === "pending" || payment.status === "failed"
                      ? "text-red-500 font-semibold uppercase"
                      : "text-green-500 uppercase font-bold"
                  }
                >
                  {payment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!payments.length && (
          <div className="text-2xl font-thin mt-20 w-1/2 flex justify-center items-center p-4 bg-[#D1A054] text-white mx-auto text-center">
            <PiSmileySadLight className="text-3xl mr-2" />
            Invest in your health — make a payment today!
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
