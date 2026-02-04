import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBed, faBath, faRulerCombined, faPhone, 
  faArrowLeft, faEnvelope, faMapMarkerAlt,
  faChevronLeft, faChevronRight, faTimes, faExpand
} from '@fortawesome/free-solid-svg-icons';

const HouseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`http://127.0.0.1:8000/housesData/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Property not found");
        return res.json();
      })
      .then((data) => {
        setHouse(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching house details:", err);
        setLoading(false);
      });
  }, [id]);

  const allImages = house ? [house.imageLg || house.image, ...(house.gallery || [])] : [];

  const nextSlide = (e) => {
    e?.stopPropagation(); 
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isZoomed) return;
      if (e.key === 'Escape') setIsZoomed(false);
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomed, allImages.length]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!house) return <div className="p-20 text-center text-white">Property not found.</div>;

  return (
    // Removed large pb-32 to close the gap to footer
    <div className="min-h-screen bg-gray-800 text-white pb-20 md:pb-10">
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <button onClick={() => navigate(-1)} className="p-2 text-white hover:text-violet-400 transition-colors">
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </button>
      </div>

      {/* --- IMAGE SLIDER --- */}
      <div className="max-w-5xl mx-auto px-4 mb-6">
        {/* Adjusted Height: h-[250px] on mobile, h-[550px] on desktop */}
        <div className="relative group h-[250px] md:h-[550px] w-full bg-gray-900 rounded-[2rem] overflow-hidden shadow-2xl border border-gray-800">
          <img 
            src={allImages[currentIndex]} 
            alt="Property" 
            className="w-full h-full object-cover cursor-zoom-in"
            onClick={() => setIsZoomed(true)}
          />

          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white p-2 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            <FontAwesomeIcon icon={faExpand} size="sm" />
          </div>

          <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full text-white transition-all">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full text-white transition-all">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        {/* Smaller Thumbnails for Mobile */}
        <div className="flex gap-2 mt-4 overflow-x-auto py-2 hide-scrollbar">
          {allImages.map((img, idx) => (
            <img 
              key={idx}
              src={img}
              onClick={() => setCurrentIndex(idx)}
              className={`h-14 w-20 flex-shrink-0 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                currentIndex === idx ? 'border-violet-600 opacity-100' : 'border-transparent opacity-40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
              <div>
                <span className="bg-violet-900/30 text-violet-400 px-3 py-1 rounded-full text-xs font-bold uppercase mb-2 inline-block">
                  {house.type}
                </span>
                <h1 className="text-2xl md:text-4xl font-extrabold text-white">{house.location}</h1>
                <p className="text-gray-400 mt-1 flex items-center gap-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-violet-500" />
                  Nairobi, Kenya
                </p>
              </div>
              <div className="md:text-right">
                <p className="text-2xl md:text-3xl font-black text-violet-500">Ksh {house.price?.toLocaleString()}</p>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-3 gap-3 py-6 border-y border-gray-800 mb-6">
              <div className="text-center bg-gray-900/50 p-3 rounded-2xl">
                <FontAwesomeIcon icon={faBed} className="text-violet-500 mb-1" />
                <p className="text-xs font-bold">{house.bedrooms} Bed</p>
              </div>
              <div className="text-center bg-gray-900/50 p-3 rounded-2xl">
                <FontAwesomeIcon icon={faBath} className="text-violet-500 mb-1" />
                <p className="text-xs font-bold">{house.bathrooms} Bath</p>
              </div>
              <div className="text-center bg-gray-900/50 p-3 rounded-2xl">
                <FontAwesomeIcon icon={faRulerCombined} className="text-violet-500 mb-1" />
                <p className="text-xs font-bold">{house.surface}</p>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-3 text-white">Description</h2>
            <p className={`text-gray-400 leading-relaxed text-sm md:text-base ${!isExpanded && 'line-clamp-3 md:line-clamp-none'}`}>
              {house.description}
            </p>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 text-violet-500 font-bold md:hidden text-sm"
            >
              {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <div className="border border-gray-800 p-6 rounded-[2rem] sticky top-28 bg-gray-900/50 backdrop-blur-sm shadow-xl">
              <h3 className="text-lg font-bold mb-4">Agent</h3>
              <div className="flex items-center gap-4 mb-6">
                <img src={house.agent?.image || "https://i.pravatar.cc/150"} alt="Agent" className="w-12 h-12 rounded-full object-cover border border-violet-500/30" />
                <div>
                  <h4 className="font-bold text-sm">{house.agent?.name}</h4>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Verified</p>
                </div>
              </div>
              <div className="space-y-3">
                <a href={`tel:${house.agent?.phone}`} className="flex items-center justify-center gap-2 w-full bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-200 transition-all text-sm">
                  <FontAwesomeIcon icon={faPhone} /> Call
                </a>
                <button className="flex items-center justify-center gap-2 w-full bg-violet-600 text-white py-3 rounded-xl font-bold hover:bg-violet-700 transition-all text-sm">
                  <FontAwesomeIcon icon={faEnvelope} /> Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- LIGHTBOX --- */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => setIsZoomed(false)}
        >
          <button 
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 w-10 h-10 bg-violet-600/10 hover:bg-violet-600 text-violet-400 hover:text-white rounded-full flex items-center justify-center border border-violet-600/20 z-[110]"
          >
            <FontAwesomeIcon icon={faTimes} size="sm" />
          </button>

          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-violet-400 p-4 transition-colors text-4xl">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          
          <img 
            src={allImages[currentIndex]} 
            className="max-w-[95vw] max-h-[80vh] rounded-lg shadow-2xl object-contain animate-in zoom-in-95 duration-300"
            alt="Enlarged"
            onClick={(e) => e.stopPropagation()} 
          />

          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-violet-400 p-4 transition-colors text-4xl">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}

      {/* --- MOBILE FLOATING ACTION BAR --- */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-[60]">
         <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 p-3 rounded-2xl flex gap-3 shadow-2xl shadow-black/50">
            <a 
              href={`tel:${house.agent?.phone}`}
              className="flex-1 bg-white text-black flex items-center justify-center gap-2 py-3 rounded-xl font-bold active:scale-95 text-sm"
            >
              <FontAwesomeIcon icon={faPhone} /> Call
            </a>
            <button 
              className="flex-1 bg-violet-600 text-white flex items-center justify-center gap-2 py-3 rounded-xl font-bold active:scale-95 text-sm"
            >
              <FontAwesomeIcon icon={faEnvelope} /> Message
            </button>
         </div>
      </div>
    </div>
  );
};

