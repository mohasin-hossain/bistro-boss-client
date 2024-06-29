import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaUsers, FaUtensils } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  return (
    <div className="my-8 px-12">
      <h3 className="text-3xl">
        Welcome
        <span className="text-orange-500 font-bold">
          {" "}
          {user?.displayName ? user.displayName + "!" : "Back"}
        </span>
      </h3>

      <div className="stats shadow mt-4 space-x-4">
        <div className="stat">
          <div className="stat-figure text-primary">
            <GiTakeMyMoney className="text-5xl" />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value text-primary">{stats.revenue}$</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUsers className="text-5xl" />
          </div>
          <div className="stat-title">Users</div>
          <div className="stat-value text-secondary">{stats.users}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUtensils className="text-4xl" />
          </div>
          <div className="stat-title">Menu Items</div>
          <div className="stat-value text-secondary">{stats.menuItems}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <CiDeliveryTruck className="text-5xl" />
          </div>
          <div className="stat-title">Orders</div>
          <div className="stat-value">{stats.orders}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
