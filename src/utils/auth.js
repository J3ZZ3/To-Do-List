export const registerUser = (username, password) => {
    localStorage.setItem('user', JSON.stringify({ username, password }));
    localStorage.setItem('isAuthenticated', true);
  };
  
  export const loginUser = (username, password) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      localStorage.setItem('isAuthenticated', true);
      return true;
    } else {
      return false;
    }
  };
  
  export const logoutUser = () => {
    localStorage.removeItem('isAuthenticated');
  };
  