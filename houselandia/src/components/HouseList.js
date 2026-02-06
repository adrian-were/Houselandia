import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faRulerCombined, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const HouseList = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();

  useEffect(() => {
    setLoading(true);
    
    // Construct the API URL - ensuring it points to your housesData endpoint
    const apiUrl = `https://houselandia-api.onrender.com/housesData${search}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        // --- SORTING LOGIC ---
        // This ensures 'Available' properties always appear at the top
        const sortedData = data.sort((a, b) => {
          if (a.status === 'Available' && b.status === 'Sold') return -1;
          if (a.status === 'Sold' && b.status === 'Available') return 1;
          return 0;
        });

        setHouses(sortedData);
        setTimeout(() => setLoading(false), 600); 
      })
      .catch((err) => {
        console.error("Error fetching houses:", err);
        setLoading(false);
      });
  }, [search]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-400 font-medium tracking-wide">Searching properties...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">Available Houses</h1>
            <p className="text-gray-400 mt-2 font-medium">Found {houses.length} properties matching your criteria</p>
          </div>
          <Link to="/" className="inline-flex items-center gap-2 bg-gray-800 px-6 py-3 rounded-2xl shadow-lg border border-gray-700 text-white hover:bg-gray-700 transition-all active:scale-95">
            <FontAwesomeIcon icon={faArrowLeft} className="text-violet-400" />
            <span className="font-bold">Back to Search</span>
          </Link>
        </div>

        {/* Results Grid */}
        {houses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {houses.map((house) => (
              <Link 
                to={`/house/${house.id}`} 
                key={house.id} 
                className={`group bg-gray-800/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-2xl hover:shadow-violet-900/10 transition-all duration-500 border border-gray-800 hover:border-violet-500/30 flex flex-col relative ${house.status === 'Sold' ? 'opacity-80' : ''}`}
              >
                {/* Image Container with 'Sold' Overlay */}
                <div className="relative overflow-hidden h-72">
                  <img 
                    src={house.image} 
                    alt={house.type} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Status Badges */}
                  <div className="absolute top-5 left-5 flex gap-2">
                    <span className="bg-gray-950/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-white/10">
                      {house.type}
                    </span>
                  </div>

                  {/* VISUAL OVERLAY FOR SOLD PROPERTIES */}
                  {house.status === 'Sold' && (
                    <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-[2px] flex items-center justify-center">
                      <div className="border-4 border-red-500 text-red-500 font-black text-3xl uppercase px-6 py-2 -rotate-12 tracking-tighter">
                        Rented
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white group-hover:text-violet-400 transition-colors duration-300">
                        {house.location}
                      </h2>
                    </div>
                    <div className="text-right">
                      <p className="text-violet-400 text-xl font-black">
                        Ksh {house.price ? house.price.toLocaleString() : "N/A"}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 leading-relaxed mb-8 line-clamp-2 text-sm">
                    {house.description}
                  </p>

                  {/* House Specs */}
                  <div className="grid grid-cols-3 items-center pt-6 border-t border-gray-700/50 text-gray-300">
                    <div className="flex flex-col items-center gap-1 border-r border-gray-700/50">
                      <FontAwesomeIcon icon={faBed} className="text-violet-500 text-sm" />
                      <span className="text-[11px] font-bold uppercase tracking-tighter">{house.bedrooms || 0} Bed</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 border-r border-gray-700/50">
                      <FontAwesomeIcon icon={faBath} className="text-violet-500 text-sm" />
                      <span className="text-[11px] font-bold uppercase tracking-tighter">{house.bathrooms || 0} Bath</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <FontAwesomeIcon icon={faRulerCombined} className="text-violet-500 text-sm" />
                      <span className="text-[11px] font-bold uppercase tracking-tighter">{house.surface || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State Section */
          <div className="text-center bg-gray-800/20 py-32 rounded-[3rem] border-2 border-dashed border-gray-800 shadow-inner">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faRulerCombined} className="text-gray-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-white">No Properties Found</h3>
              <p className="text-gray-500 mt-3 mb-8">We couldn't find any properties matching your criteria in Nairobi. Try adjusting your filters.</p>
              <Link to="/" className="text-violet-400 font-bold hover:underline">Clear all filters</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HouseList;