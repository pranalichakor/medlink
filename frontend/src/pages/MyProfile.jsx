import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';

const MyProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    image: assets.profile_pic,
    imageFile: null,
    email: '',
    phone: '',
    address: { line1: '', line2: '' },
    gender: '',
    dob: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:4000/api/user/get-profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          setUserData((prev) => ({
            ...prev,
            ...data.user,
            image: data.user.image || assets.profile_pic,
            address: data.user.address || { line1: '', line2: '' },
          }));
        }
      } catch (error) {
        console.error('Fetch profile error:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'line1' || name === 'line2') {
      setUserData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setUserData((prev) => ({
        ...prev,
        image: imgURL,
        imageFile: file,
      }));
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('email', userData.email);
      formData.append('phone', userData.phone);
      formData.append('dob', userData.dob);
      formData.append('gender', userData.gender);
      formData.append('address', JSON.stringify(userData.address));
      if (userData.imageFile) {
        formData.append('image', userData.imageFile);
      }

      const res = await axios.post('http://localhost:4000/api/user/update-profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        alert('Profile updated successfully');
        setEditMode(false);
      } else {
        alert(res.data.message || 'Update failed');
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('Something went wrong while updating.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-[#030f2e] min-h-screen text-[#e0f7ff]">
      <div className="flex items-center gap-6">
        <img
          src={userData.image || assets.profile_pic}
          alt="Profile"
          className="w-24 h-24 rounded-lg object-cover border border-[#00eaff]"
        />
        {editMode && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm text-white"
          />
        )}
      </div>

      <h2 className="text-2xl font-bold mt-6 text-[#00eaff]">
        {editMode ? (
          <input
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="bg-[#0f1d4d] border border-[#00b4d8] text-white px-3 py-2 rounded w-full max-w-xs"
          />
        ) : (
          userData.name
        )}
      </h2>

      <hr className="my-6 border-[#00b4d8]" />

      <h3 className="text-xs font-bold text-[#6fc3ff] uppercase mb-4 tracking-wide">Contact Information</h3>
      <div className="space-y-3">
        <InfoRow
          label="Email:"
          value={
            editMode ? (
              <input
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="bg-[#0f1d4d] border border-[#00b4d8] px-3 py-2 rounded w-full max-w-xs text-white"
              />
            ) : (
              <a href={`mailto:${userData.email}`} className="text-[#00eaff] underline">
                {userData.email}
              </a>
            )
          }
        />
        <InfoRow
          label="Phone:"
          value={
            editMode ? (
              <input
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                className="bg-[#0f1d4d] border border-[#00b4d8] px-3 py-2 rounded w-full max-w-xs text-white"
              />
            ) : (
              <a href={`tel:${userData.phone}`} className="text-[#00eaff] underline">
                {userData.phone}
              </a>
            )
          }
        />
        <InfoRow
          label="Address:"
          value={
            editMode ? (
              <>
                <input
                  name="line1"
                  value={userData.address?.line1}
                  onChange={handleChange}
                  className="bg-[#0f1d4d] border border-[#00b4d8] px-3 py-2 rounded w-full max-w-xs mb-2 text-white"
                />
                <input
                  name="line2"
                  value={userData.address?.line2}
                  onChange={handleChange}
                  className="bg-[#0f1d4d] border border-[#00b4d8] px-3 py-2 rounded w-full max-w-xs text-white"
                />
              </>
            ) : (
              <>
                {userData.address?.line1} <br /> {userData.address?.line2}
              </>
            )
          }
        />
      </div>

      <h3 className="text-xs font-bold text-[#6fc3ff] uppercase mt-8 mb-4 tracking-wide">Basic Information</h3>
      <div className="space-y-3">
        <InfoRow
          label="Gender:"
          value={
            editMode ? (
              <select
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                className="bg-[#0f1d4d] border border-[#00b4d8] px-3 py-2 rounded w-full max-w-xs text-white"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            ) : (
              userData.gender
            )
          }
        />
        <InfoRow
          label="Birthday:"
          value={
            editMode ? (
              <input
                type="date"
                name="dob"
                value={userData.dob}
                onChange={handleChange}
                className="bg-[#0f1d4d] border border-[#00b4d8] px-3 py-2 rounded w-full max-w-xs text-white"
              />
            ) : (
              new Date(userData.dob).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })
            )
          }
        />
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => setEditMode((prev) => !prev)}
          className="px-4 py-2 border border-[#00b4d8] text-[#00eaff] rounded-full hover:bg-[#0f1d4d] transition"
        >
          {editMode ? 'Cancel' : 'Edit'}
        </button>
        {editMode && (
          <button
            onClick={handleSave}
            className="px-4 py-2 border border-[#00eaff] bg-[#00eaff] text-[#030f2e] rounded-full hover:bg-[#00c2ff] transition"
          >
            Save Info
          </button>
        )}
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-start gap-2">
    <div className="sm:w-32 font-medium text-[#6fc3ff]">{label}</div>
    <div className="sm:flex-1">{value}</div>
  </div>
);

export default MyProfile;
