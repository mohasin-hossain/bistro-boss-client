import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ProfileImg from "../../../assets/others/profile.png";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaUsers, FaUtensils } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Helmet } from "react-helmet-async";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });

  // BAR Chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // Pie Chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieData = chartData.map((data) => {
    return { name: data.category, value: data.revenue };
  });

  return (
    <div className="my-8 px-2 md:px-12 flex justify-center items-center flex-col">
      <Helmet>
        <title>Bistro Boss | Admin Home</title>
      </Helmet>
      <h3 className="text-sm md:text-3xl">
        Welcome
        <span className="text-orange-500 font-bold">
          {" "}
          {user?.displayName ? user.displayName + "!" : "Back"}
        </span>
      </h3>

      <div className="stats shadow mt-4 stats-vertical w-full md:stats-horizontal">
        <div className="stat block md:hidden lg:block">
          <img
            className="w-20 h-20 rounded-full border-4 border-[#D1A054] mx-auto"
            src={user.photoURL ? user.photoURL : ProfileImg}
            alt=""
          />
        </div>

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

      <div className="flex items-center lg:flex-row flex-col lg:gap-4 mt-8">
        <div style={{ width: "100%", height: 400 }} className="lg:w-1/2">
          <ResponsiveContainer>
            <BarChart
              // width={500}
              // height={400}
              data={chartData}
              margin={{
                left: -30,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Bar
                dataKey="quantity"
                fill="#8884d8"
                shape={<TriangleBar />}
                label={{ position: "top" }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="lg:w-1/2 mx-auto">
          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={170}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend></Legend>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
