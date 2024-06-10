import { NavLink } from 'react-router-dom'

function HeroSection({ title, subTitle, link, image }) {
  return (
    <section className="grid grid-cols-[1fr,1fr] h-[550px] px-[60px] bg-black text-white">
      <div className="flex items-center justify-center flex-col text-center">
        <h2 className="text-[45px] font-bold mb-[15px]">{title}</h2>
        <p className="text-2xl mb-8 w-[70%]">{subTitle}</p>
        <NavLink
          to={link}
          className="py-4 px-8 uppercase tracking-[1.5px] font-bold border-2 border-white rounded-[32px] bg-white text-black hover:bg-transparent hover:text-white ease-in-out duration-500"
        >
          Buy Now
        </NavLink>
      </div>
      <div className="flex items-center justify-center flex-col text-center">
        <img
          className="h-[500px] ease-in-out duration-500 hover:scale-105 cursor-pointer"
          src={image}
          alt=""
        />
      </div>
    </section>
  )
}
export default HeroSection
