import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import {
  IoPerson,
  IoLogOut,
  IoChevronDownSharp,
  IoBagAdd,
  IoBagSharp,
  IoReceiptOutline,
} from "react-icons/io5";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

function NavbarAdmin() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  return (
    <nav
      className="bg-zinc-700 my-3 flex justify-between 
        py-5 px-10 rounded-lg"
    >
      <Link to="/products">
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
                    navigate("/products");
                  }}
                >
                  <IoBagSharp size={30} className="fill-white/30" />
                  Listar
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
                  onClick={() => {
                    navigate("/add-product");
                  }}
                >
                  <IoBagAdd size={30} className="fill-white/30" />
                  Agregar
                </button>
              </MenuItem>
              <div className="my-1 h-px bg-white/5" />
              <MenuItem>
                <Link to="/" onClick={() => logOut()}>
                  <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                    <IoLogOut size={30} className="fill-white/30" />
                    Salir
                  </button>
                </Link>
              </MenuItem>
            </MenuItems>
          </Menu>
        </li>
        <li>
          <div className="ml-2">
            <Link className="flex items-center" to="/orders">
            Ordenes <IoReceiptOutline size={30} className="mt-2"/>
            </Link>
          </div>
        </li>
        <li className="ml-2 flex items-center">
          <IoPerson size={30} /> {user.username}
        </li>
      </ul>
    </nav>
  );
}

export default NavbarAdmin;
