import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, User, Menu, X, Home, Film, Tv, TrendingUp, List, SlidersHorizontal, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onSearch: (query: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onToggleFilters?: () => void;
  isFilterOpen?: boolean;
  hasActiveFilters?: boolean;
}


export const Navbar: React.FC<NavbarProps> = ({ 
  onSearch, 
  activeTab, 
  setActiveTab,
  onToggleFilters,
  isFilterOpen,
  hasActiveFilters 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useTheme();
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'tv', label: 'TV Shows', icon: Tv },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'mylist', label: 'My List', icon: List },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      onSearch(query);
    }, 250);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-12 py-3.5 flex items-center justify-between',
        isScrolled 
          ? 'bg-zinc-950/90 dark:bg-black/90 backdrop-blur-md shadow-xl border-b border-zinc-800/50' 
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
      )}
    >
      <div className="flex items-center gap-6 md:gap-8">
        <h1 
          className="text-red-600 text-2xl md:text-3xl font-black tracking-tighter cursor-pointer flex items-center gap-1 select-none hover:opacity-90 transition-opacity"
          onClick={() => setActiveTab('home')}
        >
          CINESTREAM
        </h1>
        
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                'text-sm font-medium transition-colors hover:text-red-500 min-h-[40px] px-1 flex items-center',
                activeTab === item.id ? 'text-red-600 font-bold border-b-2 border-red-600' : 'text-gray-300'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Search Input Bar */}
        <div className="relative hidden sm:flex items-center">
          <Search className="absolute left-3 text-gray-400 w-4 h-4 pointer-events-none" />
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-zinc-900/80 border border-zinc-800 rounded-full py-2 pl-9 pr-8 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 w-40 lg:w-60 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                onSearch('');
              }}
              aria-label="Clear search"
              className="absolute right-2.5 text-gray-400 hover:text-white text-xs p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Toggle Button */}
        {onToggleFilters && (
          <button
            onClick={onToggleFilters}
            aria-label="Toggle Filter Panel"
            className={cn(
              'relative p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full border transition-colors',
              isFilterOpen || hasActiveFilters
                ? 'bg-red-600 text-white border-red-500 shadow-md'
                : 'bg-zinc-900/80 text-gray-300 border-zinc-800 hover:bg-zinc-800 hover:text-white'
            )}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full ring-2 ring-black" />
            )}
          </button>
        )}

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full bg-zinc-900/80 text-gray-300 border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
        </button>

        <button 
          aria-label="Notifications"
          className="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center text-gray-300 hover:text-white transition-colors rounded-full hover:bg-zinc-800/60"
        >
          <Bell className="w-4 h-4" />
        </button>

        {/* User Profile Menu */}
        <div className="relative group">
          <button 
            aria-label="User profile"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
              <User className="w-4 h-4" />
            </div>
          </button>
          
          <div className="absolute right-0 top-full mt-2 w-52 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 z-50">
            <div className="px-4 py-2 border-b border-zinc-800">
              <p className="text-xs font-bold text-white">CineStream User</p>
              <p className="text-[10px] text-gray-400">Premium Subscriber</p>
            </div>
            
            <button 
              onClick={toggleTheme} 
              className="w-full text-left px-4 py-2.5 text-xs text-gray-300 hover:bg-zinc-800 hover:text-white flex items-center justify-between"
            >
              <span>Theme</span>
              <span className="text-[10px] font-bold uppercase bg-zinc-800 px-2 py-0.5 rounded text-gray-400">
                {theme}
              </span>
            </button>
            <button className="w-full text-left px-4 py-2.5 text-xs text-gray-300 hover:bg-zinc-800 hover:text-white">Profile</button>
            <button className="w-full text-left px-4 py-2.5 text-xs text-gray-300 hover:bg-zinc-800 hover:text-white">Settings</button>
            <div className="h-px bg-zinc-800 my-1" />
            <button className="w-full text-left px-4 py-2.5 text-xs text-red-500 font-bold hover:bg-zinc-800">Sign Out</button>
          </div>
        </div>

        {/* Mobile Menu Hamburger */}
        <button 
          className="lg:hidden p-2 text-gray-300 min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label="Toggle mobile navigation menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-zinc-950/95 backdrop-blur-2xl border-t border-zinc-800 p-6 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              <div className="relative sm:hidden mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="bg-zinc-900 border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-sm w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    'flex items-center gap-3 text-base font-semibold py-2.5 px-3 rounded-lg min-h-[44px] transition-colors',
                    activeTab === item.id ? 'bg-red-600/10 text-red-600 font-bold' : 'text-gray-300 hover:bg-zinc-900'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}

              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">Appearance</span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 text-xs text-gray-300"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
                  <span className="capitalize">{theme} Mode</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

