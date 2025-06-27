import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, backendUrl } = useContext(DoctorContext);
  const [doc, setDoc] = useState(null);
  const [file, setFile] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  useEffect(() => {
    if (!dToken) return;
    axios.get(`${backendUrl}/api/doctor/profile`, {
      headers: { Authorization: `Bearer ${dToken}` },
    }).then((res) => {
      if (res.data.success) {
        const fetched = res.data.doctor;
        setDoc(fetched);
        setAddress1(fetched.address?.line1 || "");
        setAddress2(fetched.address?.line2 || "");
      } else {
        toast.error("Failed to fetch profile");
      }
    });
  }, [dToken]);

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post(`${backendUrl}/api/upload`, formData);
    return res.data.url;
  };

  const handleSave = async () => {
    setUpdating(true);
    try {
      let updatedDoc = {
        ...doc,
        address: {
          line1: address1,
          line2: address2,
        },
      };

      if (file) {
        const imageUrl = await handleImageUpload();
        updatedDoc.image = imageUrl;
      }

      const res = await axios.put(`${backendUrl}/api/doctor/profile`, updatedDoc, {
        headers: { Authorization: `Bearer ${dToken}` },
      });

      res.data.success
        ? toast.success("Profile updated successfully")
        : toast.error("Update failed");

    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setUpdating(false);
    }
  };

  if (!doc) return <div className="p-8 text-blue-600">Loading...</div>;

  return (
    <div className="p-8 w-full bg-[#f0faff] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#003566]">My Profile</h1>

      <div className="bg-white shadow-xl border border-blue-100 rounded-xl p-6 flex flex-col md:flex-row items-start gap-10">
        <div className="flex flex-col items-center">
          <img
            src={file ? URL.createObjectURL(file) : doc.image}
            alt="Doctor"
            className="h-48 w-48 object-cover rounded-full border-4 border-blue-200"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-4 text-sm text-gray-700"
          />
        </div>

        <div className="flex-1 space-y-4 text-gray-700">
          <p><strong className="text-[#003566]">Name:</strong> {doc.name}</p>
          <p><strong className="text-[#003566]">Specialization:</strong> {doc.speciality}</p>
          <p><strong className="text-[#003566]">Experience:</strong> {doc.experience}</p>
          <p><strong className="text-[#003566]">About:</strong> {doc.about}</p>
          <p><strong className="text-[#003566]">Appointment Fee:</strong> ₹{doc.fees}</p>

          <div>
            <label className="block text-sm mb-1 text-gray-600">Address</label>
            <input
              onChange={(e) => setAddress1(e.target.value)}
              value={address1}
              type="text"
              placeholder="Address Line 1"
              className="border border-blue-200 rounded p-2 w-full mb-2 focus:outline-blue-500"
            />
            <input
              onChange={(e) => setAddress2(e.target.value)}
              value={address2}
              type="text"
              placeholder="Address Line 2"
              className="border border-blue-200 rounded p-2 w-full focus:outline-blue-500"
            />
          </div>

          <p>
            <strong className="text-[#003566]">Availability:</strong>{" "}
            {doc.available ? (
              <span className="text-green-600 font-semibold">Available ✅</span>
            ) : (
              <span className="text-red-600 font-semibold">Not Available ❌</span>
            )}
          </p>

          <button
            onClick={handleSave}
            disabled={updating}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all"
          >
            {updating ? "Saving..." : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
