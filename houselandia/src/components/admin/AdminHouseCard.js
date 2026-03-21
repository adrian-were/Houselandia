import React from 'react';

// 1. Extract Icons to stay DRY (Don't Repeat Yourself)
const PinIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const AdminHouseCard = ({ house, onEdit, onDelete }) => {
  // 2. Defensive Data Handling (From Version A)
  const price = Number(house?.price) || 0;
  const isSold = house?.status === 'Sold';

  return (
    <div className="bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-[2.5rem] p-6 flex flex-col md:flex-row items-center gap-6 shadow-xl hover:border-violet-500/30 transition-all group">
      
      {/* Property Image Section */}
      <div className="relative w-full md:w-48 h-32 overflow-hidden rounded-3xl shrink-0">
        <img 
          src={house.image} 
          alt={house.type} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent"></div>
        
        {/* Version A's Floating Badge (Better for Visual Hierarchy) */}
        <div className={`absolute top-2 left-2 px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter border ${
          isSold ? 'bg-red-500/20 text-red-500 border-red-500/30' : 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
        }`}>
          {house.status || 'Available'}
        </div>
      </div>
      
      {/* Content Section */}
      <div className="flex-grow text-center md:text-left space-y-1">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <h3 className="text-white font-bold text-xl tracking-tight">
            {house.type || "Property"} in {house.location}
          </h3>
          <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-1 rounded-md uppercase font-black tracking-widest w-fit mx-auto md:mx-0">
            ID: {house.id}
          </span>
        </div>

        <p className="text-violet-400 font-bold text-lg">
          Ksh {price.toLocaleString()}
        </p>

        <div className="text-gray-500 text-sm flex items-center justify-center md:justify-start gap-1">
          <PinIcon />
          <span className="font-medium">{house.location}</span>
          {/* Keep the specs from Version A to provide more value to the admin */}
          <span className="hidden md:inline text-gray-700 mx-2">|</span>
          <span className="hidden md:inline text-xs text-gray-600">
            {house.bedrooms} Bed • {house.bathrooms} Bath
          </span>
        </div>
      </div>

      {/* Action Section */}
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
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default AdminHouseCard;
