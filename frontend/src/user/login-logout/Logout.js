export const logout = () => {
    console.log("User tries to log out.");
    localStorage.clear();
    console.log("User logged out.");
    window.location.href=`/`;
    // location.reload();
};