import React from 'react';
import {Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className='py-6 mb-12 border-b border-gray-800 bg-gray-900'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/'>
           <span className="text-2xl font-bold text-white">Logo</span>
        </Link>
        <div className='flex items-center gap-6'>
          {/* Link to the login path */}
          <Link className='text-white hover:text-violet-400 transition' to='/login'>Log in</Link>
          
          {/* Link to the signup path */}
          <Link className='bg-violet-700 hover:bg-violet-800 text-white px-4 py-2 rounded-lg transition' to='/signup'>Sign up</Link>
        </div>
      </div>
    </header>
  )
};
export default Header;


// import React from 'react';
// import {Link } from 'react-router-dom';
// // import Logo from '../assets/logo.svg';

// const Header = () => {
//   return (
//     <header className='py-6 mb-12 border-b'>
//       <div className='container mx-auto flex justify-between items-center'>
//         {/* <Link  to='/'> <img src={Logo} alt=""/> </Link > */}
//         <div className='flex items-center gap-6 '>
//           <Link className='hover:text-violet-900 transition'  to=''>Log in</Link >
//           <Link className='bg-violet-700 hover:bg-violet-800 text-white px-4 py-3 rounded-lg transition' to=''>Sign up</Link >
//         </div>
//       </div>
//     </header>
//   )
// };

// export default Header;