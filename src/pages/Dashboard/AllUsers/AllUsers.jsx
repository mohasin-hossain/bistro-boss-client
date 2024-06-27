import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle";
import { FaUsers } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  return (
    <div className="px-12">
      <SectionTitle
        heading="Manage All Users"
        subHeading="Registered Users"
      ></SectionTitle>
      <div>
        <h3>Total Users: {users.length}</h3>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id}>
                  <th>{idx + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button className="btn btn-sm text-white bg-[#D1A054] hover:bg-[#D1A054] hover:bg-opacity-90">
                      <FaUsers className="text-xl"></FaUsers>
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-sm text-white bg-red-500 hover:bg-red-500 hover:bg-opacity-90">
                      <MdDeleteForever className="text-xl"></MdDeleteForever>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
