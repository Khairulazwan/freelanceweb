const logout = document.querySelector('#logout');
console.log("Still logged in");
logout.addEventListener('click', (e) => {
  e.preventDefault();
  console.log("After log out");


  // log the user out
  auth.signOut().then(() => {
      window.location = 'index.html';
      console.log('User signed out');
      localStorage.clear();
  })
  
})
