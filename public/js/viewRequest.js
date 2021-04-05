const accRequestForm = document.querySelector('#accRequestForm');
console.log("Before enter submit");

// var fullName =localStorage.getItem("storageFullname");
// var contactNo =localStorage.getItem("storageContact");

var email=localStorage.getItem("storageName");  
// var eName =localStorage.getItem("FullnameStorage");
// var eContactNo =localStorage.getItem("ContactStorage");

accRequestForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("After enter submit");
})


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



//get data
console.log(email);
db.collection('request').where("ProjectBy", "==", email).where("ProjectStatus", "==", "PENDING").get().then(snapshot => {
  setupJobs(snapshot.docs);
});

const reqList = document.querySelector('.request');

//setup request
const setupJobs = (data) => {
  let tableHeader = '';
  let html = '';
  let completeTable = '';

  data.forEach(doc => {
    const request = doc.data();
    const tr = `
      <tbody>
       <tr class="collapsible z-depth-0">
          <td>${request.ProjectName}</td>
          <td>${request.FullName}</td>
          <td>${request.ContactNumber}</td>
          <td>${request.Rating}</td>
          <td><button style="display: block; width:145px" type="submit" onclick="acceptRequest('${userLoginID}','${doc.id}','${request.JobId}','${request.UserID}','${request.ProjectName}','${request.ProjectComplete}','${request.ProjectPayment}','${request.ProjectBy}','${request.EmployerName}','${request.EmployerContactNo}','${request.FullName}','${request.RequestBy}','${request.ContactNumber}')">Accept Request</button></td>
          <td><button style="display: block; width:145px" type="submit" onclick="declineRequest('${doc.id}')">Decline</button></td>
       </tr>
       </tbody>
   
    `;
    html += tr
  });

  tableHeader = `
  <table>
    <thead>
    <tr>
        <th>Project Name</th>
        <th>Student Name</th>
        <th>Contact No.</th>
        <th>Rating (0-5 stars)</th>
        <th></th>
        <th></th>
    </tr>
    </thead>`

  completeTable = tableHeader + html + '</table>';

  reqList.innerHTML = completeTable;
}


function acceptRequest(empID,ID,jobID,userID,projName,projDate,projPayment,projBy,empName,empNo,stuName,reqBy,stuNo){

    db.collection('status').add({
            EmployerID: empID,
            ReqID: ID,
            UserID: userID,     
            ProjectName: projName,
            ProjectComplete: projDate,
            ProjectPayment: projPayment,
            ProjectBy: projBy,
            EmployerName: empName,
            EmployerContactNo: empNo,
            RequestBy: reqBy,
            StudentName: stuName,
            StudentContactNo: stuNo,    
            JobStatus: 'In progress',
    })

  
    var accRef = db.collection("request").doc(ID);   

        return accRef.update({
   
           ProjectStatus: 'ACCEPTED',
        
        })

        .then(function() {
         
        var docRef = db.collection("jobs").doc(jobID);   
        return docRef.update({
           ProjectStatus: 'ACCEPTED'        
        })
        }).then(function() {
        console.log(jobID);

            window.alert("You have accept the student request. Remember to decline any request on a same job");
            console.log("Document successfully updated!");
            accRequestForm.reset();

            window.location = 'hirerAcceptUser.html';
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

        
    
}

function declineRequest(ID){
    var decRef = db.collection("request").doc(ID);   

        return decRef.update({
   
           ProjectStatus: 'DECLINED' 
   
        })
        .then(function() {
            window.alert("You have decline the student request");
            console.log("Document successfully updated!");

            accRequestForm.reset();
            window.location = 'hirerAcceptUser.html';

        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    
}

