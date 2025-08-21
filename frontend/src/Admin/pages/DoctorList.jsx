import React, { useState } from "react";
import DoctorTable from "../components/DoctorTable.jsx";
import { doctors as seed } from "../../assets/assets_frontend/assets.js";

export default function DoctorList() {
  const [list, setList] = useState(seed);
  function remove(id) {
    setList((l) => l.filter((d) => d._id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">All Doctors</h1>
        <a href="/admin/add-doctor" className="btn btn-solid">
          Add Doctor
        </a>
      </div>
      <DoctorTable doctors={list} onRemove={remove} />
    </div>
  );
}
