import React, { useContext } from "react";
import DoctorTable from "../components/DoctorTable.jsx";
import { AppContext } from "../../context/AppContext.jsx";

export default function DoctorList() {
  const { doctors, deleteDoctor } = useContext(AppContext);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">All Doctors</h1>
        <a href="/admin/add-doctor" className="btn btn-solid">
          Add Doctor
        </a>
      </div>
      <DoctorTable doctors={doctors} onRemove={deleteDoctor} />
    </div>
  );
}
