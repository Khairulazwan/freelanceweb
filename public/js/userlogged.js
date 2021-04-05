
const loginAs = document.querySelector('.loginAs')
var userName;
var userLoginID, currentUser;
auth.onAuthStateChanged(user => {
  if (user) {

    currentUser = firebase.auth().currentUser;
    if (currentUser != null) {
      userLoginID = currentUser.uid;
    }
    setupUI(user);
  }
})

const setupUI = (user) => {

  if (user) {
    var docRef = db.collection("users").doc(userLoginID);

    docRef.get().then(function (doc) {
      if (doc.exists) {
        var data=doc.data();
        userName = data.FullName;
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
      let html = 'Logged in as '+userName;
      loginAs.innerHTML = html;
    })

  }
};