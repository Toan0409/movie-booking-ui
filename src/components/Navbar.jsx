import { Link, useLocation } from 'react-router-dom';
import { Film, MapPin, User, LogIn, Search } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background-dark/80 backdrop-blur-md px-6 md:px-20 py-4">
            <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-12">
                    <Link to="/" className="flex items-center gap-2 text-primary">
                        <Film className="w-10 h-10" />
                        <h1 className="text-2xl font-black tracking-tighter uppercase italic">
                            Cinema<span className="text-white">Booking</span>
                        </h1>
                    </Link>

                    {/* Navigation Menu */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <Link
                            to="/"
                            className={`font-medium transition-colors ${isActive('/') ? 'text-primary' : 'text-slate-100 hover:text-primary'
                                }`}
                        >
                            Trang chủ
                        </Link>
                        <Link
                            to="/movies"
                            className={`font-medium transition-colors ${isActive('/movies') ? 'text-primary' : 'text-slate-100 hover:text-primary'
                                }`}
                        >
                            Phim
                        </Link>
                        <Link
                            to="/showtimes"
                            className={`font-medium transition-colors ${isActive('/showtimes') ? 'text-primary' : 'text-slate-100 hover:text-primary'
                                }`}
                        >
                            Lịch chiếu
                        </Link>
                    </nav>
                </div>

                {/* Right Side - Search & Auth */}
                <div className="flex items-center gap-4 flex-1 justify-end max-w-xl">
                    {/* Search */}
                    <div className="relative w-full max-w-xs hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm text-white placeholder-slate-400"
                            placeholder="Tìm kiếm phim..."
                            type="text"
                        />
                    </div>

                    {/* Location Button */}
                    <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 transition-all text-white">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium hidden md:inline">Hà Nội</span>
                    </button>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-2">
                        <Link
                            to="/login"
                            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 transition-all text-white font-medium text-sm"
                        >
                            <User className="w-4 h-4" />
                            Đăng nhập
                        </Link>
                        <Link
                            to="/register"
                            className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-full text-sm transition-transform active:scale-95 shadow-lg shadow-primary/20 flex items-center gap-2"
                        >
                            <LogIn className="w-4 h-4" />
                            Đăng ký
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