export default HouseDetails;

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faBed, faBath, faRulerCombined, faPhone, 
//   faArrowLeft, faEnvelope, faMapMarkerAlt,
//   faChevronLeft, faChevronRight, faTimes, faExpand
// } from '@fortawesome/free-solid-svg-icons';

// const HouseDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [house, setHouse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isZoomed, setIsZoomed] = useState(false);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     setLoading(true);
//     fetch(`http://127.0.0.1:8000/housesData/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setHouse(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [id]);

//   // Combine main image and gallery into one array for the slider
//   const allImages = house ? [house.imageLg || house.image, ...(house.gallery || [])] : [];

//   const nextSlide = () => setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
//   const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));

//   if (loading || !house) return <div className="h-screen flex items-center justify-center">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-white pb-32">
//       {/* Navigation Header */}
//       <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
//         <button onClick={() => navigate(-1)} className="text-gray-900 hover:text-violet-600 transition-all">
//           <FontAwesomeIcon icon={faArrowLeft} size="lg" />
//         </button>
//       </div>

//       {/* Main Image Slider Container */}
//       <div className="max-w-5xl mx-auto px-4 mb-8">
//         <div className="relative group h-[350px] md:h-[550px] w-full bg-gray-100 rounded-[2rem] overflow-hidden shadow-2xl">
          
//           {/* Main Display Image */}
//           <img 
//             src={allImages[currentIndex]} 
//             alt="Property" 
//             className="w-full h-full object-cover cursor-pointer transition-transform duration-500"
//             onClick={() => setIsZoomed(true)}
//           />

//           {/* Enlarge Icon Overlay */}
//           <div className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
//             <FontAwesomeIcon icon={faExpand} />
//           </div>

//           {/* Slider Controls */}
//           <button 
//             onClick={prevSlide}
//             className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-4 rounded-full shadow-lg transition-all"
//           >
//             <FontAwesomeIcon icon={faChevronLeft} className="text-gray-900" />
//           </button>
//           <button 
//             onClick={nextSlide}
//             className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-4 rounded-full shadow-lg transition-all"
//           >
//             <FontAwesomeIcon icon={faChevronRight} className="text-gray-900" />
//           </button>

