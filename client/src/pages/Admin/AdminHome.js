import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-felx flex-column mt-4">
          <h1>
            Welcome Admin <i className="text-success">{user?.name}</i>
          </h1>
          <h3>Manage Blood Bank App </h3>
          <hr />
          <p>
            From here you can manage all users such as Donar, Hospitals,
            Organisations.
            You have full control to approve requests,
            monitor donations, and delete any account if needed.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;