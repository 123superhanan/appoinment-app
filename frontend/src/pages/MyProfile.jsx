import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { User, Phone, Mail, MapPin, Calendar, Edit, Save } from "lucide-react";

const Profile = () => {
  const { currentUser, updateDoctorProfile, updatePatient, uploadImage } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      line1: "",
      line2: "",
    },
    gender: "",
    dob: "",
    specialization: "",
    bio: "",
    availability: "",
    image: "",
  });

  // Set initial data based on current user
  useEffect(() => {
    if (currentUser) {
      // This would typically come from your API response
      const initialData = {
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        address: currentUser.address || { line1: "", line2: "" },
        gender: currentUser.gender || "",
        dob: currentUser.dob || "",
        specialization: currentUser.specialization || "",
        bio: currentUser.bio || "",
        availability: currentUser.availability || "",
        image: currentUser.image || "",
      };
      setUserData(initialData);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setUserData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const response = await uploadImage(file);
      setUserData((prev) => ({ ...prev, image: response.imageUrl }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image");
      console.error("Image upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      if (currentUser.role === "doctor") {
        await updateDoctorProfile(userData);
      } else if (currentUser.role === "patient") {
        await updatePatient(currentUser.id, userData);
      }

      toast.success("Profile updated successfully!");
      setIsEdit(false);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (currentUser?.role) {
      case "doctor":
        return "Doctor Profile";
      case "patient":
        return "My Profile";
      case "admin":
        return "Admin Profile";
      default:
        return "Profile";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <h1 className="text-2xl font-bold text-[#5f6fff]">{getTitle()}</h1>
      <p className="text-gray-600">
        {isEdit
          ? "Update your personal information below."
          : "View your personal information below."}
      </p>

      <div className="bg-white p-6 rounded-xl shadow border space-y-6">
        {/* Profile Image */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={userData.image || "/default-avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
            />
            {isEdit && (
              <label className="absolute bottom-0 right-0 bg-[#5f6fff] text-white p-1 rounded-full cursor-pointer">
                <Edit className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={loading}
                />
              </label>
            )}
          </div>
          <div>
            {isEdit ? (
              <input
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="text-2xl font-bold bg-gray-50 px-3 py-1 rounded"
                placeholder="Full Name"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-800">
                {userData.name}
              </h2>
            )}
            {userData.specialization && (
              <p className="text-gray-600">{userData.specialization}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact Information
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              {isEdit ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
                />
              ) : (
                <p className="text-blue-500">{userData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone
              </label>
              {isEdit ? (
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
                />
              ) : (
                <p className="text-blue-500 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> {userData.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Address
              </label>
              {isEdit ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="address.line1"
                    value={userData.address.line1}
                    onChange={handleChange}
                    placeholder="Address Line 1"
                    className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
                  />
                  <input
                    type="text"
                    name="address.line2"
                    value={userData.address.line2}
                    onChange={handleChange}
                    placeholder="Address Line 2"
                    className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
                  />
                </div>
              ) : (
                <p className="text-gray-700 flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>
                    {userData.address.line1}
                    <br />
                    {userData.address.line2}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <User className="w-5 h-5" />
              Basic Information
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Gender
              </label>
              {isEdit ? (
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              ) : (
                <p className="text-gray-700">{userData.gender}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Date of Birth
              </label>
              {isEdit ? (
                <input
                  type="date"
                  name="dob"
                  value={userData.dob}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
                />
              ) : (
                <p className="text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {userData.dob}
                </p>
              )}
            </div>

            {/* Doctor-specific fields */}
            {currentUser?.role === "doctor" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Specialization
                  </label>
                  {isEdit ? (
                    <input
                      type="text"
                      name="specialization"
                      value={userData.specialization}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
                    />
                  ) : (
                    <p className="text-gray-700">{userData.specialization}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Bio
                  </label>
                  {isEdit ? (
                    <textarea
                      name="bio"
                      value={userData.bio}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f6fff] min-h-[80px]"
                    />
                  ) : (
                    <p className="text-gray-700">{userData.bio}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Availability
                  </label>
                  {isEdit ? (
                    <input
                      type="text"
                      name="availability"
                      value={userData.availability}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
                    />
                  ) : (
                    <p className="text-gray-700">{userData.availability}</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          {isEdit ? (
            <>
              <button
                onClick={() => setIsEdit(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-6 py-2 bg-[#5f6fff] text-white rounded-lg hover:bg-[#4a58e0] flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-6 py-2 bg-[#5f6fff] text-white rounded-lg hover:bg-[#4a58e0] flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
