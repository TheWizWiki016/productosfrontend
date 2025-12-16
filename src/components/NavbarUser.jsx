import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import {
  IoPerson,
  IoLogOutOutline,
  IoChevronDownSharp,
  IoAlbumsOutline,
  IoBagOutline,
  IoCartOutline,
  IoReceiptOutline,
} from "react-icons/io5";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Tooltip from "@mui/material/Tooltip";
import { useProducts } from "../context/ProductContext";

function NavbarUser() {
  const { user, logOut } = useAuth();
  const { getTotalProducts } = useProducts();
  const navigate = useNavigate();

  return (
    <div>
      <nav
        className="bg-zinc-700 my-3 flex justify-between 
        py-5 px-10 rounded-lg"
      >
        <Link to="/getallproducts">
          <h1 className="text-2xl font-bold">Productos</h1>
        </Link>
        <ul className="flex gap-x-2">
          <li>
            <Menu>
              <MenuButton className="inline-flex items-center gap-2 rounded-md bg-zinc-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700">
                Productos
                <IoChevronDownSharp size={30} className="fill-white/60" />
              </MenuButton>

              <MenuItems
                transition
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl border border-white/5 bg-zinc-700 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
              >
                <MenuItem>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
                    onClick={() => {
                      navigate("/getallproducts");
                    }}
                  >
                    <IoBagOutline size={30} className="fill-white/30" />
                    Listar
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
                    onClick={() => {
                      navigate("/orders");
                    }}
                  >
                    <IoReceiptOutline size={30} className="fill-white/30" />
                    Ordenes
                  </button>
                </MenuItem>
                <div className="my-1 h-1 bg-zinc-800" />
                <MenuItem>
                  <Link to="/" onClick={() => logOut()}>
                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                      <IoLogOutOutline size={30} className="fill-white/30" />
                      Salir
                    </button>
                  </Link>
                </MenuItem>
              </MenuItems>
            </Menu>
          </li>
          <li>
            <div className="relative">
              <Tooltip title="Carrito de compras">
                <button
                  className="flex bg-zinc-700 hover:bg-zinc-800
                                            text-white font-semibold rounded"
                >
                  <div className="relative">
                    <Link to={"/cart"}>
                      <IoCartOutline size={30} className="align-top m-2" />
                    </Link>
                    {getTotalProducts() > 0 && (
                      <span
                        className="absolute -top-2 right-4 inline-flex items-center
                                    justify-center w-5 h-5 text-xs font-semibold
                                    leading-none text-white bg-yellow-400 rounded-full
                                                            transform translate-x-1/4 "
                      >
                        {getTotalProducts()}
                      </span>
                    )}
                  </div>
                </button>
              </Tooltip>
            </div>
          </li>
          <li className="ml-2 flex items-center">
            <IoPerson size={30} /> {user.username}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavbarUser;