//           {/* Image Counter */}
//           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-1 rounded-full text-sm backdrop-blur-md">
//             {currentIndex + 1} / {allImages.length}
//           </div>
//         </div>

//         {/* Thumbnails (Quick Jump) */}
//         <div className="flex gap-4 mt-4 overflow-x-auto py-2 hide-scrollbar">
//           {allImages.map((img, idx) => (
//             <img 
//               key={idx}
//               src={img}
//               onClick={() => setCurrentIndex(idx)}
//               className={`h-20 w-28 object-cover rounded-xl cursor-pointer border-2 transition-all ${currentIndex === idx ? 'border-violet-600 scale-105' : 'border-transparent opacity-60'}`}
//               alt="Thumbnail"
//             />
//           ))}
//         </div>
//       </div>

//       {/* Property Details Info Section */}
//       <div className="max-w-5xl mx-auto px-4">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//           <div className="lg:col-span-2">
//             <div className="flex justify-between items-start mb-6">
//               <div>
//                 <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{house.location}</h1>
//                 <p className="text-gray-500"><FontAwesomeIcon icon={faMapMarkerAlt} className="text-violet-600 mr-2"/>Nairobi, Kenya</p>
//               </div>
//               <div className="text-right">
//                 <p className="text-3xl font-black text-violet-600">Ksh {house.price?.toLocaleString()}</p>
//                 <span className="text-gray-400 text-sm">{house.type}</span>
//               </div>
//             </div>

//             {/* Specs Grid */}
//             <div className="grid grid-cols-3 gap-4 border-y py-8 mb-8">
//               <div className="text-center"><FontAwesomeIcon icon={faBed} className="text-violet-600 block mb-2" /><span className="font-bold">{house.bedrooms} Bed</span></div>
//               <div className="text-center"><FontAwesomeIcon icon={faBath} className="text-violet-600 block mb-2" /><span className="font-bold">{house.bathrooms} Bath</span></div>
//               <div className="text-center"><FontAwesomeIcon icon={faRulerCombined} className="text-violet-600 block mb-2" /><span className="font-bold">{house.surface}</span></div>
//             </div>

//             <p className="text-gray-600 leading-relaxed text-lg">{house.description}</p>
//           </div>

//           {/* Desktop Agent Sidebar */}
//           <div className="hidden lg:block">
//             <div className="border border-gray-100 p-6 rounded-3xl sticky top-28 shadow-sm">
//               <div className="flex items-center gap-4 mb-6">
//                 <img src={house.agent?.image} className="w-14 h-14 rounded-full border-2 border-violet-100" alt="Agent" />
//                 <div><h4 className="font-bold">{house.agent?.name}</h4><p className="text-xs text-gray-400">Trusted Agent</p></div>
//               </div>
//               <a href={`tel:${house.agent?.phone}`} className="block w-full bg-gray-900 text-white text-center py-4 rounded-2xl font-bold mb-3"><FontAwesomeIcon icon={faPhone} className="mr-2" /> Call Agent</a>
//               <button className="w-full bg-violet-600 text-white py-4 rounded-2xl font-bold"><FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Message</button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- LIGHTBOX MODAL --- */}
//       {isZoomed && (
//         <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300">
//           <button 
//             onClick={() => setIsZoomed(false)}
//             className="absolute top-10 right-10 text-white text-4xl hover:text-violet-400 transition-colors"
//           >
//             <FontAwesomeIcon icon={faTimes} />
//           </button>
//           <img 
//             src={allImages[currentIndex]} 
//             className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain"
//             alt="Enlarged"
//           />
//         </div>
//       )}

//       {/* Mobile Floating Bar */}
//       <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t p-4 flex gap-4 z-50">
//         <a href={`tel:${house.agent?.phone}`} className="flex-1 bg-gray-900 text-white py-4 rounded-2xl text-center font-bold">Call</a>
//         <button className="flex-1 bg-violet-600 text-white py-4 rounded-2xl font-bold">Message</button>
//       </div>
//     </div>
//   );
// };

// export default HouseDetails;