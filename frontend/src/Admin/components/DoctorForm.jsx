import React, { useState } from "react";

export default function DoctorForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    speciality: "",
    degree: "",
    experience: "",
    fees: "",
    about: "",
    line1: "",
    line2: "",
  });
  function handle(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  return (
    <form
      className="card p-6 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(form);
      }}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Full name"
          name="name"
          value={form.name}
          onChange={handle}
          required
        />
        <Input
          label="Speciality"
          name="speciality"
          value={form.speciality}
          onChange={handle}
          required
        />
        <Input
          label="Degree"
          name="degree"
          value={form.degree}
          onChange={handle}
        />
        <Input
          label="Experience"
          name="experience"
          value={form.experience}
          onChange={handle}
        />
        <Input
          label="Consultation Fees ($)"
          type="number"
          name="fees"
          value={form.fees}
          onChange={handle}
        />
        <Input
          label="Address Line 1"
          name="line1"
          value={form.line1}
          onChange={handle}
        />
        <Input
          label="Address Line 2"
          name="line2"
          value={form.line2}
          onChange={handle}
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">About</label>
        <textarea
          name="about"
          value={form.about}
          onChange={handle}
          className="w-full rounded-xl border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
          rows={4}
          placeholder="Short bio"
        />
      </div>
      <div className="flex justify-end">
        <button className="btn btn-solid">Save Doctor</button>
      </div>
    </form>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <input
        {...props}
        className="w-full rounded-xl border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
      />
    </div>
  );
}
