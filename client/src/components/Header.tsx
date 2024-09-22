import { Globe, Menu, MessageSquare, Search, User } from "react-feather";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

export default function Header() {
  return (
    <header className="max-w-[1480px] min-w-full px-10 py-4 m-auto fixed top-0 z-50 backdrop-filter backdrop-blur-3xl bg-white/50">
      <div className="flex justify-between items-center relative">
        <div className="w-16">
          <a href="/">
            <img src="/100khana.png" alt="Our logo" className="w-full" />
          </a>
        </div>
        <div
          className="flex items-center border-2 border-gray-200 rounded-3xl shadow-md absolute top-1/2 left-1/2 overflow-hidden"
          style={{ transform: `translate(-50%, -50%)` }}
        >
          <form className="hidden">
            <input type="text" />
            <button type="submit">
              <Search className="w-5 h-5 text-xs text-red-400" />
            </button>
          </form>
          <div className="border-l-2 cursor-pointer hover:bg-gray-200 py-2 px-4">
            AnyWhere
          </div>
          <div className="border-l-2 cursor-pointer hover:bg-gray-200 py-2 px-4">
            Any week
          </div>
          <div className="border-l-2 cursor-pointer hover:bg-gray-200 py-2 px-4">
            Add guests
          </div>
          <div className="text-xs cursor-pointer bg-red-400 p-1 rounded-full text-white">
            <Search className="w-5 h-5 text-xs" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div>Add your home</div>
            <div className="mx-2">
              <Globe />
            </div>
          </div>
          <Dropdown
            icon={<Menu />}
            buttonText={
              <span className="bg-slate-500 rounded-full overflow-hidden text-white ring-slate-500 ring-2">
                <User />
              </span>
            }
            className="rounded-3xl"
          >
            <Link
              to="/profile/me"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 duration-150"
            >
              <span>
                <User />
              </span>
              <span>Profile</span>
            </Link>
            <Link
              to="/profile/me"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 duration-150"
            >
              <span>
                <MessageSquare />
              </span>
              <span>Messages</span>
            </Link>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
