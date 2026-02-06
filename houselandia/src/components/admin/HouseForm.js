import React, { useState } from 'react';

const HouseForm = ({ initialData, onSubmit, onCancel }) => {
  // Initialize with your exact db.json structure
  const [formData, setFormData] = useState(initialData || {
    type: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    surface: '',
    price: '',
    image: '',
    imageLg: '',
    description: '',
    gallery: [],
    agent: {
      name: '',
      phone: '',
      image: 'https://i.pravatar.cc/150?u=newagent'
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Handle nested agent updates
    if (name.startsWith('agent.')) {
      const agentField = name.split('.')[1];
      setFormData({
        ...formData,
        agent: { ...formData.agent, [agentField]: value }
      });
    } else if (name === 'gallery') {
      // Convert comma-separated string back to array
      setFormData({ ...formData, gallery: value.split(',').map(url => url.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure numbers are stored as numbers, not strings
    const submissionData = {
      ...formData,
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
      price: parseInt(formData.price),
    };
    onSubmit(submissionData);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 p-8 rounded-[2.5rem] shadow-2xl max-w-4xl mx-auto overflow-y-auto max-h-[80vh]">
      <h2 className="text-2xl font-bold text-white mb-6">
        {initialData ? "Edit Property" : "Post New Property"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input name="location" placeholder="Location (e.g., Westlands)" value={formData.location} onChange={handleChange} required className="form-input-style" />
          <input name="price" type="number" placeholder="Price (Numeric)" value={formData.price} onChange={handleChange} required className="form-input-style" />
          <select name="type" value={formData.type} onChange={handleChange} className="form-input-style">
            <option value="Apartment">Apartment</option>
            <option value="Bungalow">Bungalow</option>
            <option value="Villa">Villa</option>
          </select>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input name="bedrooms" type="number" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} className="form-input-style" />
          <input name="bathrooms" type="number" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} className="form-input-style" />
          <input name="surface" placeholder="Surface (e.g., 4200sqft)" value={formData.surface} onChange={handleChange} className="form-input-style" />
        </div>

        {/* Images */}
        <div className="space-y-4">
          <input name="image" placeholder="Main Image URL" value={formData.image} onChange={handleChange} className="form-input-style w-full" />
          <input name="imageLg" placeholder="Large Banner Image URL" value={formData.imageLg} onChange={handleChange} className="form-input-style w-full" />
          <textarea name="gallery" placeholder="Gallery Images (Comma separated URLs)" value={formData.gallery.join(', ')} onChange={handleChange} className="form-input-style w-full h-20" />
        </div>

        {/* Agent Details */}
        <div className="bg-gray-800/30 p-4 rounded-2xl space-y-4 border border-gray-800">
          <p className="text-violet-400 text-xs font-bold uppercase tracking-widest">Agent Information</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="agent.name" placeholder="Agent Name" value={formData.agent.name} onChange={handleChange} className="form-input-style" />
            <input name= "agent.image" placeholder="Agent Image" value={formData.agent.image} onchange={handleChange} className="form-input-style w-full" />
            <input name="agent.phone" placeholder="Agent Phone" value={formData.agent.phone} onChange={handleChange} className="form-input-style" />
          </div>
        </div>

        <textarea name="description" placeholder="Property Description" value={formData.description} onChange={handleChange} className="form-input-style w-full h-32" />

        <div className="flex gap-4">
          <button type="submit" className="flex-grow bg-violet-700 hover:bg-violet-600 text-white font-bold py-4 rounded-2xl transition-all">
            {initialData ? "Update Listing" : "Publish Listing"}
          </button>
          <button type="button" onClick={onCancel} className="px-8 text-gray-400 hover:text-white transition-all">Cancel</button>
        </div>
      </form>
    </div>
  );
};

// CSS class helper (Add this to your CSS file or use inline)
const inputStyle = "bg-gray-800/50 border border-gray-700 text-white p-3 rounded-xl focus:ring-2 focus:ring-violet-600 outline-none w-full";

export default HouseForm;