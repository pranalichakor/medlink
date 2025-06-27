import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';

const Appointments = () => {
  const { docId } = useParams();
  const { doctors, backendUrl, token, user } = useContext(AppContext);
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [dayDateList, setDayDateList] = useState([]);
  const [activeDay, setActiveDay] = useState(0);
  const [activeTime, setActiveTime] = useState(null);
  const [slotPage, setSlotPage] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      slots.push(`${formatHour(hour)}:00 ${hour < 12 ? 'am' : 'pm'}`);
      slots.push(`${formatHour(hour)}:30 ${hour < 12 ? 'am' : 'pm'}`);
    }
    return slots;
  };

  const formatHour = (hour) => {
    const h = hour % 12;
    return h === 0 ? 12 : h;
  };

  const timeSlots = generateTimeSlots();
  const slotsPerPage = 8;
  const totalPages = Math.ceil(timeSlots.length / slotsPerPage);
  const visibleSlots = timeSlots.slice(slotPage * slotsPerPage, (slotPage + 1) * slotsPerPage);

  useEffect(() => {
    if (!doctors.length) return;

    const doctor = doctors.find(doc => doc._id === docId);
    setDocInfo(doctor || null);

    return () => {
      setDocInfo(null);
      setActiveDay(0);
      setActiveTime(null);
      setSlotPage(0);
    };
  }, [doctors, docId]);

  useEffect(() => {
    const getNext7DaysIST = () => {
      const list = [];
      const options = { weekday: 'short', timeZone: 'Asia/Kolkata' };

      for (let i = 0; i < 7; i++) {
        const dateObj = new Date();
        dateObj.setDate(dateObj.getDate() + i);
        const day = dateObj.toLocaleDateString('en-IN', options).toUpperCase();
        const date = dateObj.getDate();
        list.push({ day, date });
      }

      setDayDateList(list);
    };

    getNext7DaysIST();
  }, []);

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    if (!user || !user._id) {
      toast.error("User information missing. Please login again.");
      return navigate("/login");
    }

    if (!docInfo || !docInfo._id) {
      toast.error("Doctor information not loaded properly");
      return;
    }

    if (activeTime === null || !dayDateList[activeDay]) {
      toast.warn("Please select a valid day and time slot");
      return;
    }

    try {
      const slotTime = timeSlots[activeTime];
      const slotDateObj = new Date();
      slotDateObj.setDate(slotDateObj.getDate() + activeDay);
      const slotDate = slotDateObj.toISOString().split("T")[0];

      const response = await fetch(`${backendUrl}/api/appointment/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          docId: docInfo._id,
          slotDate,
          slotTime,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Appointment booked successfully");
        navigate("/my-appointments");
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch (error) {
      console.error("Book Appointment Error:", error);
      toast.error("Server error while booking appointment");
    }
  };

  if (!docInfo) {
    return <div className="text-center py-10 text-[#00eaff] font-semibold">Loading doctor info...</div>;
  }

  return (
    <div className='p-4 md:p-10 max-w-6xl mx-auto text-[#e0f7ff] bg-[#030f2e]'>
      <div className='flex flex-col md:flex-row gap-6 items-start bg-[#0f1d4d] rounded-xl border border-[#00b4d8] shadow p-6'>
        <img src={docInfo.image} alt="doctor" className='w-40 h-40 rounded-xl object-cover border border-[#00eaff]' />
        <div className='flex-1'>
          <p className='text-xl font-semibold flex items-center gap-2 text-[#00eaff]'>
            {docInfo.name}
            <img src={assets.verified_icon} alt="verified" className='w-5 h-5' />
          </p>
          <p className='text-sm mt-1'>
            {docInfo.degree} – {docInfo.speciality}
            <span className='ml-2 px-2 py-1 bg-[#00b4d8] text-white text-xs rounded-full'>{docInfo.experience} Years</span>
          </p>
          <div className='mt-4'>
            <p className='flex items-center gap-1 font-medium'>
              About <img src={assets.info_icon} alt="info" className='w-4 h-4' />
            </p>
            <p className='text-sm mt-1 text-[#cdefff]'>{docInfo.about}</p>
          </div>
          <p className='mt-4 text-sm font-medium'>Appointment fee: <span className='text-white font-semibold'>₹{docInfo.fee}</span></p>
        </div>
      </div>

      <div className='mt-10'>
        <p className='font-semibold text-lg mb-4 text-[#00eaff]'>Booking slots</p>

        <div className='flex gap-2 overflow-x-auto pb-2'>
          {dayDateList.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDay(idx)}
              className={`px-4 py-2 rounded-full border ${
                idx === activeDay
                  ? 'bg-[#00eaff] text-white'
                  : 'bg-[#112b5f] text-[#cdefff] hover:bg-[#00b4d8] hover:text-white'
              }`}
            >
              <p className='text-sm'>{item.day}</p>
              <p className='text-sm'>{item.date}</p>
            </button>
          ))}
        </div>

        <div className='flex gap-2 flex-wrap mt-4 items-center'>
          <button
            disabled={slotPage === 0}
            onClick={() => setSlotPage(slotPage - 1)}
            className='px-3 py-2 rounded-full bg-[#112b5f] hover:bg-[#00b4d8] disabled:opacity-50 text-sm text-white'
          >
            Prev
          </button>

          {visibleSlots.map((time, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTime(slotPage * slotsPerPage + idx)}
              className={`px-4 py-2 rounded-full border text-sm ${
                activeTime === (slotPage * slotsPerPage + idx)
                  ? 'bg-[#00eaff] text-white'
                  : 'bg-[#0f1d4d] text-[#cdefff] hover:bg-[#00b4d8]'
              }`}
            >
              {time}
            </button>
          ))}

          <button
            disabled={slotPage === totalPages - 1}
            onClick={() => setSlotPage(slotPage + 1)}
            className='px-3 py-2 rounded-full bg-[#112b5f] hover:bg-[#00b4d8] disabled:opacity-50 text-sm text-white'
          >
            Next
          </button>
        </div>

        <button
          onClick={bookAppointment}
          disabled={activeTime === null}
          className={`mt-6 px-6 py-3 ${
            activeTime === null
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#00eaff] hover:opacity-90'
          } text-white font-medium rounded-full transition`}
        >
          Book an appointment
        </button>
      </div>

      <div className="mt-16">
        <RelatedDoctors speciality={docInfo.speciality} docId={docInfo._id} />
      </div>
    </div>
  );
};

export default Appointments;
