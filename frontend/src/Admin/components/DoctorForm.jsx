import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../context/AppContext";

export default function DoctorForm({ onSubmit, editingDoctor, onCancel }) {
  const { uploadImage, addDoctor, updateDoctor } = useContext(AppContext);
  const [form, setForm] = useState({
    name: editingDoctor?.name || "",
    speciality: editingDoctor?.speciality || "",
    degree: editingDoctor?.degree || "",
    image: editingDoctor?.image || "",
    experience: editingDoctor?.experience || "",
    fees: editingDoctor?.fees || "",
    about: editingDoctor?.about || "",
    line1: editingDoctor?.address?.line1 || "",
    line2: editingDoctor?.address?.line2 || "",
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  function handle(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const data = await uploadImage(file);
      setForm((f) => ({ ...f, image: data.url }));
      toast.success("Image uploaded successfully ✅");
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error(err.response?.data?.message || "Image upload failed ❌");
    } finally {
      setUploading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Format the data for submission
      const submitData = {
        name: form.name,
        speciality: form.speciality,
        degree: form.degree,
        image: form.image,
        experience: form.experience,
        fees: form.fees,
        about: form.about,
        address: {
          line1: form.line1,
          line2: form.line2,
        },
        // Add required fields if needed
        email:
          editingDoctor?.email ||
          `${form.name.toLowerCase().replace(/\s+/g, ".")}@hospital.com`,
        password: "defaultPassword123", // You might want to handle this differently
      };

      let result;
      if (editingDoctor) {
        result = await updateDoctor(editingDoctor._id, submitData);
        toast.success("Doctor updated successfully ✅");
      } else {
        result = await addDoctor(submitData);
        toast.success("Doctor created successfully ✅");
      }

      // Call the onSubmit callback if provided
      if (onSubmit) {
        onSubmit(result);
      }

      // Reset form if not editing
      if (!editingDoctor) {
        setForm({
          name: "",
          speciality: "",
          degree: "",
          image: "",
          experience: "",
          fees: "",
          about: "",
          line1: "",
          line2: "",
        });
      }
    } catch (err) {
      console.error("Error saving doctor:", err);
      toast.error(err.response?.data?.message || "Failed to save doctor ❌");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="card p-6 space-y-4" onSubmit={handleSubmit}>
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
          label="Experience (years)"
          name="experience"
          type="number"
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

      {/* Image Upload */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Doctor Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
          disabled={uploading}
        />
        {uploading && (
          <p className="text-sm text-blue-500 mt-2">Uploading...</p>
        )}
        {form.image && (
          <div className="mt-2">
            <img
              src={form.image}
              alt="doctor preview"
              className="w-32 h-32 rounded-lg object-cover border"
            />
            <p className="text-xs text-gray-500 mt-1">Image preview</p>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">About</label>
        <textarea
          name="about"
          value={form.about}
          onChange={handle}
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          placeholder="Short bio about the doctor"
        />
      </div>

      <div className="flex justify-end space-x-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
            disabled={saving || uploading}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
          disabled={saving || uploading || !form.name || !form.speciality}
        >
          {saving
            ? "Processing..."
            : uploading
            ? "Uploading..."
            : editingDoctor
            ? "Update Doctor"
            : "Save Doctor"}
        </button>
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
        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}
