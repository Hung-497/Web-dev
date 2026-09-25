import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const handleClick = () => {
    localStorage.removeItem("user");  // 1. delete the token from storage
    setIsAuthenticated(false);         // 2. update React state → re-render
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  return (
    <nav className='bg-indigo-700 border-b border-indigo-500'>

      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
              <img className='h-10 w-auto' src={logo} alt='React Jobs' />
              <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                React Jobs
              </span>
            </NavLink>
            <div className='md:ml-auto'>
              <div className='flex space-x-2'>
                <NavLink to='/' className={linkClass}>
                  Home
                </NavLink>
                <NavLink to='/jobs' className={linkClass}>
                  Jobs
                </NavLink>
                <NavLink to='/add-job' className={linkClass}>
                  Add Job
                </NavLink>
                {isAuthenticated ? (

              <div className="flex items-center gap-4 ml-4 border-l border-indigo-400 pl-4">
                <span className="text-white"> Welcome! </span>

                <button onClick={handleClick} className="bg-white text-indigo-700 px-4 py-2 rounded-md hover:bg-gray-200"> Log out</button>
              </div>

            ) : (

              <div className="flex items-center gap-2 ml-4">
                <Link to="/login" className="text-white hover:bg-gray-900 rounded-md px-3 py-2">Login</Link>
                <Link to="/signup" className="text-white hover:bg-gray-900 rounded-md px-3 py-2">Sign Up</Link>
              </div>
            )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
