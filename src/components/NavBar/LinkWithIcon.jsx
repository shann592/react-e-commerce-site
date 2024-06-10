import { NavLink } from 'react-router-dom'

function LinkWithIcon({ linkTitle, link, emoji, isSidebar = false }) {
  return (
    <NavLink
      to={link}
      className={`m-4 flex items-center font-medium cursor-pointer ${
        isSidebar &&
        'flex-row-reverse justify-end text-xl py-5 px-4 rounded-[5px] ease-in-out duration-700 hover:bg-[#f6f6f6]'
      }`}
    >
      {linkTitle}{' '}
      <img
        src={emoji}
        alt="home icon"
        className={`w-6 ml-1 ${isSidebar && 'w-7 ml-0'}`}
      />
    </NavLink>
  )
}
export default LinkWithIcon
