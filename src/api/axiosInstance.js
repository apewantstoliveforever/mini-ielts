import axios from 'axios';

let user = JSON.parse(localStorage.getItem('user'));

const getToken = () => {
    const token = user ? user.token : null;
    return token || null;
};

const getRefreshToken = () => {
    const refreshToken = user ? user.refreshToken : null;
    return refreshToken || null;
};

const axiosInstance = axios.create({
    baseURL: 'https://api-blog.apewannaliveforever.online',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'x-access-token': getToken(),
    },
});

// Request interceptor to set 'x-access-token' header
axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const token = getToken();
            if (token) {
                config.headers['x-access-token'] = token;
            }
        } catch (error) {
            console.error(error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token refreshing
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await axios.post('/api/refreshToken', {
                    refreshToken: getRefreshToken(),
                });

                user = {
                    ...user,
                    token: refreshResponse.data.accessToken,
                };
                localStorage.setItem('user', JSON.stringify(user));

                originalRequest.headers['x-access-token'] = refreshResponse.data.accessToken;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error(refreshError);
                // Handle refresh error (e.g., redirect to login page)
                throw refreshError;
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
