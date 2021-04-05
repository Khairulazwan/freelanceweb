const loginForm = document.querySelector('#login_form');
console.log("Before enter submit");
var userStatus = '';

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("After enter submit");

  // get user info
  const email = loginForm['email_field'].value;
  const password = loginForm['password_field'].value;

  localStorage.setItem("storageName",email);


  db.collection("users").where('Email', '==', email)
  .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            data = doc.data();
            userStatus = data.userStatus;
            console.log('user status: ',userStatus);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    
    window.alert("Invalid email or password..");
    // window.location = 'login.html';
  });

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    //student and employer go to different page
   
    const modal = document.querySelector('#login_div');   
    if(userStatus == 'EMPLOYER'){
      window.location = 'hirerProfile.html';
    }
    else if(userStatus == 'STUDENT'){
      window.location = 'studProfile.html';
    }
    else if(userStatus == 'ADMIN'){
      window.location = 'adminPage.html';
    }
  });


})


