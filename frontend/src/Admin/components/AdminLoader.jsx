import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../../context/AdminAuthContext";

const AdminLoader = () => {
  const navigate = useNavigate();
  const { adminCount, loading } = useContext(AdminAuthContext);

  React.useEffect(() => {
    if (!loading) {
      if (adminCount === 0) {
        navigate("/admin-login"); // first admin sees signup
      } else {
        setTimeout(() => {
          navigate("/admin-login"); // normal login flow
        }, 2000);
      }
    }
  }, [loading, adminCount, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-primary text-white text-3xl font-bold">
      {loading ? "Loading..." : "Welcome to Prescripto!"}
    </div>
  );
};

export default AdminLoader;
