import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <h3 className="text-3xl">
        Welcome
        <span className="text-orange-500 font-bold">
          {" "}
          {user?.displayName ? user.displayName + "!" : "Back"}
        </span>
      </h3>
    </div>
  );
};

export default UserHome;
