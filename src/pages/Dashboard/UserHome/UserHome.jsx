import useAuth from "../../../hooks/useAuth";
import { FaBook } from "react-icons/fa";
import { GoCodeReview } from "react-icons/go";
import { GiWallet } from "react-icons/gi";
import { BsMinecart } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["user-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-stats/${user?.email}`);
      return res.data;
    },
  });

  console.log(stats)

  return (
    <div className="p-12">
      <h3 className="text-3xl">
        Welcome
        <span className="text-orange-500 font-bold">
          {" "}
          {user?.displayName ? user.displayName + "!" : "Back"}
        </span>
      </h3>

      <div className="flex mt-4">
        <div className="w-1/2 flex justify-center items-center bg-[#FFEDD5] border-r-4 border-[#D1A054] p-20">
          <div>
            <img
              className=" w-48 rounded-full border-4 border-[#D1A054]"
              src={user.photoURL}
              alt=""
            />
            <h3 className="text-3xl text-center mt-4">{user?.displayName}</h3>
          </div>
        </div>
        <div className="w-1/2 bg-[#FEF9C3] p-20">
          <h2 className="text-3xl">Your Activities</h2>
          <div className="space-y-2 mt-4">
            <p className="flex gap-2 font-semibold text-[#0088FE]">
              <BsMinecart className="text-2xl" />
              Orders: {stats.orders}
            </p>
            <p className="flex gap-2 font-semibold text-[#00C4A1]">
              <GoCodeReview className="text-2xl" />
              Reviews:
            </p>
            <p className="flex gap-2 font-semibold text-[#FFBB28]">
              <FaBook className="text-2xl" />
              Bookings:
            </p>
            <p className="flex gap-2 font-semibold text-[#FF8042]">
              <GiWallet className="text-2xl" />
              Payments: {stats.orders}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
