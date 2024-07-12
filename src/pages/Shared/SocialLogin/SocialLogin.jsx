import { FaGoogle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = ({ title }) => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        // console.log(result);
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

  return (
    <div className="text-center">
      <div className="divider uppercase font-cinzel font-semibold text-xs">{title}</div>
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-ghost rounded-full outline -mt-2"
      >
        <FaGoogle></FaGoogle>
      </button>
    </div>
  );
};

export default SocialLogin;
