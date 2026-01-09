import React, { useEffect, useState } from 'react';
import { initFlowbite } from 'flowbite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLocationCrosshairs, 
  faHouse, 
  faTags,
  faMagnifyingGlass // Added for the search button
} from '@fortawesome/free-solid-svg-icons';

const Search = () => {
  const [location, setLocation] = useState("Location");
  const [propertyType, setPropertyType] = useState("Property Type");
  const [priceRange, setPriceRange] = useState("Price Range");

  useEffect(() => {
    initFlowbite();
  }, []);

  // Shared styles
  const btnClass = "inline-flex items-center justify-center gap-3 text-white bg-gray-900 hover:bg-black focus:ring-4 focus:outline-none focus:ring-gray-300 font-semibold rounded-xl text-base px-6 py-3.5 text-center transition-all shadow-lg min-w-[200px]";
  const menuClass = "z-50 hidden bg-white divide-y divide-gray-100 rounded-xl shadow-2xl border border-gray-200 w-64";

  const handleSearch = () => {
    console.log("Searching for:", { location, propertyType, priceRange });
    // Add your search logic or API call here
  };

  return (
    // 'items-end' ensures the search button aligns perfectly with the dropdown buttons
    <div className="p-16 flex flex-row flex-wrap gap-28 items-center bg-transparent">
      
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
            {["Apartment", "Townhouse", "Bungalow", "Villa"].map(item => (
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
            {["Ksh 50k - 100k", "Ksh 100k - 200k", "Above 500k"].map(item => (
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
        className="inline-flex items-center justify-center gap-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-xl text-base px-8 py-3.5 text-center transition-all shadow-lg hover:-translate-y-1 active:scale-95"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        Search
      </button>

    </div>
  );
};

export default Search;