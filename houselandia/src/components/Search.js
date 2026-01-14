import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { initFlowbite } from 'flowbite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLocationCrosshairs, 
  faHouse, 
  faTags,
  faMagnifyingGlass 
} from '@fortawesome/free-solid-svg-icons';

const Search = () => {
  const navigate = useNavigate(); // 2. Initialize the navigate hook

  // States for dropdown selections
  const [location, setLocation] = useState("Location");
  const [propertyType, setPropertyType] = useState("Property Type");
  const [priceRange, setPriceRange] = useState("Price Range");

  useEffect(() => {
    initFlowbite();
  }, []);

  // Shared Tailwind styles for buttons and menus
  const btnClass = "inline-flex items-center justify-center gap-3 text-white bg-gray-900 hover:bg-black focus:ring-4 focus:outline-none focus:ring-gray-300 font-semibold rounded-xl text-base px-6 py-3.5 text-center transition-all shadow-lg min-w-[200px]";
  const menuClass = "z-50 hidden bg-white divide-y divide-gray-100 rounded-xl shadow-2xl border border-gray-200 w-64";

  const handleSearch = () => {
    // 3. Map human-readable price ranges to numbers for the JSON server
    const priceMap = {
      "Ksh 50k - 100k": { min: 50000, max: 100000 },
      "Ksh 101k - 200k": { min: 101000, max: 200000 },
      "Ksh 201k - 300k": { min: 201000, max: 300000 },
      "Ksh 301k - 400k": { min: 301000, max: 400000 },
      "Above 401k": { min: 401000, max: 10000000 }
    };

    const selectedPrice = priceMap[priceRange] || { min: 0, max: 10000000 };

    // 4. Create Query Parameters
    const params = new URLSearchParams();

    // Only filter if the user has actually picked something other than the default label
    if (location !== "Location") {
      params.append("location", location);
    }
    if (propertyType !== "Property Type") {
      params.append("type", propertyType);
    }

    // Add numeric price filters (supported by JSON Server)
    params.append("price_gte", selectedPrice.min);
    params.append("price_lte", selectedPrice.max);

    // 5. Redirect to HouseList page with the filter string
    // Final URL example: /results?location=Westlands&type=Apartment&price_gte=101000&price_lte=200000
    navigate(`/results?${params.toString()}`);
  };

  return (
    <div className="p-16 flex flex-row flex-wrap gap-8 lg:gap-12 justify-center items-center bg-transparent">
      
      {/* 1. Location Dropdown */}
      <div className="relative">
        <button id="locBtn" data-dropdown-toggle="locMenu" data-dropdown-trigger="hover" className={btnClass} type="button">
          <FontAwesomeIcon icon={faLocationCrosshairs} className="text-lg text-gray-400" />
          {location}
          <svg className="w-3 h-3 ms-2" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
        </button>
        <div id="locMenu" className={menuClass}>
          <ul className="py-3 text-base text-gray-700 font-medium">
            {["Westlands", "Kasarani", "Langata", "Kilimani", "Karen"].map(item => (
              <li key={item}>
                <button onClick={() => setLocation(item)} className="block w-full text-left px-6 py-3 hover:bg-gray-100">{item}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 2. Property Type Dropdown */}
      <div className="relative">
        <button id="typeBtn" data-dropdown-toggle="typeMenu" data-dropdown-trigger="hover" className={btnClass} type="button">
          <FontAwesomeIcon icon={faHouse} className="text-lg text-gray-400" />
          {propertyType}
          <svg className="w-3 h-3 ms-2" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
        </button>
        <div id="typeMenu" className={menuClass}>
          <ul className="py-3 text-base text-gray-700 font-medium">
            {["Apartment", "Bungalow", "Villa"].map(item => (
              <li key={item}>
                <button onClick={() => setPropertyType(item)} className="block w-full text-left px-6 py-3 hover:bg-gray-100">{item}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. Price Range Dropdown */}
      <div className="relative">
        <button id="priceBtn" data-dropdown-toggle="priceMenu" data-dropdown-trigger="hover" className={btnClass} type="button">
          <FontAwesomeIcon icon={faTags} className="text-lg text-gray-400" />
          {priceRange}
          <svg className="w-3 h-3 ms-2" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
        </button>
        <div id="priceMenu" className={menuClass}>
          <ul className="py-3 text-base text-gray-700 font-medium">
            {["Ksh 50k - 100k", "Ksh 101k - 200k", "Ksh 201k - 300k", "Ksh 301k - 400k", "Above 401k"].map(item => (
              <li key={item}>
                <button onClick={() => setPriceRange(item)} className="block w-full text-left px-6 py-3 hover:bg-gray-100">{item}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. Final Search Button */}
      <button
        onClick={handleSearch}
        className="inline-flex items-center justify-center gap-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-xl text-base px-10 py-4 text-center transition-all shadow-lg hover:-translate-y-1 active:scale-95"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        Search
      </button>

    </div>
  );
};

export default Search;