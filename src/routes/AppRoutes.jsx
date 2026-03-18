import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import MovieDetailPage from '../pages/MovieDetailPage';
import ShowtimePage from '../pages/ShowtimePage';
import SeatSelectionPage from '../pages/SeatSelectionPage';
import BookingPage from '../pages/BookingPage';
import PaymentPage from '../pages/PaymentPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';


const AppRoutes = () => {
    return (
        <Routes>
            {/* All routes wrapped in MainLayout */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<HomePage />} />
                <Route path="/movies/:id" element={<MovieDetailPage />} />
                <Route path="/showtimes" element={<HomePage />} />
                <Route path="/showtimes/:id" element={<ShowtimePage />} />
                <Route path="/seats/:id" element={<SeatSelectionPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Route>

            {/* Admin Routes */}

        </Routes>
    );
};

export default AppRoutes;

