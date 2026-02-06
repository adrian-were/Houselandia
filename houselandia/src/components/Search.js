import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLocationCrosshairs, 
  faHouse, 
  faTags,
  faMagnifyingGlass 
} from '@fortawesome/free-solid-svg-icons';

const Search = () => {
  const navigate = useNavigate();

  // State for selections
  const [location, setLocation] = useState("Location");
  const [propertyType, setPropertyType] = useState("Property Type");
  const [priceRange, setPriceRange] = useState("Price Range");

  // State to track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleSelect = (setter, value) => {
    setter(value);
    setOpenDropdown(null); // This forces the menu to close instantly on mobile
  };

  const btnClass = "inline-flex items-center justify-between gap-3 text-white bg-gray-900/50 backdrop-blur-md hover:bg-gray-800 border border-gray-800 font-semibold rounded-xl text-base px-6 py-4 text-center transition-all shadow-lg w-full lg:min-w-[200px]";
  const menuClass = "z-[100] absolute top-full left-0 mt-2 bg-gray-900 divide-y divide-gray-800 rounded-xl shadow-2xl border border-gray-800 w-full lg:w-64 block";
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
    <div className="p-6 lg:p-16 flex flex-col lg:flex-row gap-4 lg:gap-8 justify-center items-center bg-transparent overflow-visible relative">
      
      {/* 1. Location Dropdown */}
      <div className="relative w-full lg:w-auto">
        <button onClick={() => toggleDropdown('location')} className={btnClass} type="button">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faLocationCrosshairs} className="text-lg text-violet-500" />
            {location}
          </div>
          <svg className={`w-3 h-3 transition-transform ${openDropdown === 'location' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
        </button>
        {openDropdown === 'location' && (
          <div className={menuClass}>
            <ul className="py-3 text-base font-medium">
              {["Westlands", "Kasarani", "Langata", "Kilimani", "Karen"].map(item => (
                <li key={item}><button onClick={() => handleSelect(setLocation, item)} className={itemClass}>{item}</button></li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 2. Property Type Dropdown */}
      <div className="relative w-full lg:w-auto">
        <button onClick={() => toggleDropdown('type')} className={btnClass} type="button">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faHouse} className="text-lg text-violet-500" />
            {propertyType}
          </div>
          <svg className={`w-3 h-3 transition-transform ${openDropdown === 'type' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
        </button>
        {openDropdown === 'type' && (
          <div className={menuClass}>
            <ul className="py-3 text-base font-medium">
              {["Apartment", "Bungalow", "Villa"].map(item => (
                <li key={item}><button onClick={() => handleSelect(setPropertyType, item)} className={itemClass}>{item}</button></li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 3. Price Range Dropdown */}
      <div className="relative w-full lg:w-auto">
        <button onClick={() => toggleDropdown('price')} className={btnClass} type="button">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faTags} className="text-lg text-violet-500" />
            {priceRange}
          </div>
          <svg className={`w-3 h-3 transition-transform ${openDropdown === 'price' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
        </button>
        {openDropdown === 'price' && (
          <div className={menuClass}>
            <ul className="py-3 text-base font-medium">
              {["Ksh 50k - 100k", "Ksh 101k - 200k", "Ksh 201k - 300k", "Ksh 301k - 400k", "Above 401k"].map(item => (
                <li key={item}><button onClick={() => handleSelect(setPriceRange, item)} className={itemClass}>{item}</button></li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button onClick={handleSearch} className="w-full lg:w-auto inline-flex items-center justify-center gap-3 text-white bg-violet-700 hover:bg-violet-600 font-bold rounded-xl text-base px-10 py-4 text-center transition-all shadow-lg active:scale-95 shadow-violet-900/20">
        <FontAwesomeIcon icon={faMagnifyingGlass} /> Search
      </button>
    </div>
  );
};

export default Search;