import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) return toast.error('Image not selected');

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName('');
        setEmail('');
        setPassword('');
        setExperience('1 Year');
        setFees('');
        setAbout('');
        setSpeciality('General physician');
        setDegree('');
        setAddress1('');
        setAddress2('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen p-6">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-blue-100 max-w-5xl mx-auto"
      >
        <h1 className="text-2xl font-bold text-blue-700 mb-8">Add New Doctor</h1>

        {/* Upload Section */}
        <div className="flex items-center gap-4 mb-10">
          <label
            htmlFor="upload"
            className="cursor-pointer w-16 h-16 rounded-full bg-blue-100 border-2 border-blue-300 flex items-center justify-center overflow-hidden shadow"
          >
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload"
              className="w-full h-full object-cover"
            />
          </label>
          <div>
            <p className="text-sm text-gray-600">Upload doctor<br />picture</p>
          </div>
          <input
            type="file"
            id="upload"
            className="hidden"
            onChange={(e) => setDocImg(e.target.files[0])}
          />
        </div>

        {/* Grid Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Full name" className="input" />
          </div>
          <div>
            <label className="label">Speciality</label>
            <select value={speciality} onChange={(e) => setSpeciality(e.target.value)} className="input">
              <option>General physician</option>
              <option>Gynecologist</option>
              <option>Dermatologist</option>
              <option>Pediatricians</option>
              <option>Neurologist</option>
              <option>Gastroenterologist</option>
            </select>
          </div>
          <div>
            <label className="label">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="input" />
          </div>
          <div>
            <label className="label">Education</label>
            <input value={degree} onChange={(e) => setDegree(e.target.value)} type="text" placeholder="Degree or Certification" className="input" />
          </div>
          <div>
            <label className="label">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="input" />
          </div>
          <div>
            <label className="label">Experience</label>
            <select value={experience} onChange={(e) => setExperience(e.target.value)} className="input">
              {['1 year', '2 years', '3 years', '4 years', '5 years', '6 years', '7 years', '8 years', '9 years', '10+ years'].map((exp, i) => (
                <option key={i}>{exp}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Fees</label>
            <input value={fees} onChange={(e) => setFees(e.target.value)} type="number" placeholder="Consultation fee" className="input" />
          </div>
          <div>
            <label className="label">Address</label>
            <input value={address1} onChange={(e) => setAddress1(e.target.value)} type="text" placeholder="Address Line 1" className="input mb-2" />
            <input value={address2} onChange={(e) => setAddress2(e.target.value)} type="text" placeholder="Address Line 2" className="input" />
          </div>
        </div>

        {/* About */}
        <div className="mt-6">
          <label className="label">About</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Write about the doctor"
            className="input h-28 resize-none"
          ></textarea>
        </div>

        {/* Button */}
        <div className="mt-8">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition">
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
