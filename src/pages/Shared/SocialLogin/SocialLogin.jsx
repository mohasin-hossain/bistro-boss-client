import { FaCheck, FaCopy, FaEye, FaGoogle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

const SocialLogin = ({ title }) => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const newUser = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        axiosPublic.post("/users", newUser).then((res) => {
          console.log(res.data);
          navigate("/");
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);

    // Reset the icon after 5 seconds
    setTimeout(() => setCopiedField(null), 5000);
  };

  return (
    <div className="text-center">
      <div className="divider uppercase font-cinzel font-semibold text-xs">
        {title}
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="btn btn-ghost rounded-full outline -mt-2"
      >
        <FaGoogle></FaGoogle>
      </button>

      <button
        className="btn ml-5 bg-red-600 rounded-none font-cinzel text-white text-xs"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        OR USE Dummy Login data <FaEye className="text-xl" />
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-center">
          <h3 className="font-bold text-lg text-center mb-5">Login as Admin</h3>
          <div className="flex items-center">
            <p>Email: admin@gmail.com</p>
            <button
              className="cursor-pointer text-xl text-[#D1A054] ml-3"
              onClick={() => handleCopy("admin@gmail.com", "adminEmail")}
            >
              {copiedField === "adminEmail" ? <FaCheck /> : <FaCopy />}
            </button>
          </div>
          <div className="flex items-center">
            <p>Password: tester123#ADMIN</p>
            <button
              className="cursor-pointer text-xl text-[#D1A054] ml-3"
              onClick={() => handleCopy("tester123#ADMIN", "adminPassword")}
            >
              {copiedField === "adminPassword" ? <FaCheck /> : <FaCopy />}
            </button>
          </div>
          <h3 className="font-bold text-lg text-center my-5">
            Login as Customer
          </h3>
          <div className="flex items-center">
            <p>Email: customer@gmail.com</p>
            <button
              className="cursor-pointer text-xl text-[#D1A054] ml-3"
              onClick={() => handleCopy("customer@gmail.com", "customerEmail")}
            >
              {copiedField === "customerEmail" ? <FaCheck /> : <FaCopy />}
            </button>
          </div>
          <div className="flex items-center">
            <p>Password: tester123#CUSTOMER</p>
            <button
              className="cursor-pointer text-xl text-[#D1A054] ml-3"
              onClick={() =>
                handleCopy("tester123#CUSTOMER", "customerPassword")
              }
            >
              {copiedField === "customerPassword" ? <FaCheck /> : <FaCopy />}
            </button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-[#D1A054] text-white">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SocialLogin;

SocialLogin.propTypes = {
  title: PropTypes.string.isRequired,
};
