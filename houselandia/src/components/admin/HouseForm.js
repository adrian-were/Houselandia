import React, { useState } from 'react';

const HouseForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    price: '',
    location: '',
    image: '',
    description: '',
    type: 'Apartment'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 p-8 rounded-[2.5rem] shadow-2xl max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">
        {initialData ? "Edit Property" : "Add New Property"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            name="title" 
            placeholder="Property Title" 
            value={formData.title} 
            onChange={handleChange}
            className="bg-gray-800/50 border border-gray-700 text-white p-3 rounded-xl focus:ring-2 focus:ring-violet-600 outline-none"
          />
          <input 
            name="price" 
            placeholder="Price (e.g. Ksh 150k)" 
            value={formData.price} 
            onChange={handleChange}
            className="bg-gray-800/50 border border-gray-700 text-white p-3 rounded-xl focus:ring-2 focus:ring-violet-600 outline-none"
          />
        </div>

        <input 
          name="image" 
          placeholder="Image URL" 
          value={formData.image} 
          onChange={handleChange}
          className="w-full bg-gray-800/50 border border-gray-700 text-white p-3 rounded-xl focus:ring-2 focus:ring-violet-600 outline-none"
        />

        <textarea 
          name="description" 
          placeholder="Description" 
          value={formData.description} 
          onChange={handleChange}
          rows="4"
          className="w-full bg-gray-800/50 border border-gray-700 text-white p-3 rounded-xl focus:ring-2 focus:ring-violet-600 outline-none"
        />

        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            className="flex-grow bg-violet-700 hover:bg-violet-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-violet-900/20"
          >
            {initialData ? "Save Changes" : "Post Property"}
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className="px-6 bg-transparent border border-gray-700 text-gray-400 hover:bg-gray-800 py-3 rounded-xl transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default HouseForm;