
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBed, 
  faBath, 
  faRulerCombined, 
  faPhone, 
  faArrowLeft, 
  faEnvelope,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';

const HouseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0); // Ensure page starts at the top
    setLoading(true);

    fetch(`http://localhost:8000/housesData/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Property not found");
        return res.json();
      })
      .then((data) => {
        setHouse(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching house details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500">Loading property details...</p>
      </div>
    );
  }

  if (!house) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Property not found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 underline">Go back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Navigation & Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all font-medium group"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[350px] md:h-[550px]">
          {/* Main Large Image */}
          <div className="md:col-span-2 h-full overflow-hidden rounded-3xl">
            <img 
              src={house.imageLg || house.image} 
              alt="Main Property" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          
          {/* Smaller Gallery Images */}
          <div className="hidden md:grid col-span-2 grid-cols-2 grid-rows-2 gap-4">
            {house.gallery && house.gallery.length > 0 ? (
              house.gallery.slice(0, 4).map((img, index) => (
                <div key={index} className="overflow-hidden rounded-2xl">
                  <img 
                    src={img} 
                    alt={`Interior ${index}`} 
                    className="w-full h-full object-cover hover:opacity-90 cursor-pointer transition-all"
                  />
                </div>
              ))
            ) : (
              // Fallback placeholders if gallery is empty
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-100 rounded-2xl flex items-center justify-center text-gray-300">
                  No Image
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: House Info */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{house.location}</h1>
                <div className="flex items-center gap-2 text-gray-500">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-600" />
                  <span>{house.location}, Nairobi, Kenya</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-blue-600 text-3xl font-black">
                  Ksh {house.price?.toLocaleString()}
                </span>
                <p className="text-gray-400 text-sm mt-1">Ready for occupancy</p>
              </div>
            </div>

            {/* Icons Bar */}
            <div className="flex gap-10 py-8 border-y border-gray-100 mb-8">
              <div className="text-center">
                <p className="text-gray-400 text-xs uppercase font-bold mb-2">Bedrooms</p>
                <div className="flex items-center justify-center gap-2">
                  <FontAwesomeIcon icon={faBed} className="text-blue-600" />
                  <span className="font-bold text-lg">{house.bedrooms}</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-xs uppercase font-bold mb-2">Bathrooms</p>
                <div className="flex items-center justify-center gap-2">
                  <FontAwesomeIcon icon={faBath} className="text-blue-600" />
                  <span className="font-bold text-lg">{house.bathrooms}</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-xs uppercase font-bold mb-2">Area</p>
                <div className="flex items-center justify-center gap-2">
                  <FontAwesomeIcon icon={faRulerCombined} className="text-blue-600" />
                  <span className="font-bold text-lg">{house.surface}</span>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">About this Property</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-10 whitespace-pre-line">
              {house.description}
            </p>
          </div>

          {/* Right Column: Contact Sidebar */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 p-8 rounded-[2.5rem] shadow-sm sticky top-10 bg-white">
              <h3 className="text-xl font-bold mb-6">Agent Information</h3>
              
              <div className="flex items-center gap-4 mb-8">
                <img 
                  src={house.agent?.image || "https://i.pravatar.cc/150"} 
                  alt="Agent" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-50"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{house.agent?.name || "Premium Agent"}</h4>
                  <p className="text-sm text-gray-500">Listing Manager</p>
                </div>
              </div>

              <div className="space-y-4">
                <a 
                  href={`tel:${house.agent?.phone || "+254700000000"}`}
                  className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all"
                >
                  <FontAwesomeIcon icon={faPhone} />
                  Call Agent
                </a>
                
                <button className="flex items-center justify-center gap-3 w-full border-2 border-gray-900 text-gray-900 py-4 rounded-2xl font-bold hover:bg-gray-900 hover:text-white transition-all">
                  <FontAwesomeIcon icon={faEnvelope} />
                  Email Agent
                </button>
              </div>

              <p className="text-center text-xs text-gray-400 mt-6 italic">
                Quote reference: #HOUSE-{house.id}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HouseDetails;