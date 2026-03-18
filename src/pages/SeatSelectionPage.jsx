import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const SeatSelectionPage = () => {
    const { id } = useParams();
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Generate seat layout
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 12;

    // Sample booked seats
    const bookedSeats = ['A3', 'A4', 'B5', 'B6', 'C7', 'D2', 'D3', 'E8', 'F1', 'F2', 'G5', 'G6', 'H3'];

    // VIP rows
    const vipRows = ['A', 'B'];

    const toggleSeat = (seat) => {
        if (bookedSeats.includes(seat)) return;

        setSelectedSeats(prev =>
            prev.includes(seat)
                ? prev.filter(s => s !== seat)
                : [...prev, seat]
        );
    };

    const getSeatPrice = (row) => vipRows.includes(row) ? 150000 : 80000;

    const totalPrice = selectedSeats.reduce((sum, seat) => {
        const row = seat.charAt(0);
        return sum + getSeatPrice(row);
    }, 0);

    return (
        <div className="min-h-screen py-20 px-6 md:px-20">
            <div className="max-w-[1000px] mx-auto">
                {/* Showtime Info */}
                <div className="flex items-center justify-between mb-8 bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-16 rounded-lg overflow-hidden">
                            <img
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKVuMpsMxDimxnNv3MutmxW-m6WajWdzlaYDWTBKHV6pQhDIa-HiqUx7ZaxEVFoQac4I5XqrrkowpO_S06d1p5Hmpl8uGAiqkxk7i_GNWS2iMDXu_wISPNVXMxnKPl1IiqZDOHtiiMyhyemr3rrTYQJpSkuhwS24r8cqtj5I4htxtj0yGiZfc9FFQrpwol2dMK2a8F-mwmIfPHeLqr7H2az9KTJw0FVtu0PI1tFcoo-NYGA1jAsuZOfmeHML98HLq4ve4DLvaq6Fg"
                                alt="Movie"
                            />
                        </div>
                        <div>
                            <h1 className="text-white font-bold">Shadow Protocols</h1>
                            <p className="text-slate-400 text-sm">City Center Mall • IMAX • 15:30</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-slate-400 text-sm">Ngày</p>
                        <p className="text-white font-bold">11/11/2024</p>
                    </div>
                </div>

                {/* Screen */}
                <div className="mb-12">
                    <div className="relative">
                        <div className="h-2 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full w-3/4 mx-auto mb-2"></div>
                        <p className="text-center text-slate-500 text-sm">Màn hình</p>
                    </div>
                </div>

                {/* Seat Legend */}
                <div className="flex items-center justify-center gap-6 mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-white/20"></div>
                        <span className="text-slate-400 text-sm">Trống</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-primary"></div>
                        <span className="text-slate-400 text-sm">Đã chọn</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-slate-700"></div>
                        <span className="text-slate-400 text-sm">Đã đặt</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-accent"></div>
                        <span className="text-slate-400 text-sm">VIP</span>
                    </div>
                </div>

                {/* Seat Layout */}
                <div className="mb-8 overflow-x-auto">
                    <div className="min-w-[600px]">
                        {rows.map((row) => (
                            <div key={row} className="flex items-center justify-center gap-1 mb-2">
                                <span className="w-6 text-slate-500 text-sm font-medium">{row}</span>
                                {Array.from({ length: seatsPerRow }, (_, i) => {
                                    const seatNumber = i + 1;
                                    const seat = `${row}${seatNumber}`;
                                    const isBooked = bookedSeats.includes(seat);
                                    const isSelected = selectedSeats.includes(seat);
                                    const isVip = vipRows.includes(row);

                                    return (
                                        <button
                                            key={seat}
                                            disabled={isBooked}
                                            onClick={() => toggleSeat(seat)}
                                            className={`w-8 h-8 rounded-t-lg text-xs font-medium transition-all ${isBooked
                                                    ? 'bg-slate-700 text-slate-600 cursor-not-allowed'
                                                    : isSelected
                                                        ? 'bg-primary text-white'
                                                        : isVip
                                                            ? 'bg-accent/30 text-accent hover:bg-accent'
                                                            : 'bg-white/20 text-slate-300 hover:bg-primary/50'
                                                }`}
                                        >
                                            {seatNumber}
                                        </button>
                                    );
                                })}
                                <span className="w-6 text-slate-500 text-sm font-medium text-right">{row}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Aisle indicator */}
                <div className="flex items-center justify-center gap-4 mb-8 text-slate-500 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-1 bg-white/10"></div>
                        <span>Hành lang</span>
                        <div className="w-8 h-1 bg-white/10"></div>
                    </div>
                </div>

                {/* Selected Seats Summary */}
                {selectedSeats.length > 0 && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
                        <h3 className="text-white font-bold mb-4">Ghế đã chọn</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {selectedSeats.map(seat => (
                                <span
                                    key={seat}
                                    className="bg-primary/20 text-primary px-3 py-1 rounded-lg text-sm font-medium"
                                >
                                    {seat} ({vipRows.includes(seat.charAt(0)) ? 'VIP' : 'Thường'})
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <div>
                                <p className="text-slate-400 text-sm">Tổng cộng ({selectedSeats.length} ghế)</p>
                                <p className="text-2xl font-bold text-white">{totalPrice.toLocaleString('vi-VN')}đ</p>
                            </div>
                            <Link
                                to="/booking"
                                className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-xl transition-all"
                            >
                                Tiếp tục
                            </Link>
                        </div>
                    </div>
                )}

                {selectedSeats.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-slate-400">Vui lòng chọn ghế để tiếp tục</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SeatSelectionPage;

