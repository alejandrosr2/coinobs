import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

const MenuMobile = ({ menuCrypto }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            {/* Botón de hamburguesa */}
            {isOpen ? (
                <IoMdClose onClick={toggleMenu} className="cursor-pointer lg:hidden" />
            ) : (
                <RxHamburgerMenu onClick={toggleMenu} className="cursor-pointer lg:hidden" />
            )}
            {/* Menú desplegable */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-bgColor border shadow-lg transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out lg:hidden z-40`}
            >
                <ul className="p-4">
                    {menuCrypto.map((menu) => (
                        <li key={menu.href} className="py-2 hover:drop-shadow-[0_0_5px_hsl(120,50%,100%)]">
                            <Link to={menu.href} onClick={toggleMenu}>
                                {menu.label}
                            </Link>
                        </li>
                    ))}
                    <li className="py-2 hover:drop-shadow-[0_0_5px_hsl(120,50%,100%)]">
                        <Link to="/watchlist" onClick={toggleMenu} >
                            Watchlist
                        </Link>
                    </li>
                    <li className="py-2 hover:drop-shadow-[0_0_5px_hsl(120,50%,100%)]">
                        <Link to="/portfolio" onClick={toggleMenu} >
                            Portfolio
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MenuMobile;
