// import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import { Fragment } from "react";

// import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import Logo from "./Logo";
// import FilterButton from "./FilterButton";
import { BiLogOut, BiMenu, BiSearch, BiUser, BiX, BiPackage } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../Features/authentication/useUser";
import { useLogout } from "../Features/authentication/useLogout";
// import { useCart } from "../Features/cart/useCart";
// import { useCart } from "../Features/cart/useCart";
import { getPlaceholder } from "../utils/helper";
import { useUnifiedCart } from "../Features/cart/useUnifiedCart";
import { useProductSearch } from "../Features/productFeatures/useSearchProduct";


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // for the search input
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const { user } = useUser();
  const { logout, isPending } = useLogout();
  const { cartCount: cartItemCount } = useUnifiedCart();

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Men", href: "/categories/men/products" },
    { name: "Women", href: "/categories/women/products" },
    { name: "Kiddies", href: "/categories/kiddies/products" },
    { name: "Vendors", href: "/vendors" },
    { name: "Journal", href: "/journals" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  // Debounce query input
  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(handler);
  }, [query]);

  // Fetch products based on debounced query
  // const { data: searchResults = [], isFetching } = useProductSearch(debouncedQuery);
  const { products: searchResults = [], isLoading: isFetching } = useProductSearch(debouncedQuery);
  console.log("searchResults", searchResults);
  console.log("isFetching", isFetching);


  const handleSelectProduct = (product) => {
    setShowDropdown(false);
    setQuery("");
    navigate(`/search?query=${product.name}`); // or `/product/${product.id}`
  };

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center">
              {/* Mobile Hamburger Menu */}
              <button
                onClick={toggleMobileMenu}
                className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-black focus:outline-none focus:ring-inset lg:hidden"
              >
                <BiMenu className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="mt-[3rem] ml-2 h-[100px] flex-shrink-0 lg:ml-0">
                <NavLink to="/" className="block">
                  <Logo />
                </NavLink>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:ml-10 lg:flex lg:space-x-8">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-gray-600 ${isActive
                        ? 'text-black font-semibold border-b-2 border-black'
                        : 'text-gray-900'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Desktop Search */}
              <div className="relative hidden md:block">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <BiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setShowDropdown(e.target.value.length > 0);
                    }}
                    placeholder="Search products..."
                    className="block w-64 rounded-full border border-gray-300 bg-gray-50 py-2 pr-3 pl-10 text-sm leading-5 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:ring-2 focus:ring-black focus:outline-none"
                  />

                  {/* Dropdown */}
                  {showDropdown && debouncedQuery && (
                    <div className="absolute top-full left-0 z-50 mt-2 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                      {isFetching ? (
                        <p className="p-3 text-sm text-gray-500">Searching...</p>
                      ) : (
                        <>

                          <button
                            onClick={() => {
                              setShowDropdown(false);
                              navigate(`/search?query=${debouncedQuery}`);
                            }}
                            className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-gray-100"
                          >
                            <BiSearch className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-800">
                              Search for "<strong>{debouncedQuery}</strong>"
                            </span>
                          </button>


                          {searchResults.length > 0 ? (
                            searchResults.slice(0, 6).map((product) => (
                              <button
                                key={product.id}
                                onClick={() => handleSelectProduct(product)}
                                className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left hover:bg-gray-100"
                              >
                                <div className="flex w-full items-start gap-2">
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm text-gray-800 break-words">
                                      {product.name}
                                    </p>
                                  </div>
                                  {/* Category name on the right */}
                                  {product.Category && (
                                    <div className="flex-shrink-0 pt-0.5">
                                      <span className="whitespace-nowrap text-xs text-gray-500">
                                        {product.Category.name.split(" ")[0] || product.Category}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </button>
                            ))
                          ) : (
                            <p className="p-3 text-sm text-gray-500">No products found</p>
                          )}
                        </>
                      )}
                    </div>
                  )}

                </div>
              </div>

              {/* Mobile Search Icon */}
              <button
                onClick={toggleSearch}
                className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-black focus:outline-none focus:ring-inset md:hidden"
              >
                <BiSearch className="h-6 w-6" />
              </button>

              {/* Shopping Cart */}
              <NavLink
                to="/cart"
                className="relative rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-black focus:outline-none focus:ring-inset"
              >
                <FaShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {cartItemCount}
                  </span>
                )}
              </NavLink>

              {/* User Account Dropdown */}
              {user ? (
                <div className="relative">
                  <HeadlessMenu>
                    {({ open }) => (
                      <>
                        <HeadlessMenu.Button className="flex items-center gap-2 rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-black focus:outline-none focus:ring-inset">
                          <img
                            src={
                              user?.profile_image ||
                              getPlaceholder(user.first_name, user.last_name)
                            }
                            alt={`${user.first_name} ${user.last_name}`}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          <span className="hidden sm:inline">{user.first_name}</span>
                        </HeadlessMenu.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <HeadlessMenu.Items
                            static
                            className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                          >
                            <div className="px-1 py-1">
                              <HeadlessMenu.Item>
                                {({ active }) => (
                                  <NavLink
                                    to="/settings"
                                    className={`${active ? 'bg-gray-100' : ''} group flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-900`}
                                  >
                                    <BiUser className="mr-3 h-5 w-5" />
                                    My Account
                                  </NavLink>
                                )}
                              </HeadlessMenu.Item>

                              <HeadlessMenu.Item>
                                {({ active }) => (
                                  <NavLink
                                    to="/settings/orders"
                                    className={`${active ? 'bg-gray-100' : ''} group flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-900`}
                                  >
                                    <BiPackage className="mr-3 h-5 w-5" />
                                    My Orders
                                  </NavLink>
                                )}
                              </HeadlessMenu.Item>

                              {/* Show dashboard link for admin/vendor roles */}
                              {(user.roles?.some(role => ['admin', 'vendor'].includes(role.name))) && (
                                <HeadlessMenu.Item>
                                  {({ active }) => {
                                    const isAdmin = user.roles?.some(role => role.name === 'admin');
                                    const dashboardRoute = isAdmin ? '/admin-dashboard' : '/vendor-dashboard';

                                    return (
                                      <NavLink
                                        to={dashboardRoute}
                                        className={`${active ? 'bg-gray-100' : ''} group flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-900`}
                                      >
                                        <MdDashboard className="mr-3 h-5 w-5" />
                                        {isAdmin ? 'Admin Dashboard' : 'Vendor Dashboard'}
                                      </NavLink>
                                    );
                                  }}
                                </HeadlessMenu.Item>
                              )}
                            </div>

                            <div className="px-1 py-1">
                              <HeadlessMenu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => logout()}
                                    disabled={isPending}
                                    className={`${active ? 'bg-gray-100' : ''} group flex w-full items-center rounded-md px-3 py-2 text-sm text-red-600 disabled:opacity-50`}
                                  >
                                    <BiLogOut className="mr-3 h-5 w-5" />
                                    {isPending ? 'Logging out...' : 'Logout'}
                                  </button>
                                )}
                              </HeadlessMenu.Item>
                            </div>
                          </HeadlessMenu.Items>
                        </Transition>
                      </>
                    )}
                  </HeadlessMenu>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="flex items-center gap-2 rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-black focus:outline-none focus:ring-inset"
                >
                  <BiUser className="h-6 w-6 flex-shrink-0" />
                </NavLink>
              )}
            </div>
          </div>

          {/* Mobile Search Expanded */}
          {isSearchExpanded && (
            <div className="pb-4 md:hidden">
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <BiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowDropdown(e.target.value.length > 0);
                  }}
                  placeholder="Search products..."
                  className="block w-full rounded-full border border-gray-300 bg-gray-50 py-2 pr-3 pl-10 text-sm leading-5 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:ring-2 focus:ring-black focus:outline-none"
                  autoFocus
                />

                {/* Mobile Search Dropdown */}
                {showDropdown && debouncedQuery && (
                  <div className="absolute left-0 right-0 z-50 mt-2 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                    {isFetching ? (
                      <p className="p-3 text-sm text-gray-500">Searching...</p>
                    ) : (
                      <>
                        {/* Search term suggestion */}
                        <button
                          onClick={() => {
                            setShowDropdown(false);
                            navigate(`/search?query=${debouncedQuery}`);
                            setIsSearchExpanded(false);
                          }}
                          className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-gray-100"
                        >
                          <BiSearch className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-800">
                            Search for "<strong>{debouncedQuery}</strong>"
                          </span>
                        </button>

                        {/* Product suggestions */}
                        {searchResults.length > 0 ? (
                          searchResults.slice(0, 6).map((product) => (
                            <button
                              key={product.id}
                              onClick={() => {
                                handleSelectProduct(product);
                                setIsSearchExpanded(false);
                              }}
                              className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left hover:bg-gray-100"
                            >
                              <div className="flex w-full items-start gap-2">
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-gray-800 break-words">
                                    {product.name}
                                  </p>
                                </div>
                                {product.Category && (
                                  <div className="flex-shrink-0 pt-0.5">
                                    <span className="whitespace-nowrap text-xs text-gray-500">
                                      {product.Category.name.split(" ")[0] || product.Category}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </button>
                          ))
                        ) : (
                          <p className="p-3 text-sm text-gray-500">No products found</p>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${isMobileMenuOpen ? "" : "pointer-events-none"}`}
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? "opacity-50" : "opacity-0"
            }`}
          onClick={toggleMobileMenu}
        />

        {/* Drawer */}
        <div
          className={`fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] transform bg-white shadow-xl transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <h2 className="text-xl font-bold text-black">Menu</h2>
            {/* <Logo /> */}
            <button
              onClick={toggleMobileMenu}
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <BiX className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1 px-4 py-6">
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `block rounded-md px-4 py-3 text-base font-medium transition-colors duration-200 hover:bg-gray-100 ${isActive ? 'text-black font-semibold' : 'text-gray-900'
                  }`
                }
                onClick={toggleMobileMenu}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Drawer Footer */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <NavLink
                to="/cart"
                onClick={toggleMobileMenu}
                className="flex items-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <FaShoppingCart className="mr-2 h-5 w-5" />
                Cart ({cartItemCount > 0 ? cartItemCount : 0})
              </NavLink>
              <button className="flex items-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                <BiUser className="mr-2 h-5 w-5" />
                Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Bar (shown only on product pages) */}
      {/* Should be displayed base on condition */}
      {/* <FilterButton /> */}
    </>
  );
};

export default Header;