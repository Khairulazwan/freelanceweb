const addJobForm = document.querySelector('#addJobForm');
console.log("Before enter submit");

var email=localStorage.getItem("storageName");

var eName =localStorage.getItem("FullnameStorage");
var eContactNo =localStorage.getItem("ContactStorage");

addJobForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("After enter submit");

  // var projectBy , keywordSoundex;
  var userLoginID, currentUser;
  auth.onAuthStateChanged(user => {
    if (user) {

      currentUser = firebase.auth().currentUser;
      if (currentUser != null) {
        userLoginID = currentUser.uid;
      }
      console.log('User login id =',userLoginID);
      setupUI(user);
    }
  })
  


  //get user ID who posted the project
const setupUI = (user) => {
  if (user) {
    var projBy = db.collection("users").doc(userLoginID);

    projBy.get().then(function (doc) {
      if (doc.exists) {
        var data=doc.data();
        projectBy = data.Email;
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });



  }

  
  var projName = addJobForm['name'].value;
  var projInfo = addJobForm['description'].value;
  var projSkill = addJobForm['skill'].value;
  var projComplete = addJobForm['date'].value;
  var projPayment = addJobForm['payment'].value;


  db.collection('jobs').add({

    projectName: projName,
    projectInfo: projInfo,
    projectSkill: projSkill,
    projectComplete: projComplete,
    projectPayment: projPayment,
    projectBy: email,
    employerName: eName,
    employerContactNo: eContactNo,
    ProjectStatus: 'PENDING',
    


  })
    .then(function () {
      console.log("Document successfully written!");
      addJobForm.reset();
      window.location = 'hirerProfile.html';
  
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });

  }
})