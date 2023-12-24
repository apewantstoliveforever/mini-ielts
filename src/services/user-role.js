//user-role service

//get user role in local storage user

const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.role;
};

export default {
    getUserRole
};