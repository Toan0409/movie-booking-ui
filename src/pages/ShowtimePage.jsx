import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ShowtimePage = () => {
    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [showtimes, setShowtimes] = useState([]);
    const [cinemas, setCinemas] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // ===== FORMAT DATE (FIX TIMEZONE) =====
    const formatDate = (date) => {
        return date.toLocaleDateString('en-CA'); // yyyy-MM-dd
    };

    // ===== FORMAT TIME =====
    const formatTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // ===== TẠO 7 NGÀY =====
    const getNext7Days = () => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            days.push(d);
        }
        return days;
    };

    const dates = getNext7Days();

    // ===== CALL API SHOWTIME =====
    useEffect(() => {
        axios.get(`http://localhost:8080/api/client/showtimes/movie/${id}/date`, {
            params: {
                date: formatDate(selectedDate)
            }
        })
            .then(res => {
                console.log("Showtime API:", res.data);
                setShowtimes(res.data?.data || []);

                // set movie từ showtime luôn (đỡ gọi API riêng)
                if (res.data?.data?.length > 0) {
                    setMovie(res.data.data[0].movie);
                }
            })
            .catch(err => console.error(err));
    }, [id, selectedDate]);

    // ===== GROUP THEO THEATER =====
    useEffect(() => {
        const grouped = {};

        showtimes.forEach(st => {
            const theaterName = st.theater?.name || "Phòng";
            const theaterType = st.theater?.theaterType || "2D";

            if (!grouped[theaterName]) {
                grouped[theaterName] = {
                    name: `Phòng ${theaterName}`,
                    address: "", // chưa có BE
                    type: theaterType,
                    showtimes: []
                };
            }

            grouped[theaterName].showtimes.push({
                showtimeId: st.showtimeId,
                time: formatTime(st.startTime),
                available: st.theater?.totalSeats || 0,
                price: st.price,
                soldOut: st.theater?.totalSeats === 0
            });
        });

        // sort giờ chiếu
        Object.values(grouped).forEach(cinema => {
            cinema.showtimes.sort((a, b) => a.time.localeCompare(b.time));
        });

        setCinemas(Object.values(grouped));
    }, [showtimes]);

    return (
        <div className="min-h-screen py-20 px-6 md:px-20">
            <div className="max-w-[1200px] mx-auto">

                {/* ===== MOVIE INFO ===== */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-24 rounded-lg overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src={movie?.posterUrl}
                            alt={movie?.title}
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-white">
                            {movie?.title}
                        </h1>
                        <p className="text-slate-400">
                            {movie?.ageRating} • {movie?.duration} phút
                        </p>
                    </div>
                </div>

                {/* ===== DATE ===== */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-white mb-4">Chọn ngày</h2>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {dates.map((date, index) => {
                            const isActive =
                                date.toDateString() === selectedDate.toDateString();

                            return (
                                <button
                                    key={index}
                                    onClick={() => setSelectedDate(date)}
                                    className={`flex flex-col items-center justify-center min-w-[60px] h-[70px] rounded-xl border transition-all ${isActive
                                            ? 'bg-primary border-primary text-white'
                                            : 'bg-white/5 border-white/10 text-slate-400 hover:border-primary'
                                        }`}
                                >
                                    <span className="text-xs">
                                        {date.toLocaleDateString('vi-VN', { weekday: 'short' })}
                                    </span>
                                    <span className="text-lg font-bold">
                                        {date.getDate()}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ===== CINEMA LIST ===== */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-4">
                        Chọn rạp & suất chiếu
                    </h2>

                    <div className="space-y-4">
                        {cinemas.map((cinema, index) => (
                            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-white font-bold">{cinema.name}</h3>
                                        <p className="text-slate-400 text-sm">{cinema.address}</p>
                                    </div>
                                    <span className="bg-primary/20 text-primary px-3 py-1 rounded text-sm">
                                        {cinema.type}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {cinema.showtimes.map((showtime) => (
                                        showtime.soldOut ? (
                                            <button
                                                key={showtime.showtimeId}
                                                disabled
                                                className="px-4 py-2 rounded-lg border border-slate-700 text-slate-600"
                                            >
                                                {showtime.time}
                                            </button>
                                        ) : (
                                            <Link
                                                key={showtime.showtimeId}
                                                to={`/seats/${showtime.showtimeId}`}
                                                className="px-4 py-2 rounded-lg border border-white/20 text-white hover:border-primary hover:bg-primary/20 flex flex-col items-center"
                                            >
                                                <span className="font-bold">{showtime.time}</span>
                                                <span className="text-xs text-slate-400">
                                                    {showtime.available} ghế
                                                </span>
                                            </Link>
                                        )
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ShowtimePage;