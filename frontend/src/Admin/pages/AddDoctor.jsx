import React, { useState, useContext } from "react";
import DoctorForm from "../components/DoctorForm.jsx";
import { AppContext } from "../../context/AppContext.jsx";

export default function AddDoctor() {
  const { addDoctor } = useContext(AppContext);
  const [saved, setSaved] = useState(null);

  async function handleSubmit(form) {
    const newDoc = await addDoctor(form); // API call
    setSaved(newDoc);
  }

  return (
    <div className="space-y-4">
      <DoctorForm onSubmit={handleSubmit} />
      {saved && (
        <div className="card p-4 text-sm text-green-700 bg-green-50 border-green-200">
          Doctor "{saved.name}" added successfully 🎉
        </div>
      )}
    </div>
  );
}
