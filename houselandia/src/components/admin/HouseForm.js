import React, { useState } from 'react';

const HouseForm = ({ initialData, onSubmit, onCancel }) => {
  const [isUploading, setIsUploading] = useState(false);
  
  // REPLACE THIS with your actual Cloud Name from the Cloudinary Dashboard
  const CLOUD_NAME = "dfnak2eex"; 
  const UPLOAD_PRESET = "Houselandia";

  const [formData, setFormData] = useState(initialData || {
    type: '',
    location: '',
    status: 'Available',
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

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);
    
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, 
        { method: "POST", body: data }
      );
      
      if (!response.ok) throw new Error("Cloudinary upload failed");
      
      const resData = await response.json();
      return resData.secure_url; 
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      alert("Failed to upload image. Check your Cloud Name and Internet connection.");
      return null;
    }
  };

  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const url = await uploadToCloudinary(file);
    if (url) {
      setFormData(prev => ({ ...prev, image: url, imageLg: url }));
    }
    setIsUploading(false);
  };

  const handleGalleryChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    const uploadPromises = files.map(file => uploadToCloudinary(file));
    const urls = await Promise.all(uploadPromises);
    
    const validUrls = urls.filter(url => url !== null);
    setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ...validUrls] }));
    setIsUploading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('agent.')) {
      const agentField = name.split('.')[1];
      setFormData({
        ...formData,
        agent: { ...formData.agent, [agentField]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUploading) return; 

    // Validation: Ensure we actually have an image before saving
    if (!formData.image) {
      alert("Please wait for the image to finish uploading or select a main photo.");
      return;
    }

    const submissionData = {
      ...formData,
      bedrooms: parseInt(formData.bedrooms) || 0,
      bathrooms: parseInt(formData.bathrooms) || 0,
      price: parseInt(formData.price) || 0,
    };
    onSubmit(submissionData);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 p-8 rounded-[2.5rem] shadow-2xl max-w-4xl mx-auto overflow-y-auto max-h-[80vh]">
      <h2 className="text-2xl font-bold text-white mb-6">
        {initialData ? "Edit Property" : "Post New Property"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="form-input-style" />
          <input name="price" type="number" placeholder="Price (Ksh)" value={formData.price} onChange={handleChange} required className="form-input-style" />
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
          <input name="surface" placeholder="Surface (e.g. 4000sqft)" value={formData.surface} onChange={handleChange} className="form-input-style" />
        </div>

        {/* --- CLOUD UPLOAD SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-950/40 p-6 rounded-3xl border border-gray-800">
          <div className="space-y-2">
            <label className="text-violet-400 text-[10px] font-black uppercase tracking-widest">Main Photo</label>
            <input type="file" onChange={handleMainImageChange} className="form-input-style text-xs py-2" />
            {formData.image && (
              <div className="relative mt-2 w-20 h-20">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover rounded-xl border border-violet-500" />
                <div className="absolute inset-0 bg-violet-500/20 rounded-xl animate-pulse"></div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-violet-400 text-[10px] font-black uppercase tracking-widest">Gallery</label>
            <select 
    name="status" 
    value={formData.status} 
    onChange={handleChange} 
    className="form-input-style"
  >
    <option value="Available">Available</option>
    <option value="Sold">Sold / Rented</option>
  </select>
            <input type="file" multiple onChange={handleGalleryChange} className="form-input-style text-xs py-2" />
            <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
              {formData.gallery.map((url, i) => (
                <img key={i} src={url} alt="Gallery item" className="w-12 h-12 object-cover rounded-lg border border-gray-800" />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 p-6 rounded-3xl space-y-4 border border-gray-800">
          <p className="text-violet-400 text-xs font-bold uppercase tracking-widest">Agent Details</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="agent.name" placeholder="Agent Name" value={formData.agent.name} onChange={handleChange} className="form-input-style" />
            <input name="agent.phone" placeholder="Agent Phone" value={formData.agent.phone} onChange={handleChange} className="form-input-style" />
          </div>
        </div>

        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="form-input-style w-full h-32" />

        <div className="flex gap-4">
          <button 
            type="submit" 
            disabled={isUploading}
            className={`flex-grow font-bold py-4 rounded-2xl transition-all shadow-xl ${
              isUploading ? 'bg-gray-800 text-gray-500' : 'bg-violet-700 text-white hover:bg-violet-600 shadow-violet-900/20'
            }`}
          >
            {isUploading ? "Syncing with Cloud..." : (initialData ? "Update" : "Publish")}
          </button>
          <button type="button" onClick={onCancel} className="px-8 text-gray-400 hover:text-white transition-all font-bold">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default HouseForm;