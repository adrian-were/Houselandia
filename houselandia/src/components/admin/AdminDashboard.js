import React, { useState, useEffect } from 'react';
import AdminHouseCard from './AdminHouseCard';
import HouseForm from './HouseForm';

const AdminDashboard = () => {
  const [houses, setHouses] = useState([]);
  const [editingHouse, setEditingHouse] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  const API_URL = 'https://houselandia-api.onrender.com/housesData';

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setHouses(data);
    } catch (err) {
      console.error("Failed to fetch houses:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- STATS CALCULATIONS ---
  const totalHouses = houses.length;
  const averagePrice = houses.length > 0 
    ? Math.round(houses.reduce((acc, house) => {
        const priceStr = String(house.price || "0");
        const numericPrice = Number(priceStr.replace(/[^0-9.-]+/g, ""));
        return acc + (isNaN(numericPrice) ? 0 : numericPrice);
      }, 0) / houses.length)
    : 0;

  // --- SEARCH & FILTER LOGIC ---
  const filteredHouses = houses.filter(house => {
    // 1. Normalize all values
    const houseType = (house.type || "").toString().toLowerCase().trim();
    const houseLocation = (house.location || "").toString().toLowerCase().trim();
    
    const searchQueryLower = searchQuery.toLowerCase().trim();
    const filterTypeLower = filterType.toLowerCase().trim();

    // 2. Search logic: Match location OR type
    const matchesSearch = houseLocation.includes(searchQueryLower) || 
                          houseType.includes(searchQueryLower);
    
    // 3. Category logic: Match 'all' OR the specific type
    const matchesCategory = filterTypeLower === 'all' || 
                            houseType === filterTypeLower;
    
    // Fixed: Logic must return a value; console.log was moved before the return
    // to avoid "unreachable code" errors during the build process.
    return matchesSearch && matchesCategory;
  });

  // --- CRUD HANDLERS ---
  const handleAddHouse = async (newHouse) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHouse),
      });

      if (res.ok) {
        setIsAdding(false);
        await fetchHouses(); 
      } else {
        const errorText = await res.text();
        throw new Error(errorText || "Server rejected the data");
      }
    } catch (err) {
      console.error("Post Error:", err);
      alert("Could not save the house. Please check if your JSON server is running.");
    }
  };

  const handleUpdateHouse = async (updatedFields) => {
    try {
      const res = await fetch(`${API_URL}/${editingHouse.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      });
      if (res.ok) {
        setEditingHouse(null);
        fetchHouses();
      }
    } catch (err) {
      alert("Error updating house");
    }
  };

  const handleDeleteHouse = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        setHouses(houses.filter(h => h.id !== id));
      } catch (err) {
        alert("Error deleting house");
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-950 pt-28 pb-20 px-4 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-slate-800/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col">
        
        {/* HEADER */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 border-b border-gray-900 pb-10">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter">Admin Control</h1>
            <p className="text-gray-500 mt-1 font-medium">Manage your Houselandia property listings</p>
          </div>
          {!isAdding && !editingHouse && (
            <button 
              onClick={() => setIsAdding(true)}
              className="w-full sm:w-auto bg-violet-700 hover:bg-violet-600 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-violet-900/20 active:scale-95"
            >
              + Post New Property
            </button>
          )}
        </header>

        {/* STATS BAR */}
        {!isAdding && !editingHouse && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-gray-900/40 backdrop-blur-md border border-gray-800 p-6 rounded-[2rem] flex items-center gap-5">
              <div className="w-12 h-12 bg-violet-500/10 rounded-2xl flex items-center justify-center text-violet-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Total Listings</p>
                <h4 className="text-white text-2xl font-bold">{totalHouses}</h4>
              </div>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-md border border-gray-800 p-6 rounded-[2rem] flex items-center gap-5">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Avg Value</p>
                <h4 className="text-white text-2xl font-bold">Ksh {averagePrice.toLocaleString()}</h4>
              </div>
            </div>

            <div className="hidden lg:flex bg-gray-900/40 backdrop-blur-md border border-gray-800 p-6 rounded-[2rem] items-center gap-5">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Server Status</p>
                <h4 className="text-white text-lg font-bold">Operational</h4>
              </div>
            </div>
          </div>
        )}

        {/* SEARCH & FILTER BAR */}
        {!isAdding && !editingHouse && (
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </span>
              <input 
                type="text"
                placeholder="Search listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-2xl text-white outline-none focus:ring-2 focus:ring-violet-600 transition-all placeholder:text-gray-600"
              />
            </div>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-6 py-4 bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-2xl text-gray-300 outline-none focus:ring-2 focus:ring-violet-600 appearance-none cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Villa">Villa</option>
            </select>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <main>
          {loading ? (
            <div className="flex flex-col items-center py-20">
              <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 mt-4 font-bold tracking-widest text-xs uppercase">Syncing Database...</p>
            </div>
          ) : (isAdding || editingHouse) ? (
            <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <HouseForm 
                initialData={editingHouse} 
                onSubmit={editingHouse ? handleUpdateHouse : handleAddHouse} 
                onCancel={() => { setIsAdding(false); setEditingHouse(null); }}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {filteredHouses.length > 0 ? (
                filteredHouses.map(house => (
                  <AdminHouseCard 
                    key={house.id} 
                    house={house} 
                    onEdit={setEditingHouse} 
                    onDelete={handleDeleteHouse} 
                  />
                ))
              ) : (
                <div className="text-center py-20 bg-gray-900/20 rounded-[2.5rem] border border-dashed border-gray-800">
                  <p className="text-gray-600 font-medium">No properties found matching your criteria.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;