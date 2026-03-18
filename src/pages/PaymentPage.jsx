import { useState } from 'react';
import { Link } from 'react-router-dom';

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('credit');

    return (
        <div className="min-h-screen py-20 px-6 md:px-20">
            <div className="max-w-[800px] mx-auto">
                <h1 className="text-3xl font-black text-white mb-8">Thanh toán</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Payment Methods */}
                    <div className="space-y-4">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <h3 className="text-white font-bold mb-4">Phương thức thanh toán</h3>
                            <div className="space-y-2">
                                <label className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'credit'
                                        ? 'border-primary bg-primary/10'
                                        : 'border-white/10 hover:border-white/30'
                                    }`}>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={paymentMethod === 'credit'}
                                            onChange={() => setPaymentMethod('credit')}
                                            className="w-4 h-4 accent-primary"
                                        />
                                        <span className="text-white">Thẻ tín dụng/Ghi nợ</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="material-symbols-outlined text-white">credit_card</span>
                                    </div>
                                </label>

                                <label className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'momo'
                                        ? 'border-primary bg-primary/10'
                                        : 'border-white/10 hover:border-white/30'
                                    }`}>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={paymentMethod === 'momo'}
                                            onChange={() => setPaymentMethod('momo')}
                                            className="w-4 h-4 accent-primary"
                                        />
                                        <span className="text-white">MoMo</span>
                                    </div>
                                    <span className="text-pink-500 material-symbols-outlined">payments</span>
                                </label>

                                <label className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'bank'
                                        ? 'border-primary bg-primary/10'
                                        : 'border-white/10 hover:border-white/30'
                                    }`}>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={paymentMethod === 'bank'}
                                            onChange={() => setPaymentMethod('bank')}
                                            className="w-4 h-4 accent-primary"
                                        />
                                        <span className="text-white">Chuyển khoản ngân hàng</span>
                                    </div>
                                    <span className="material-symbols-outlined text-white">account_balance</span>
                                </label>
                            </div>
                        </div>

                        {/* Card Details */}
                        {paymentMethod === 'credit' && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                                <div>
                                    <label className="text-slate-400 text-sm block mb-2">Số thẻ</label>
                                    <input
                                        type="text"
                                        placeholder="1234 5678 9012 3456"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-slate-400 text-sm block mb-2">Ngày hết hạn</label>
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-slate-400 text-sm block mb-2">CVV</label>
                                        <input
                                            type="text"
                                            placeholder="123"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-slate-400 text-sm block mb-2">Tên chủ thẻ</label>
                                    <input
                                        type="text"
                                        placeholder="NGUYEN VAN A"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary outline-none"
                                    />
                                </div>
                            </div>
                        )}

                        {paymentMethod === 'momo' && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                                <span className="text-pink-500 material-symbols-outlined text-6xl mb-4">payments</span>
                                <p className="text-slate-400 mb-4">Quét mã QR để thanh toán qua MoMo</p>
                                <div className="w-48 h-48 bg-white rounded-lg mx-auto flex items-center justify-center">
                                    <span className="text-slate-400 text-sm">QR Code</span>
                                </div>
                            </div>
                        )}

                        {paymentMethod === 'bank' && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                <p className="text-slate-400 mb-4">Thông tin chuyển khoản:</p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Ngân hàng</span>
                                        <span className="text-white">Vietcombank</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Số tài khoản</span>
                                        <span className="text-white">1234567890</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Chủ tài khoản</span>
                                        <span className="text-white">CinePulse</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Nội dung</span>
                                        <span className="text-primary">VE20241111</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-4">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <h3 className="text-white font-bold mb-4">Tổng quan đơn hàng</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Phim</span>
                                    <span className="text-white">Shadow Protocols</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Rạp</span>
                                    <span className="text-white">City Center Mall</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Suất chiếu</span>
                                    <span className="text-white">15:30 - 11/11/2024</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Ghế</span>
                                    <span className="text-white">A5, A6, A7</span>
                                </div>
                                <div className="border-t border-white/10 pt-3 flex justify-between">
                                    <span className="text-slate-400">Giá vé</span>
                                    <span className="text-white">240.000đ</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Combo</span>
                                    <span className="text-white">89.000đ</span>
                                </div>
                                <div className="border-t border-white/10 pt-3 flex justify-between">
                                    <span className="text-white font-bold">Tổng cộng</span>
                                    <span className="text-primary font-bold text-xl">329.000đ</span>
                                </div>
                            </div>
                        </div>

                        <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all">
                            Xác nhận thanh toán
                        </button>

                        <Link
                            to="/booking"
                            className="block w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-xl transition-all text-center border border-white/10"
                        >
                            Quay lại
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;

