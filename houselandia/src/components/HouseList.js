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
    
    // Construct the API URL
    // JSON Server ignores empty parameters, so this works perfectly
    const apiUrl = `http://localhost:8000/housesData${search}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setHouses(data);
        // Artificial delay for smooth UX
        setTimeout(() => setLoading(false), 600); 
      })
      .catch((err) => {
        console.error("Error fetching houses:", err);
        setLoading(false);
      });
  }, [search]);

  // Loading Spinner Component
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 font-medium">Searching properties...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Available Houses</h1>
            <p className="text-gray-500 mt-2">Found {houses.length} properties matching your criteria</p>
          </div>
          <Link to="/" className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Modify Search</span>
          </Link>
        </div>

        {/* Results Grid */}
        {houses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {houses.map((house) => (
              <div key={house.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                {/* Image Container */}
                <div className="relative overflow-hidden h-72">
                  <img 
                    src={house.image} 
                    alt={house.type} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-5 left-5">
                    <span className="bg-white/90 backdrop-blur-md text-gray-900 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                      {house.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{house.location}</h2>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-600 text-xl font-black">Ksh {house.price.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-500 leading-relaxed mb-8 line-clamp-2">
                    {house.description}
                  </p>

                  {/* House Specs */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50 text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <FontAwesomeIcon icon={faBed} />
                      </div>
                      <span className="text-sm font-semibold">{house.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <FontAwesomeIcon icon={faBath} />
                      </div>
                      <span className="text-sm font-semibold">{house.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <FontAwesomeIcon icon={faRulerCombined} />
                      </div>
                      <span className="text-sm font-semibold">{house.surface}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State Section */
          <div className="text-center py-32 bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-gray-900">No Match Found</h3>
              <p className="text-gray-500 mt-3 mb-8">We couldn't find any houses matching your specific filters. Try expanding your search area or price range.</p>
              <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
                Clear all filters
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HouseList;