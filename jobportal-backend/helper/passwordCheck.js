function checkPassword(password) {
   
    if (password.length < 8) return false;
    
   
    if (!/[A-Z]/.test(password)) return false;

  
    if (!/[a-z]/.test(password)) return false;

 
    if (!/[0-9]/.test(password)) return false;

   
    if (!/[@#$%^&*]/.test(password)) return false;

    return true;
}


export default checkPassword