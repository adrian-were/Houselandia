import React from 'react';

const AdminHouseCard = ({ house, onEdit, onDelete }) => {
  const { id, type, location, price, image, status, agent, bedrooms, bathrooms, surface } = house;

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
