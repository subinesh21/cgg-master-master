export const defaultSession = {
    isLoggedIn: false,
};

export const sessionOptions = {
    password: process.env.SECRET_KEY,
    cookieName: "__session",
    
};
