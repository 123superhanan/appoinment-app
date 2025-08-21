import React, { useState } from "react";
import DoctorForm from "../components/DoctorForm.jsx";

export default function AddDoctor() {
  const [saved, setSaved] = useState(null);
  function handleSubmit(form) {
    setSaved(form);
  }

  return (
    <div className="space-y-4">
      <DoctorForm onSubmit={handleSubmit} />
      {saved && (
        <div className="card p-4 text-sm text-green-700 bg-green-50 border-green-200">
          Doctor "{saved.name}" saved (mock). You can wire this to your API.
        </div>
      )}
    </div>
  );
}
