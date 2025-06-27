import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const [relDocs, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const filtered = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(filtered);
    }
  }, [doctors, speciality, docId]);

  if (relDocs.length === 0) return null;

  return (
    <div className="mt-16 px-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#003566] mb-2">
        Related Doctors
      </h2>
      <p className="text-center text-gray-500 text-sm mb-8">
        Discover more trusted specialists in the same field.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {relDocs.map((doc) => (
          <Link
            to={`/appointment/${doc._id}`}
            key={doc._id}
            className="bg-white border border-[#e0f0ff] rounded-xl overflow-hidden shadow-sm hover:shadow-blue-200 hover:border-[#00eaff] transition duration-300 group"
          >
            <img
              src={doc.image}
              alt={doc.name}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4">
              <p className="text-[#00eaff] text-xs font-semibold mb-1">
                ● Available
              </p>
              <h3 className="font-semibold text-md truncate text-[#062a61]">
                {doc.name}
              </h3>
              <p className="text-gray-500 text-sm">{doc.speciality}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
