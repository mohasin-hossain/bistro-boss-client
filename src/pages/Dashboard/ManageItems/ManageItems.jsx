import { MdDeleteForever } from "react-icons/md";
import SectionTitle from "../../../components/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ManageItems = () => {
  const [menu, , refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/menu/${item._id}`).then((result) => {
          if (result.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: `${item.name} has been deleted!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  return (
    <div className="mb-10">
      <Helmet>
        <title>Bistro Boss | Manage Items</title>
      </Helmet>
      <SectionTitle
        heading="Manage All Items"
        subHeading="Hurry Up"
      ></SectionTitle>

      <div className="md:px-12">
        <h3 className="px-4">Total Items: {menu.length}</h3>

        <div className="overflow-x-auto">
          <table className="table table-xs md:table-md">
            {/* head */}
            <thead className="bg-[#D1A054] text-white">
              <tr>
                <th>#</th>
                <th className="hidden md:table-cell">Item Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="font-inter font-normal">
              {menu.map((item, idx) => (
                <tr key={item._id}>
                  <td>{idx + 1}</td>
                  <td className="hidden md:table-cell">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-12 h-12 rounded-md"
                        src={item.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <Link to={`/dashboard/updateItem/${item._id}`}>
                      <button className="btn btn-sm text-white bg-[#D1A054] hover:bg-[#D1A054] hover:bg-opacity-90 flex">
                        <FaRegEdit className="text-xl"></FaRegEdit>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteItem(item)}
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

export default ManageItems;
