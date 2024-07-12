import useAuth from "../../../hooks/useAuth";
import { FaBook } from "react-icons/fa";
import { GoCodeReview } from "react-icons/go";
import { GiWallet } from "react-icons/gi";
import { BsMinecart } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ProfileImg from "../../../assets/others/profile.png";

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

  return (
    <div className="py-12 px-2 md:p-12">
      <h3 className="text-3xl">
        Welcome
        <span className="text-orange-500 font-bold">
          {" "}
          {user?.displayName ? user.displayName + "!" : "Back"}
        </span>
      </h3>

      <div className="flex md:flex-row flex-col mt-4">
        <div className="md:w-1/2 flex justify-center items-center bg-[#FFEDD5] border-b-4 md:border-r-4 md:border-b-0 border-[#D1A054] p-20">
          <div>
            <img
              className="w-48 rounded-full border-4 border-[#D1A054]"
              src={user.photoURL ? user.photoURL : ProfileImg}
              alt=""
            />
            <h3 className="text-3xl text-center mt-4">{user?.displayName}</h3>
          </div>
        </div>
        <div className="md:w-1/2 bg-[#FEF9C3] p-20 text-center md:text-left">
          <h2 className="text-3xl">Your Activities</h2>
          <div className="space-y-2 mt-4 flex flex-col items-center md:items-start">
            <p className="flex gap-2 font-semibold text-[#0088FE]">
              <BsMinecart className="text-2xl" />
              Orders: {stats.orders}
            </p>
            <p className="flex gap-2 font-semibold text-[#00C4A1]">
              <GoCodeReview className="text-2xl" />
              Reviews: {stats.reviews}
            </p>
            <p className="flex gap-2 font-semibold text-[#FFBB28]">
              <FaBook className="text-2xl" />
              Bookings: {stats.bookings}
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
