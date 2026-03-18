import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const user = {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@email.com',
        phone: '0901234567',
        memberType: 'Gold',
        points: 2450,
    };

    const tickets = [
        {
            id: 'VE001',
            movie: 'Shadow Protocols',
            date: '11/11/2024',
            time: '15:30',
            cinema: 'City Center Mall',
            seats: ['A5', 'A6', 'A7'],
            status: 'upcoming',
        },
        {
            id: 'VE002',
            movie: 'Neon Dreams',
            date: '08/11/2024',
            time: '20:00',
            cinema: 'River District Cinema',
            seats: ['D12', 'D13'],
            status: 'completed',
        },
        {
            id: 'VE003',
            movie: 'Whisper in the Dark',
            date: '05/11/2024',
            time: '22:00',
            cinema: 'Westside Cinema',
            seats: ['F8'],
            status: 'completed',
        },
    ];

    return (
        <div className="min-h-screen py-20 px-6 md:px-20">
            <div className="max-w-[1000px] mx-auto">
                <h1 className="text-3xl font-black text-white mb-8">Tài khoản</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Sidebar */}
                    <div className="md:col-span-1 space-y-4">
                        {/* User Info Card */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                            </div>
                            <h2 className="text-white font-bold text-lg">{user.name}</h2>
                            <p className="text-slate-400 text-sm">{user.email}</p>
                            <div className="mt-4 inline-flex items-center gap-2 bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-bold">
                                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                {user.memberType} Member
                            </div>
                        </div>

                        {/* Menu */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                            <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-primary/20 text-primary text-left">
                                <span className="material-symbols-outlined">person</span>
                                <span className="font-medium">Thông tin tài khoản</span>
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white text-left transition-colors">
                                <span className="material-symbols-outlined">confirmation_number</span>
                                <span className="font-medium">Vé của tôi</span>
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white text-left transition-colors">
                                <span className="material-symbols-outlined">favorite</span>
                                <span className="font-medium">Phim yêu thích</span>
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white text-left transition-colors">
                                <span className="material-symbols-outlined">history</span>
                                <span className="font-medium">Lịch sử đặt vé</span>
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white text-left transition-colors">
                                <span className="material-symbols-outlined">settings</span>
                                <span className="font-medium">Cài đặt</span>
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-500/10 text-left transition-colors">
                                <span className="material-symbols-outlined">logout</span>
                                <span className="font-medium">Đăng xuất</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Points Card */}
                        <div className="bg-gradient-to-r from-primary to-red-700 rounded-xl p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-sm">Điểm tích lũy</p>
                                    <p className="text-4xl font-black text-white">{user.points.toLocaleString()}</p>
                                    <p className="text-white/60 text-sm">điểm</p>
                                </div>
                                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                                </div>
                            </div>
                        </div>

                        {/* Account Details */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="text-white font-bold text-lg mb-4">Thông tin tài khoản</h3>
                            <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-slate-500 text-sm block mb-1">Họ và tên</label>
                                        <input
                                            type="text"
                                            defaultValue={user.name}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-slate-500 text-sm block mb-1">Số điện thoại</label>
                                        <input
                                            type="tel"
                                            defaultValue={user.phone}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-slate-500 text-sm block mb-1">Email</label>
                                    <input
                                        type="email"
                                        defaultValue={user.email}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
                                    />
                                </div>
                                <button className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-lg transition-all">
                                    Lưu thay đổi
                                </button>
                            </div>
                        </div>

                        {/* My Tickets */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="text-white font-bold text-lg mb-4">Vé của tôi</h3>
                            <div className="space-y-4">
                                {tickets.map(ticket => (
                                    <div key={ticket.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h4 className="text-white font-bold">{ticket.movie}</h4>
                                                <p className="text-slate-400 text-sm">{ticket.cinema}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${ticket.status === 'upcoming'
                                                    ? 'bg-primary/20 text-primary'
                                                    : 'bg-slate-700 text-slate-400'
                                                }`}>
                                                {ticket.status === 'upcoming' ? 'Sắp chiếu' : 'Đã xem'}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex gap-4 text-slate-400">
                                                <span>{ticket.date}</span>
                                                <span>{ticket.time}</span>
                                                <span>Ghế: {ticket.seats.join(', ')}</span>
                                            </div>
                                            {ticket.status === 'upcoming' && (
                                                <Link to={`/movies/${ticket.id}`} className="text-primary hover:underline text-sm">
                                                    Xem vé
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

