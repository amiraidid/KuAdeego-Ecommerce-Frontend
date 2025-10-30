import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import UserDashBoard from './UserDashBoard';

function Header() {
  const [show, setshow] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const { user } = useContext(UserContext)

  const handleSignOut = () => {
    sessionStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <>
      <header className="max-sm:mx-7 mx-2 z-[1000]">
        <nav className="flex justify-between items-center py-3">
          <Link to={"/"}>
            <h1 className="text-2xl font-bold text-blue-900 italic">ADEEGO</h1>
          </Link>

          {/* Desktop Navbar */}
          <ul className="max-md:hidden max-sm:hidden flex justify-between items-center gap-4 ">
            <li className="uppercase text-indigo-900 font-medium hover:text-indigo-950 hover:tracking-widest transition-all">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="uppercase text-indigo-900 font-medium hover:text-indigo-950 hover:tracking-widest transition-all">
              <Link to={"/products"}>products</Link>
            </li>
            <li className="relative uppercase text-indigo-900 font-medium hover:text-indigo-950 hover:tracking-widest transition-all">
              <Link to={"/men-section"}>Men</Link>
            </li>
            <li className="relative uppercase text-indigo-900 font-medium hover:text-indigo-950 hover:tracking-widest transition-all">
              <Link to={"/women-section"}>Women</Link>
            </li>
            <li className="relative uppercase text-indigo-900 font-medium hover:text-indigo-950 hover:tracking-widest transition-all">
              <Link to={"/kids-section"}>Kids</Link>
            </li>
          </ul>

          <div className="max-sm:hidden max-md:hidden flex justify-between items-center gap-4 ">
            <Link to={"/carts"}>
              <button className="hover:scale-[1.1] transition-all">🛒</button>
            </Link>
            {user ? (
              <>
                <button
                  onClick={() => setshow(!show)}
                  className="bg-transparentpy-1 rounded-md text-black uppercase font-medium hover:scale-[1.1] transition-all"
                >
                   <img src="./profile.jpg" className="h-8" alt="User" />
                </button>
                <div className='absolute top-12 right-0 p-4 z-[100]'>
                  <UserDashBoard show={show} setShow={setshow} handleSignOut={handleSignOut}/>
                </div>
              </>
            ) : (
              <>
                <Link to={"/login"}>
                  <button className="bg-blue-500 px-4 py-1 rounded-md text-white uppercase font-medium hover:scale-[1.1] hover:bg-blue-700 transition-all">
                    login
                  </button>
                </Link>
                <Link to={"/signup"}>
                  <button className="bg-transparent border border-blue-950 px-4 py-1 rounded-md text-black uppercase font-medium hover:scale-[1.1] hover:border-blue-700 transition-all">
                    SignUp
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navbar */}
          <div className="flex justify-center items-center gap-2 lg:hidden md:hidden z-[100]">
            <button className="bg-slate-50 px-4 py-2 border border-indigo-950 rounded hidden max-sm:block hover:scale-[1.1] transition-all">
              <Link to={"/carts"}>
                <i className="bi bi-cart3 text-2xl"></i>
              </Link>
            </button>
            <button
              onClick={() => setHamburger(!hamburger)}
              className="bg-indigo-900 px-4 py-2 rounded hidden max-sm:block hover:scale-[1.1] transition-all"
            >
              <i className="bi bi-list text-2xl text-white"></i>
            </button>
          </div>

          <div
            className={`${
              hamburger ? "flex" : "hidden"
            } flex-col absolute top-32 bg-slate-100 p-4 w-80 h-72 z-[100]`}
          >
            <ul className="flex flex-col justify-between items-start gap-4 ">
              <li className="text-xl uppercase text-indigo-900 font-medium hover:text-indigo-950 hover:tracking-widest transition-all">
                <Link to={"/"}>Home</Link>
              </li>
              <li className="text-xl uppercase text-indigo-900 font-medium hover:text-indigo-950 hover:tracking-widest transition-all">
                <Link to={"/products"}>products</Link>
              </li>
              <li className="relative uppercase text-indigo-900 font-medium hover:text-indigo-950 hover:tracking-widest transition-all">
                <Link to={"/men-section"}>Men</Link>
              </li>
              <li className="relative uppercase text-indigo-900 font-medium hover:text-indigo-950 hover:tracking-widest transition-all">
                <Link to={"/women-section"}>Women</Link>
              </li>
              <li className="relative uppercase text-indigo-900 font-medium hover:text-indigo-950 hover:tracking-widest transition-all">
                <Link to={"/kids-section"}>Kids</Link>
              </li>
            </ul>

            <div className="flex flex-col justify-between items-start gap-4 mt-5 w-full ">
              {user ? (
                <>
                  <button
                    onClick={() => setshow(!show)}
                    className="flex items-center gap-4 px-4 bg-white border border-indigo-700 py-1 rounded-md text-black uppercase font-medium hover:scale-[1.1] transition-all"
                  >
                    <img src="./profile.jpg" className="h-8 " alt="User" /> User Profile
                  </button>
                  <div className='absolute top-60 right-0 p-4 z-[100]'>
                    <UserDashBoard show={show} handleSignOut={handleSignOut}/>
                  </div>
                </>
              ) : (
                <>
                  <button className="bg-blue-500 w-full px-4 py-1 rounded-md text-white uppercase font-medium hover:scale-[1.1] hover:bg-blue-700 transition-all">
                    <Link to={"/login"}>login</Link>
                  </button>
                  <button className="bg-transparent w-full border border-blue-950 px-4 py-1 rounded-md text-black uppercase font-medium hover:scale-[1.1] hover:border-blue-700 transition-all">
                    <Link to={"/signup"}>SignUp</Link>
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
        <hr />
      </header>
    </>
  );
}

export default Header