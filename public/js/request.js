

const requestJobForm = document.querySelector('#requestJobForm');
console.log("Before enter submit");

var email=localStorage.getItem("storageName");

var fullName =localStorage.getItem("storageFullname");
var contactNo =localStorage.getItem("storageContact");
var rating =localStorage.getItem("storageRating");

console.log(fullName);
console.log(contactNo);
console.log(rating);

requestJobForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("After enter submit");


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
  


  //get user ID who request the project
const setupUI = (user) => {
  if (user) {
    var reqBy = db.collection("users").doc(userLoginID);

    reqBy.get().then(function (doc) {
      if (doc.exists) {
        var data=doc.data();
        requestBy = data.Email;
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }
  }
})





//get data
db.collection('jobs').where("ProjectStatus", "==", "PENDING").get().then(snapshot => {
  findJobs(snapshot.docs);
});

const jobFind = document.querySelector('.jobs');

//find jobs
const findJobs = (data) => {
let html = '';


data.forEach(doc => {

  const jobs = doc.data();
  const ul = `
     <ul id="myPattern" class="collapsible z-depth-0">
        <li><a href="#">
        <div class="divider1">Project Name:</div>
        ${jobs.projectName}<br>
        <div class="divider1">Description:</div>
        ${jobs.projectInfo}<br>
        <div class="divider1">Skills: </div>
        ${jobs.projectSkill}<br>
        <div class="divider1">Completion Date:</div>
        ${jobs.projectComplete}<br>
        <div class="divider1">Payment:</div>
        RM${jobs.projectPayment}<br><br>
        <div class="divider"></div>  <button type="submit" onclick="request('${userLoginID}','${doc.id}','${jobs.projectName}','${jobs.projectPayment}','${jobs.projectComplete}','${jobs.projectBy}','${jobs.employerName}','${jobs.employerContactNo}')">Send Request</button>
        </a></li>
      
     </ul>
 
  `;
  html += ul
});

jobFind.innerHTML = html;

}

function request(user,id,name,payment,complete,projBy,eName,eContactNo) {

    db.collection('request').add({
    JobId:id,
    UserID: user,
    FullName: fullName,
    ContactNumber: contactNo,
    RequestBy: email,
    ProjectName: name,
    ProjectPayment: payment,
    ProjectComplete: complete,
    ProjectBy: projBy,
    EmployerName: eName,
    EmployerContactNo: eContactNo,
    Rating: rating,
    ProjectStatus: 'PENDING',
    RequestDone: 'No',

  })

    .then(function () {
      console.log(projBy);
      console.log(name);
      console.log("Document successfully written!");
      requestJobForm.reset();

      
      window.alert("Your request has been sent successfully");
      window.location = 'studProfile.html';
  
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
  }


