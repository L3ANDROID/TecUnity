export const setUser = (user) => {
    return {
        type: 'LOGGED_IN',
        user
    }
}

export const clearUser = () => {
    return {
        type: 'SIGN_OUT'
    }
}