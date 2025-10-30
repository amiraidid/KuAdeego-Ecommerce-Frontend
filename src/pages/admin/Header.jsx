import React from 'react'

function Header() {
    const handleSignOut = () => {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('admin')
      window.location.reload()
    }
  return (
    <header className='max-sm:mx-7 mx-2'>
      <nav className='flex justify-between items-center py-3'>
        <h1 className='text-2xl font-bold text-blue-900 italic'>Admin</h1>
        <button onClick={handleSignOut} className='bg-transparent border border-blue-950 px-4 py-1 rounded-md text-black uppercase font-medium hover:scale-[1.1] hover:border-blue-700 transition-all'>SignOut</button>
      </nav>
    </header>
  )
}

export default Header