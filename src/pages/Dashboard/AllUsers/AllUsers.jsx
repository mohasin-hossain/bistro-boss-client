import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle";
import { FaUsers } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: `Are you sure you want to make ${user.name} an Admin?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Successful!",
              text: `${user.name} is an Admin Now!`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete the user!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="md:px-12">
      <Helmet>
        <title>Bistro Boss | All Users</title>
      </Helmet>
      <SectionTitle
        heading="Manage All Users"
        subHeading="Registered Users"
      ></SectionTitle>
      <div>
        <h3 className="px-4">Total Users: {users.length}</h3>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-[#D1A054] text-white">
              <tr>
                <th>#</th>
                <th className="hidden md:table-cell">Name</th>
                <th>Email</th>
                <th className="text-center">Role</th>
                <th className="hidden md:table-cell">Action</th>
              </tr>
            </thead>
            <tbody className="font-inter font-normal">
              {users.map((user, idx) => (
                <tr key={user._id}>
                  <th>{idx + 1}</th>
                  <td className="hidden md:table-cell">{user.name}</td>
                  <td>{user.email}</td>
                  <td className="text-center">
                    {user.role === "admin" ? (
                      <span className="font-bold text-green-500 p-2 bg-green-100 rounded-md">
                        Admin
                      </span>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-sm text-white bg-[#D1A054] hover:bg-[#D1A054] hover:bg-opacity-90"
                      >
                        <FaUsers className="text-xl"></FaUsers>
                      </button>
                    )}
                  </td>
                  <td className="hidden md:table-cell">
                    <button
                      onClick={() => handleDeleteUser(user)}
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
    </div>
  );
};

export default AllUsers;
