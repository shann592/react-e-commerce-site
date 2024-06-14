import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { rocket, star, idButton, memo, order, lock } from "../../assets";
import LinkWithIcon from "./LinkWithIcon";
import UserContext from "../../contexts/userContext";
import { useContext } from "react";
import CartContext from "../../contexts/cartContext";
import { getSuggestionsAPI } from "../../services/productServices";

function NavBar() {
  const [search, setSearch] = useState("");
  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
    setSuggestions([]);
  };

  useEffect(() => {
    const delaySuggestions = setTimeout(() => {
      if (search.trim() !== "") {
        getSuggestionsAPI(search)
          .then((res) => setSuggestions(res.data))
          .catch((err) => console.log(err));
      }
    }, 300);
    return () => clearTimeout(delaySuggestions);
  }, [search]);

  const handleKeyDown = (e) => {
    if (selectedItem < suggestions.length) {
      if (e.key === "ArrowDown") {
        setSelectedItem((prev) =>
          prev === suggestions.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === "ArrowUp") {
        setSelectedItem((prev) =>
          prev === 0 ? suggestions.length - 1 : prev - 1
        );
      } else if (e.key === "Enter" && selectedItem > -1) {
        // navigate(`/products?search=${suggestions[selectedItem]}`);
        navigate(`/products?search=${suggestions[selectedItem].title}`);
        setSuggestions([]);
        setSearch("");
      }
    } else {
      setSelectedItem(-1);
    }
  };

  return (
    <nav className="flex items-center justify-between py-10 px-5 bg-white">
      <section className="flex items-center">
        <h1 className="text-3xl mr-5 font-bold">E-Comm-Site</h1>
        <form
          onSubmit={handleSubmit}
          className="flex items-center w-450px h-40px border-[1px] border-[#cdcdcd] rounded-[5px] p-1 relative"
        >
          <input
            type="text"
            className="flex-1 h-full py-0 px-2 text-lg font-medium border-none outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="h-full px-2 text-lg font-medium border-none rounded-[5px] bg-[#6457f9] text-white cursor-pointer"
            type="submit"
          >
            Search
          </button>
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full mt-2 border-2 border-[#cdcdcd] rounded-md bg-white z-50 *:flex">
              {suggestions.map((s, idx) => (
                <li
                  key={s._id}
                  className={`*:w-full *:py-2 *:px-5 *:text-lg *:cursor-pointer *:hover:bg-[#e3e3e3] *:duration-700 *:ease-in-out ${
                    idx === selectedItem && "bg-[#e3e3e3]"
                  }`}
                >
                  <Link
                    to={`/products?search=${s.title}`}
                    onClick={() => {
                      setSearch("");
                      setSuggestions([]);
                    }}
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </form>
      </section>
      <section className="flex items-center text-lg">
        <LinkWithIcon linkTitle="Home" emoji={rocket} link="/" />
        <LinkWithIcon linkTitle="Products" emoji={star} link="/products" />
        {!user && (
          <>
            <LinkWithIcon linkTitle="LogIn" emoji={idButton} link="/login" />
            <LinkWithIcon linkTitle="SignUp" emoji={memo} link="/signup" />
          </>
        )}
        {user && (
          <>
            {" "}
            <LinkWithIcon
              linkTitle="My Orders"
              emoji={order}
              link="/myorders"
            />
            <LinkWithIcon linkTitle="LogOut" emoji={lock} link="/logout" />
            <NavLink to="/cart" className="flex items-center">
              Cart{" "}
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#6457f9] text-white text-lg font-bold ml-1">
                {cart.length}
              </span>
            </NavLink>
          </>
        )}
      </section>
    </nav>
  );
}
export default NavBar;
