import { useParams, Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useMovieById } from '../hooks/useMovies';

const MovieDetailPage = () => {

    const normalizeMovie = (movie) => {
        return {
            ...movie,

            directorName:
                typeof movie.director === 'object'
                    ? movie.director?.name
                    : movie.director || 'Đang cập nhật',

            castNames: Array.isArray(movie.actors)
                ? movie.actors.map(a => a.name)
                : [],

            genreNames: Array.isArray(movie.genres)
                ? movie.genres.map(g => g.name)
                : [],
        };
    };
    const { id } = useParams();
    const { movie, loading, error, refetch } = useMovieById(id);

    // Format duration
    const formatDuration = (minutes) => {
        if (!minutes) return '';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
            return mins > 0 ? `${hours}h ${mins}p` : `${hours}h`;
        }
        return `${mins} phút`;
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    // Handle image error
    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/400x600?text=No+Poster';
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen py-20 px-6 md:px-20">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 mb-12 animate-pulse">
                        <div className="md:col-span-1">
                            <div className="aspect-[2/3] rounded-xl bg-slate-800"></div>
                        </div>
                        <div className="md:col-span-2">
                            <div className="h-8 bg-slate-800 rounded w-32 mb-4"></div>
                            <div className="h-12 bg-slate-800 rounded w-3/4 mb-4"></div>
                            <div className="h-6 bg-slate-800 rounded w-1/2 mb-6"></div>
                            <div className="h-20 bg-slate-800 rounded w-full mb-8"></div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="h-20 bg-slate-800 rounded"></div>
                                <div className="h-20 bg-slate-800 rounded"></div>
                                <div className="h-20 bg-slate-800 rounded"></div>
                                <div className="h-20 bg-slate-800 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen py-20 px-6 md:px-20">
                <div className="max-w-[1200px] mx-auto">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
                        <p className="text-red-400 text-lg mb-4">{error}</p>
                        <button
                            onClick={refetch}
                            className="bg-primary text-white font-bold py-2 px-6 rounded-lg"
                        >
                            Thử lại
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // No movie found
    if (!movie) {
        return (
            <div className="min-h-screen py-20 px-6 md:px-20">
                <div className="max-w-[1200px] mx-auto">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                        <p className="text-white text-lg">Không tìm thấy phim</p>
                        <Link to="/" className="text-primary font-bold hover:underline mt-4 inline-block">
                            Quay về trang chủ
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Extract movie properties with fallbacks
    const normalizedMovie = normalizeMovie(movie);

    const title = normalizedMovie.title || 'Unknown Title';
    const director = normalizedMovie.directorName;
    const cast = normalizedMovie.castNames;
    const genres = normalizedMovie.genreNames;
    const poster = movie.poster || movie.posterUrl || '';
    const backdrop = movie.backdropUrl || movie.backgroundUrl || poster;
    const description = movie.description || movie.synopsis || 'Không có mô tả';
    const rating = movie.rating || movie.averageRating || 0;
    const duration = movie.duration || movie.runtime || 0;
    const releaseDate = movie.releaseDate || movie.release_date || '';
    const status = movie.status || 'NOW_SHOWING';
    const ageRating = movie.ageRating || movie.rating || 'P';
    const trailerUrl = movie.trailerUrl || movie.trailer || '';

    return (
        <div className="min-h-screen">
            {/* Movie Hero with backdrop */}
            <div className="relative w-full h-[60vh] min-h-[400px]">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-transparent to-transparent z-10"></div>
                    {backdrop ? (
                        <img
                            className="w-full h-full object-cover"
                            src={backdrop}
                            alt={title}
                            onError={handleImageError}
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-800"></div>
                    )}
                </div>
            </div>

            {/* Movie Info */}
            <div className="max-w-[1200px] mx-auto px-6 md:px-20 -mt-32 relative z-20">
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {/* Poster */}
                    <div className="md:col-span-1">
                        <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl">
                            {poster ? (
                                <img
                                    className="w-full h-full object-cover"
                                    src={poster}
                                    alt={title}
                                    onError={handleImageError}
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                    <span className="text-slate-500">No Poster</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            {status === 'COMING_SOON' ? (
                                <span className="bg-accent text-background-dark text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Sắp chiếu</span>
                            ) : (
                                <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Đang chiếu</span>
                            )}
                            <span className="bg-slate-700 text-white text-xs font-bold px-2 py-1 rounded">{ageRating}</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase italic">{title}</h1>

                        <div className="flex items-center gap-4 text-slate-400 mb-6 flex-wrap">
                            <span className="flex items-center gap-1">
                                <Star className="w-5 h-5 text-accent fill-accent" />
                                <span className="text-white font-bold">{typeof rating === 'number' ? rating.toFixed(1) : rating}</span>
                            </span>
                            {duration > 0 && <span>{formatDuration(duration)}</span>}
                            {genres.length > 0 && (
                                <span>{Array.isArray(genres) ? genres.join(', ') : genres}</span>
                            )}
                        </div>

                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            {description}
                        </p>

                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <p className="text-slate-500 text-sm mb-1">Đạo diễn</p>
                                <p className="text-white font-medium">{movie.director?.name}</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <p className="text-slate-500 text-sm mb-1">Diễn viên</p>
                                <p className="text-white font-medium">{Array.isArray(cast) ? cast.join(', ') : cast}</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <p className="text-slate-500 text-sm mb-1">Khởi chiếu</p>
                                <p className="text-white font-medium">{formatDate(releaseDate) || 'Đang cập nhật'}</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <p className="text-slate-500 text-sm mb-1">Thể loại</p>
                                <p className="text-white font-medium">{movie.genre?.name || movie.genres?.[0]?.name || 'Phim'}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {status !== 'COMING_SOON' && (
                                <Link
                                    to={`/showtimes/${id}`}
                                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-xl shadow-primary/30"
                                >
                                    <span>Đặt vé ngay</span>
                                </Link>
                            )}
                            {trailerUrl && (
                                <a
                                    href={trailerUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md font-bold py-4 px-8 rounded-xl transition-all border border-white/10"
                                >
                                    <span>Xem trailer</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Showtimes - Only show if movie is currently showing */}
                {status !== 'COMING_SOON' && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-black text-white mb-6">Lịch chiếu</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Link to={`/showtimes/${id}`} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-primary transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-white font-bold">City Center Mall</span>
                                    <span className="text-primary text-sm">IMAX</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-primary/20 text-primary px-3 py-1 rounded text-sm">10:30</span>
                                    <span className="bg-white/10 text-white px-3 py-1 rounded text-sm">13:00</span>
                                    <span className="bg-white/10 text-white px-3 py-1 rounded text-sm">15:30</span>
                                    <span className="bg-white/10 text-white px-3 py-1 rounded text-sm">18:00</span>
                                    <span className="bg-white/10 text-white px-3 py-1 rounded text-sm">21:00</span>
                                </div>
                            </Link>

                            <Link to={`/showtimes/${id}`} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-primary transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-white font-bold">River District</span>
                                    <span className="text-accent text-sm">4DX</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-primary/20 text-primary px-3 py-1 rounded text-sm">11:00</span>
                                    <span className="bg-white/10 text-white px-3 py-1 rounded text-sm">14:00</span>
                                    <span className="bg-white/10 text-white px-3 py-1 rounded text-sm">17:00</span>
                                    <span className="bg-white/10 text-white px-3 py-1 rounded text-sm">20:00</span>
                                </div>
                            </Link>

                            <Link to={`/showtimes/${id}`} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-primary transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-white font-bold">Westside Cinema</span>
                                    <span className="text-slate-400 text-sm">2D</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-primary/20 text-primary px-3 py-1 rounded text-sm">09:30</span>
                                    <span className="bg-white/10 text-white px-3 py-1 rounded text-sm">12:00</span>
                                    <span className="bg-white/10 text-white px-3 py-1 rounded text-sm">14:30</span>
                                    <span className="bg-white/10 text-white px-3 py-1 rounded text-sm">19:00</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Coming Soon notice */}
                {status === 'COMING_SOON' && (
                    <div className="mt-12">
                        <div className="bg-accent/10 border border-accent/20 rounded-xl p-8 text-center">
                            <h3 className="text-2xl font-black text-white mb-2">Sắp khởi chiếu</h3>
                            <p className="text-slate-300">Phim sẽ được khởi chiếu vào ngày {formatDate(releaseDate)}</p>
                            <button className="mt-4 bg-accent text-background-dark font-bold py-2 px-6 rounded-lg">
                                Đặt vé trước
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieDetailPage;

