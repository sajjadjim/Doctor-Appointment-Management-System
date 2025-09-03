import React, { useEffect, useMemo, useState } from "react";
import {
  Menu,
  X,
  Home,
  Stethoscope,
  User,
  Mail,
  LogOut,
  LayoutDashboard,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../Hook/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "./style.css";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dbUser, setDbUser] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false); // <-- new state

  const toggleMenu = () => setIsOpen((s) => !s);
  const toggleDropdown = () => setDropdownOpen((s) => !s); // toggle dropdown

  const closeMenuOnMobile = () => {
    if (window.innerWidth < 768) setIsOpen(false);
  };

  const navItems = useMemo(
    () => [
      { label: "Home", to: "/", Icon: Home },
      { label: "Doctors", to: "/availableBootcamp", Icon: Stethoscope },
      { label: "About", to: "/about", Icon: User },
      { label: "Contact", to: "/contact", Icon: Mail },
    ],
    []
  );

  useEffect(() => {
    const accessToken = user?.accessToken;
    let isMounted = true;

    if (accessToken) {
      fetch("http://localhost:3000/users", {
        headers: { authorization: `Bearer ${accessToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (isMounted) setDbUser(data || []);
        })
        .catch((err) => console.error("Error fetching users:", err));
    } else {
      setDbUser([]);
    }

    return () => {
      isMounted = false;
    };
  }, [user]);

  const currentUser = useMemo(
    () => dbUser.find((u) => u.email === user?.email),
    [dbUser, user?.email]
  );

  const displayName = currentUser?.name || user?.displayName || "User";
  const avatar =
    currentUser?.image ||
    "https://cdn-icons-png.freepik.com/512/6858/6858485.png";

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully ✅");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="relative">
      <ToastContainer />
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/70 border-b border-black/5">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent"
              >
                Doctor Appointment <span className="opacity-75">System</span>
              </Link>
            </div>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-6">
              {navItems.map(({ label, to, Icon }) => (
                <li key={label}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      [
                        "group inline-flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors",
                        isActive
                          ? "text-indigo-600"
                          : "text-gray-700 hover:text-indigo-600",
                      ].join(" ")
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon size={18} />
                        <span className="relative">
                          {label}
                          <span
                            className={[
                              "absolute -bottom-1 left-0 h-0.5 w-full rounded-full transition-all",
                              isActive
                                ? "bg-indigo-600 scale-x-100"
                                : "bg-indigo-500/60 scale-x-0 group-hover:scale-x-100",
                            ].join(" ")}
                          />
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Right side actions */}
            <div className="flex items-center gap-3 relative">
              {user ? (
                <div className="hidden md:block relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-3 rounded-full border border-indigo-200/60 shadow-sm hover:shadow transition p-1 pr-3 bg-white/80"
                  >
                    <img
                      src={avatar}
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500/70"
                      title={`${displayName}\n${user?.email}`}
                    />
                    <div className="text-left hidden lg:block">
                      <p className="text-sm font-semibold leading-tight">
                        {displayName}
                      </p>
                      <p className="text-xs text-gray-500 leading-tight">
                        {user?.email}
                      </p>
                    </div>
                  </button>

                  {/* Controlled dropdown */}
                  {dropdownOpen && (
                    <ul className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-black/5 p-2 z-50">
                      <li className="px-2 py-2">
                        <p className="text-sm font-semibold text-indigo-600">
                          {displayName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </li>
                      <li>
                        <Link
                          to="/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm"
                        >
                          <LayoutDashboard size={16} /> Dashboard
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm"
                        >
                          <LayoutDashboard size={16} /> Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            handleLogOut();
                          }}
                          className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-sm text-red-600"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    to="/auth/login"
                    className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 bg-indigo-600 text-white shadow hover:bg-indigo-700 transition"
                  >
                    <LogIn size={16} />
                    Login
                  </Link>
                  <Link
                    to="/auth/register"
                    className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition shadow-sm"
                  >
                    <UserPlus size={16} />
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile toggle */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-lg hover:bg-black/5"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer code remains unchanged */}
        <div
          className={[
            "md:hidden overflow-hidden transition-[max-height,opacity] duration-500",
            isOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          {/* ...mobile menu content unchanged... */}
        </div>
      </nav>

      {/* spacer */}
      <div className="h-16" />
    </div>
  );
};

export default Navbar;
