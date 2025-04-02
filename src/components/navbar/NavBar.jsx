
import { useState } from "react";
import { FiHeart, FiStar } from "react-icons/fi"
import { SiBitcoinsv } from "react-icons/si"
import { Link, useLocation } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";
import MenuMobile from "./MenuMobile";

const menuCrypto = [
    { href: "/", label: "Top 100"},
    { href: "/calculator", label: "POS Calculator"},
    { href: "/compare", label: "Compare Coins"}
]

const NavBar = () => {

    const [isCryptoOpen, setIsCryptoOpen] = useState(false);
    const { setSearchTerm } = useSearch();
    const location = useLocation();

    return (
        <div className="lg:mx-auto lg:p-8 lg:max-w-screen-2xl py-4">
            <div className="flex lg:gap-10 items-center justify-between">
                <div className="flex gap-10 items-center">
                    <h1 className="text-[hsl(190,100%,45%)] font-extrabold text-3xl drop-shadow-[0_0_5px_hsl(180,50%,30%)] hover:scale-105 duration-300">
                        <Link to={"/"}>COINOBS</Link>
                    </h1>
                    <ul className="lg:flex gap-5 items-center hidden">
                        <li 
                            className="relative flex items-center gap-1 hover:cursor-pointer py-2" 
                            onMouseEnter={() => setIsCryptoOpen(true)} 
                            onMouseLeave={() => setIsCryptoOpen(false)}
                        >
                            Cryptocurrencies<SiBitcoinsv />
                            {isCryptoOpen && (
                                <ul className="absolute left-0 top-full  bg-[#242424] min-w-36 border rounded-md px-4 py-2 z-40 ">
                                    {menuCrypto.map((menu) => (
                                        <li key={menu.href} className="py-1 hover:drop-shadow-[0_0_5px_hsl(120,50%,100%)]">
                                            <Link to={menu.href}>{menu.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <li>
                            <Link to={"/watchlist"} className="relative flex items-center gap-1 hover:cursor-pointer py-2">
                                Watchlist<FiHeart className="text-red-500 fill-current" />
                            </Link>
                        </li>
                        <li>
                            <Link to={"/portfolio"} className="relative flex items-center gap-1 hover:cursor-pointer py-2">
                                Portfolio<FiStar className="text-yellow-500 fill-current"/>
                            </Link>
                        </li>
                    </ul>
                </div>
                {location.pathname === "/" && (
                    <div className="items-center lg:flex hidden">
                        <input 
                            className="border border-gray-300/20 rounded bg-bgColor p-1"
                            type="text"
                            name="search"
                            placeholder="Search coins..."
                            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                        />
                    </div>
                )}
                {/* Menú móvil */}
                <div className="lg:hidden">
                    <MenuMobile menuCrypto={menuCrypto} />
                </div>
            </div>
        </div>
    )
}

export default NavBar
