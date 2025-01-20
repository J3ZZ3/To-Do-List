export const registerUser = (username, password) => {
    // Hash the password before storing (use a library like bcrypt in a real app)
    localStorage.setItem('user', JSON.stringify({ username, password })); // Consider hashing
    localStorage.setItem('isAuthenticated', true);
  };
  
  export const loginUser = (username, password) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    // Check hashed password (this is a placeholder, implement proper hashing)
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
  