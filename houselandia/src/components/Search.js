import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initFlowbite } from 'flowbite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLocationCrosshairs, 
  faHouse, 
  faTags,
  faMagnifyingGlass 
} from '@fortawesome/free-solid-svg-icons';

const Search = () => {
  const navigate = useNavigate();

  const [location, setLocation] = useState("Location");
  const [propertyType, setPropertyType] = useState("Property Type");
  const [priceRange, setPriceRange] = useState("Price Range");

  useEffect(() => {
    initFlowbite();
  }, []);

  // Updated Styles to match Violet Color Scheme
  const btnClass = "inline-flex items-center justify-center gap-3 text-white bg-gray-900/50 backdrop-blur-md hover:bg-gray-800 border border-gray-800 focus:ring-4 focus:outline-none focus:ring-violet-900/30 font-semibold rounded-xl text-base px-6 py-3.5 text-center transition-all shadow-lg min-w-[200px]";
  
  // Menu background changed to a dark slate to match the site's dark theme
  const menuClass = "z-50 hidden bg-gray-900 divide-y divide-gray-800 rounded-xl shadow-2xl border border-gray-800 w-64";

  // Shared class for dropdown items with the NEW Color Scheme
  const itemClass = "block w-full text-left px-6 py-3 text-gray-300 hover:bg-violet-600/20 hover:text-violet-400 transition-colors duration-200";

  const handleSearch = () => {
    const priceMap = {
      "Ksh 50k - 100k": { min: 50000, max: 100000 },
      "Ksh 101k - 200k": { min: 101000, max: 200000 },
      "Ksh 201k - 300k": { min: 201000, max: 300000 },
      "Ksh 301k - 400k": { min: 301000, max: 400000 },
      "Above 401k": { min: 401000, max: 10000000 }
    };

    const selectedPrice = priceMap[priceRange] || { min: 0, max: 10000000 };
    const params = new URLSearchParams();

    if (location !== "Location") params.append("location", location);
    if (propertyType !== "Property Type") params.append("type", propertyType);

    params.append("price_gte", selectedPrice.min);
    params.append("price_lte", selectedPrice.max);

    navigate(`/results?${params.toString()}`);
  };

  return (
    <div className="p-16 flex flex-row flex-wrap gap-8 lg:gap-12 justify-center items-center bg-transparent">
      
      {/* 1. Location Dropdown */}
      <div className="relative">
        <button id="locBtn" data-dropdown-toggle="locMenu" data-dropdown-trigger="hover" className={btnClass} type="button">
          <FontAwesomeIcon icon={faLocationCrosshairs} className="text-lg text-violet-500" />
          {location}
          <svg className="w-3 h-3 ms-2" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
        </button>
        <div id="locMenu" className={menuClass}>
          <ul className="py-3 text-base font-medium">
            {["Westlands", "Kasarani", "Langata", "Kilimani", "Karen"].map(item => (
              <li key={item}>
                <button onClick={() => setLocation(item)} className={itemClass}>{item}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 2. Property Type Dropdown */}
      <div className="relative">
        <button id="typeBtn" data-dropdown-toggle="typeMenu" data-dropdown-trigger="hover" className={btnClass} type="button">
          <FontAwesomeIcon icon={faHouse} className="text-lg text-violet-500" />
          {propertyType}
          <svg className="w-3 h-3 ms-2" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
        </button>
        <div id="typeMenu" className={menuClass}>
          <ul className="py-3 text-base font-medium">
            {["Apartment", "Bungalow", "Villa"].map(item => (
              <li key={item}>
                <button onClick={() => setPropertyType(item)} className={itemClass}>{item}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. Price Range Dropdown */}
      <div className="relative">
        <button id="priceBtn" data-dropdown-toggle="priceMenu" data-dropdown-trigger="hover" className={btnClass} type="button">
          <FontAwesomeIcon icon={faTags} className="text-lg text-violet-500" />
          {priceRange}
          <svg className="w-3 h-3 ms-2" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
        </button>
        <div id="priceMenu" className={menuClass}>
          <ul className="py-3 text-base font-medium">
            {["Ksh 50k - 100k", "Ksh 101k - 200k", "Ksh 201k - 300k", "Ksh 301k - 400k", "Above 401k"].map(item => (
              <li key={item}>
                <button onClick={() => setPriceRange(item)} className={itemClass}>{item}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. Final Search Button */}
      <button
        onClick={handleSearch}
        className="inline-flex items-center justify-center gap-3 text-white bg-violet-700 hover:bg-violet-600 focus:ring-4 focus:outline-none focus:ring-violet-300 font-bold rounded-xl text-base px-10 py-4 text-center transition-all shadow-lg hover:-translate-y-1 active:scale-95 shadow-violet-900/20"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        Search
      </button>

    </div>
  );
};

export default Search;