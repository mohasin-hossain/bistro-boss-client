import useAuth from "../../../hooks/useAuth";

const AdminHome = () => {
    const { user } = useAuth();
  return (
    <div>
      <h3 className="text-3xl">Welcome Back</h3>
      {user?.displayName ? ", " + user.displayName : ""}
    </div>
  );
};

export default AdminHome;