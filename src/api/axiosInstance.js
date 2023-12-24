import axios from 'axios';
import authHeader from '../services/auth-header';


let user = JSON.parse(localStorage.getItem('user'));

// const getToken = () => {
//     const token = user ? user.token : null;
//     return token || null;
// };

const getRefreshToken = () => {
    const refreshToken = user ? user.refreshToken : null;
    return refreshToken || null;
};


// // Request interceptor to set 'x-access-token' header
// axiosInstance.interceptors.request.use(
//     async (config) => {
//         try {
//             const token = getToken();
//             if (token) {
//                 config.headers['x-access-token'] = token;
//             }
//         } catch (error) {
//             console.error(error);
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

const axiosInstance = axios.create({
  baseURL: 'https://api-blog.apewannaliveforever.online',
  timeout: 5000,
  headers: authHeader(),
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log('Refreshing access token...', getRefreshToken());
        const refreshResponse = await axios.post('https://api-blog.apewannaliveforever.online/api/refreshToken', {
            refreshToken: getRefreshToken(),
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
        console.log('Refresh response:', refreshResponse);

        user = {
          ...user,
          token: refreshResponse.data.token,
        };
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Access token refreshed!');
        console.log('New token:', refreshResponse.data.token);
        //originalRequest.headers['x-access-token'] = refreshResponse.data.accessToken;
        originalRequest.headers['x-access-token'] = user.token;
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
