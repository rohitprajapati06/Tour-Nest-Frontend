import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7030/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor for outgoing requests
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor for responses to handle token expiration
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            const originalRequest = error.config;
            const refreshToken = localStorage.getItem('refreshToken');

            if (refreshToken && !originalRequest._retry) {
                originalRequest._retry = true; // Prevent infinite retry loops

                try {
                    const response = await axios.post('https://localhost:7030/api/Auth/Refresh', { refreshToken });
                    if (response.status === 200) {
                        const { accessToken, refreshToken: newRefreshToken } = response.data;

                        // Update tokens in local storage
                        localStorage.setItem('accessToken', accessToken);
                        localStorage.setItem('refreshToken', newRefreshToken);

                        // Retry the original request with the new access token
                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                        return axios(originalRequest);
                    }
                } catch (refreshError) {
                    console.error('Refresh token expired or invalid.', refreshError);
                    localStorage.clear(); // Clear tokens from storage
                    throw new Error('Authentication error');
                }
            }
        }
        return Promise.reject(error); // Propagate other errors
    }
);

export default api;
