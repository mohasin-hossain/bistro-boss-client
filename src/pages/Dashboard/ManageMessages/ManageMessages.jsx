import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const ManageMessages = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: messages = [] } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/messages");
      return res.data;
    },
  });

  const handleDeleteMessage = (id) => {
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
        axiosSecure.delete(`/messages/${id}`).then((res) => {
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
    <div>
      <SectionTitle
        heading="Messages"
        subHeading="See what your customer says!"
      />

      <div className="md:px-12">
        <div className="overflow-x-auto">
          <table className="table table-xs md:table-md">
            {/* head */}
            <thead className="bg-[#D1A054] text-white">
              <tr>
                <th className="hidden lg:table-cell">#</th>
                <th className="hidden lg:table-cell">Name</th>
                <th className="hidden lg:table-cell">Email</th>
                <th>Phone Number</th>
                <th>Message</th>
                <th className="hidden lg:table-cell">Delete</th>
              </tr>
            </thead>
            <tbody className="font-inter font-normal">
              {messages.map((message, idx) => (
                <tr key={idx}>
                  <th className="hidden lg:table-cell">{idx + 1}</th>
                  <td className="hidden lg:table-cell">{message.name}</td>
                  <td className="hidden lg:table-cell">{message.email}</td>
                  <td>{message.phone}</td>
                  <td className="italic font-semibold">
                    {message.message}
                  </td>
                  <td className="hidden lg:table-cell">
                    <button
                      onClick={() => handleDeleteMessage(message._id)}
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

export default ManageMessages;
