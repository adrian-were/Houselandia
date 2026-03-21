import React from 'react';

const AdminHouseCard = ({ house, onEdit, onDelete }) => {
  const { id, type, location, price, image, status, agent, bedrooms, bathrooms, surface } = house;
import React from 'react';

const AdminHouseCard = ({ house, onEdit, onDelete }) => {
  // We use optional chaining and fallbacks to ensure the UI doesn't break 
  // if a field is temporarily null during a database sync.
  const price = Number(house.price) || 0;

  return (
    <div className="bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-[2.5rem] p-6 flex flex-col md:flex-row items-center gap-6 shadow-xl hover:border-violet-500/30 transition-all group">
      
      {/* 1. Property Preview Image */}
      <div className="relative w-full md:w-48 h-32 overflow-hidden rounded-3xl">
        <img 
          src={house.image} 
          alt={house.type} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* The gradient overlay you liked */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent"></div>
        
        {/* Status Badge floating on image for extra flair */}
        <div className={`absolute top-2 left-2 px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter border ${
          house.status === 'Sold' 
            ? 'bg-red-500/20 text-red-500 border-red-500/30' 
            : 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
        }`}>
          {house.status || 'Available'}
        </div>
      </div>
      
      {/* 2. Property Information */}
      <div className="flex-grow text-center md:text-left space-y-1">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <h3 className="text-white font-bold text-xl tracking-tight">
            {house.type || "Property"} in {house.location}
          </h3>
          
          <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-1 rounded-md uppercase font-black tracking-widest w-fit mx-auto md:mx-0">
            ID: {house.id}
          </span>
        </div>

        {/* Price with Locale String */}
        <p className="text-violet-400 font-bold text-lg">
          Ksh {price.toLocaleString()}
        </p>

        {/* Location with Icon */}
        <div className="text-gray-500 text-sm flex items-center justify-center md:justify-start gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <span className="font-medium">{house.location}</span>
          
          {/* Added mini-specs to fill that empty space nicely */}
          <span className="hidden md:inline text-gray-700 mx-2">|</span>
          <span className="hidden md:inline text-xs text-gray-600">{house.bedrooms} Bed • {house.bathrooms} Bath</span>
        </div>
      </div>

      {/* 3. Admin Actions */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <button 
          onClick={() => onEdit(house)}
          className="flex-grow md:flex-none px-8 py-3 bg-violet-700 hover:bg-violet-600 text-white rounded-2xl font-bold transition-all shadow-lg shadow-violet-900/20 active:scale-95"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(house.id)}
          className="p-3 bg-gray-800/50 border border-gray-700 text-red-500 hover:bg-red-900/20 hover:border-red-900/50 rounded-2xl transition-all active:scale-95"
          title="Delete Property"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AdminHouseCard;
  return (
    <div className="bg-gray-900/40 border border-gray-800 rounded-[2rem] p-4 flex flex-col md:flex-row gap-6 items-center transition-all hover:border-violet-500/50">
      {/* Property Image & Status Badge */}
      <div className="relative w-full md:w-48 h-32">
        <img src={image} alt={type} className="w-full h-full object-cover rounded-2xl" />
        <span className={`absolute top-2 left-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          status === 'Sold' ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
        }`}>
          {status}
        </span>
      </div>

      {/* Property Details */}
      <div className="flex-grow space-y-1 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2">
           <span className="text-violet-400 text-[10px] font-black uppercase tracking-widest">{type}</span>
           <span className="text-gray-600">•</span>
           <span className="text-gray-400 text-xs font-medium">ID: {id}</span>
        </div>
        <h3 className="text-white text-xl font-bold">{location}</h3>
        <p className="text-violet-400 font-bold">Ksh {price?.toLocaleString()}</p>
        
        {/* Specs Mini-Bar */}
        <div className="flex gap-4 text-gray-500 text-xs mt-2 justify-center md:justify-start">
          <span>{bedrooms} Beds</span>
          <span>{bathrooms} Baths</span>
          <span>{surface}</span>
        </div>
      </div>

      {/* Agent Info (Nested Data) */}
      <div className="hidden lg:flex items-center gap-3 border-l border-gray-800 pl-6">
        <img src={agent?.image || 'https://i.pravatar.cc/150'} className="w-10 h-10 rounded-full border border-gray-700" alt="Agent" />
        <div>
          <p className="text-white text-xs font-bold">{agent?.name || 'No Agent'}</p>
          <p className="text-gray-500 text-[10px]">{agent?.phone}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button 
          onClick={() => onEdit(house)}
          className="p-3 bg-gray-800 hover:bg-violet-600 text-white rounded-xl transition-all"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(id)}
          className="p-3 bg-gray-800 hover:bg-red-600 text-white rounded-xl transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminHouseCard;
