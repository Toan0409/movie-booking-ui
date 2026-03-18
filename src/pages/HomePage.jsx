import { Link } from 'react-router-dom';
import { Star, Ticket, Play, ChevronLeft, ChevronRight, MapPin, Navigation, ArrowRight, Calendar } from 'lucide-react';
import { useNowShowing, useComingSoon, useFeaturedMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';

const HomePage = () => {
  // Fetch movies from API
  const { movies: nowShowingMovies, loading: nowShowingLoading, error: nowShowingError } = useNowShowing();
  const { movies: comingSoonMovies, loading: comingSoonLoading, error: comingSoonError } = useComingSoon();
  const { movies: featuredMovies, loading: featuredLoading, error: featuredError } = useFeaturedMovies();

  // Featured movie (first one or default)
  const featuredMovie = featuredMovies && featuredMovies.length > 0 ? featuredMovies[0] : null;

  // Default hero data
  const heroTitle = featuredMovie?.title || 'Beyond the Stars';
  const heroDescription = featuredMovie?.description || 'Hành trình vượt qua giới hạn của vũ trụ. Trải nghiệm journey đầy mê hoặc định nghĩa lại việc du hành vũ trụ với độ nét cao nhất.';
  const heroImage = featuredMovie?.backdropUrl || featuredMovie?.backgroundUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy0WjybJApHP9qn1VP0VY5gh493kdYPw7VFlz_8eY_Ii9JT8_G4vC1LZ5X1246Se5aGjMBMCL55pCOgwRkdmc7nH3XPxhKf1tAXtCnw4qcC0PzmiN8FRG-hHHjgjrRcHqMhve-qEyWy2e-QN0X-E4HGScAlXX8-2-oNIfdJO0ZZ5XWa_Ry1cLX7Q0h03FkUl0ClF1IERp54eiuVkRQsejd00ZBdBbWPoSeGSsEEYazEwYycw06DGvw9mv_pCT2lCN4yaQt-dAh-OI';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full aspect-[21/9] min-h-[500px] flex items-end">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-transparent to-transparent z-10"></div>
          <img
            className="w-full h-full object-cover"
            data-alt="Epic cinematic movie background"
            src={heroImage}
            alt="Hero background"
          />
        </div>
        <div className="relative z-20 px-6 md:px-20 pb-16 max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            {featuredMovie?.status === 'COMING_SOON' ? (
              <span className="bg-accent text-background-dark text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Sắp chiếu</span>
            ) : (
              <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Đang chiếu</span>
            )}
            <span className="bg-accent text-background-dark text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">IMAX Đặc biệt</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight uppercase italic tracking-tighter">
            {heroTitle}
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl line-clamp-3">
            {heroDescription}
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-xl shadow-primary/30">
              <Ticket className="w-5 h-5" />
              Đặt vé ngay
            </button>
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md font-bold py-4 px-8 rounded-xl transition-all border border-white/10">
              <Play className="w-5 h-5" />
              Xem trailer
            </button>
          </div>
        </div>
        <div className="absolute right-20 bottom-16 hidden lg:flex gap-2">
          <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 text-white transition-all">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 text-white transition-all">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Now Showing Section */}
      <section className="px-6 md:px-20 py-16 max-w-[1440px] mx-auto">
        {nowShowingLoading ? (
          // Loading skeleton
          <div>
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="h-9 w-48 bg-slate-800 rounded mb-2"></div>
                <div className="h-5 w-64 bg-slate-800 rounded"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-[2/3] rounded-xl bg-slate-800 mb-4"></div>
                  <div className="h-5 bg-slate-800 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        ) : nowShowingError ? (
          // Error state
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
            <p className="text-red-400">{nowShowingError}</p>
          </div>
        ) : nowShowingMovies && nowShowingMovies.length > 0 ? (
          // Movies grid
          <div>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h3 className="text-3xl font-black uppercase italic text-white">Đang chiếu</h3>
                <p className="text-slate-400">Xem những bộ phim hot nhất trong rạp</p>
              </div>
              <Link to="/movies" className="text-primary font-bold hover:underline flex items-center gap-1">
                Xem tất cả <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {nowShowingMovies.slice(0, 5).map((movie) => (
                <MovieCard key={movie.movieId} movie={movie} />
              ))}
            </div>
          </div>
        ) : (
          // Empty state
          <div>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h3 className="text-3xl font-black uppercase italic text-white">Đang chiếu</h3>
                <p className="text-slate-400">Xem những bộ phim hot nhất trong rạp</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <p className="text-slate-400">Không có phim đang chiếu</p>
            </div>
          </div>
        )}
      </section>

      {/* Coming Soon Section */}
      <section className="bg-primary/5 py-16 border-y border-white/5">
        <div className="px-6 md:px-20 max-w-[1440px] mx-auto">
          {comingSoonLoading ? (
            // Loading skeleton
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="h-8 w-32 bg-slate-800 rounded"></div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-slate-800 rounded-lg"></div>
                  <div className="w-8 h-8 bg-slate-800 rounded-lg"></div>
                </div>
              </div>
              <div className="flex gap-6 overflow-x-auto pb-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="min-w-[300px] bg-slate-800/50 p-4 rounded-xl">
                    <div className="flex gap-4">
                      <div className="w-24 aspect-[2/3] bg-slate-700 rounded-lg shrink-0"></div>
                      <div className="flex flex-col justify-center">
                        <div className="h-3 w-16 bg-slate-700 rounded mb-2"></div>
                        <div className="h-5 w-32 bg-slate-700 rounded mb-2"></div>
                        <div className="h-4 w-20 bg-slate-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : comingSoonError ? (
            // Error state
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
              <p className="text-red-400">{comingSoonError}</p>
            </div>
          ) : comingSoonMovies && comingSoonMovies.length > 0 ? (
            // Movies list
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black uppercase italic text-white flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-primary" />
                  Sắp chiếu
                </h3>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/5 text-white transition-all">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/5 text-white transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {comingSoonMovies.map((movie) => (
                  <Link
                    key={movie.movieId}
                    to={`/movies/${movie.movieId}`}
                    className="min-w-[300px] flex gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-primary/30 transition-all cursor-pointer"
                  >
                    <div className="w-24 aspect-[2/3] rounded-lg overflow-hidden shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        src={movie.poster || movie.posterUrl}
                        alt={movie.title}
                        onError={(e) => {
                          e.target.src = 'https://placehold.jp/150x150.png';
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">
                        {movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }) : 'N/A'}
                      </p>
                      <h4 className="text-white font-bold text-lg leading-tight mb-2">{movie.originalTitle}</h4>
                      <div className="flex gap-2 items-center text-xs text-slate-400">
                        <span className="bg-white/10 px-1.5 py-0.5 rounded">{movie.ageRating || 'P'}</span>
                        <span>
                          {movie.genre?.name || movie.genres?.[0]?.name || 'Phim'}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            // Empty state
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black uppercase italic text-white flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-primary" />
                  Sắp chiếu
                </h3>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <p className="text-slate-400">Không có phim sắp chiếu</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Cinema Location Section */}
      <section className="px-6 md:px-20 py-20 max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8PJ5Me060fbr9BRz91qiKe-9rMdV9CsJxCV9laHS3IKyLqDZvTWPJe7_Mnx12nBgW4GKFzUqv8wVsq0yH9y9fURR3qK_uco0XKmCtYalTtwHWYdM3uFrMD8eowesX3tMGr49zwMbjBdr_dWNTOE6vUnhFEQ9rc6N56VxNXzwvwL-39qjSk-i7YM29gdr_fnMkKW5jXodp1in6GZgwI-OiouWQDkFtVRv8GRBTqxM2RWxG8Rj-23AC5No5HYRvfdYkMA79wVHsA4w" alt="Cinema interior" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div>
                <h5 className="text-white font-bold text-xl">Westside Cinema Complex</h5>
                <p className="text-slate-300 text-sm">Cách bạn 7.2 km</p>
              </div>
              <button className="bg-white text-background-dark font-bold py-2 px-4 rounded-lg text-sm flex items-center gap-2">
                <Navigation className="w-4 h-4" />
                Chỉ đường
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-black uppercase italic text-white mb-6">Tìm rạp chiếu gần bạn</h3>
            <p className="text-slate-400 mb-8 text-lg">
              Chọn địa điểm ưa thích để xem lịch chiếu và các suất chiếu đặc biệt. Chúng tôi có 45 địa điểm trên toàn quốc với công nghệ Dolby Atmos và IMAX.
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between hover:border-primary transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-bold">City Center Mall</p>
                    <p className="text-xs text-slate-500">3.4 km • 14 Màn hình • IMAX</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-primary" />
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between hover:border-primary transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-bold">River District Cinema</p>
                    <p className="text-xs text-slate-500">6.1 km • 8 Màn hình • 4DX</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-primary" />
              </div>

              <button className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-slate-400 font-bold hover:border-primary/50 hover:text-white transition-all">
                Xem thêm địa điểm
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

