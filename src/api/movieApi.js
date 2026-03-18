import axiosClient from './axiosClient';

/**
 * Movie API Service
 * Handles all movie-related API calls to the backend
 */

const movieApi = {
    /**
     * Get all movies with pagination
     * @param {number} page - Page number (0-indexed)
     * @param {number} size - Number of items per page
     * @returns {Promise} - API response
     */
    getAllMovies: (page = 0, size = 12) => {
        const params = {
            page,
            size,
        };
        return axiosClient.get('/movies', { params });
    },

    /**
     * Get movie by ID
     * @param {number|string} id - Movie ID
     * @returns {Promise} - API response
     */
    getMovieById: (id) => {
        return axiosClient.get(`/movies/${id}`);
    },

    /**
     * Get now showing movies
     * @returns {Promise} - API response
     */
    getNowShowing: () => {
        return axiosClient.get('/movies/now-showing');
    },

    /**
     * Get coming soon movies
     * @returns {Promise} - API response
     */
    getComingSoon: () => {
        return axiosClient.get('/movies/coming-soon');
    },

    /**
     * Get featured movies
     * @returns {Promise} - API response
     */
    getFeaturedMovies: () => {
        return axiosClient.get('/movies/featured');
    },

    /**
     * Search movies by keyword
     * @param {string} keyword - Search keyword
     * @param {number} page - Page number (0-indexed)
     * @param {number} size - Number of items per page
     * @returns {Promise} - API response
     */
    searchMovies: (keyword, page = 0, size = 12) => {
        const params = {
            keyword,
            page,
            size,
        };
        return axiosClient.get('/movies/search', { params });
    },

    /**
     * Get movies by genre
     * @param {number|string} genreId - Genre ID
     * @param {number} page - Page number (0-indexed)
     * @param {number} size - Number of items per page
     * @returns {Promise} - API response
     */
    getMoviesByGenre: (genreId, page = 0, size = 12) => {
        const params = {
            page,
            size,
        };
        return axiosClient.get(`/movies/genre/${genreId}`, { params });
    },
};

export default movieApi;

