export const addUserToLocalStorage = (user) =>{
    localStorage.setItem('user', JSON.stringify(user))
}

export const removeUserFromLocalStorage = () =>{
    localStorage.removeItem('user')
}

export const getUserFromLocalStorage = () => {
    const response = localStorage.getItem('user')
    const user = response ? JSON.parse(response) : null
    return user
}