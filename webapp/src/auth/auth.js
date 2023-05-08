export const isLoggedInUser = () => !!getAccessToken();

export const getAccessToken = () => {
    return localStorage.getItem('access_token');
}

export const getUserAccess = () => {
    return localStorage.getItem('access_lvl');
}

export const getLoggedInUserInfo = () => {
    return {
        isLoggedInUser: isLoggedInUser(),
        role: getUserAccess()
    }
}

