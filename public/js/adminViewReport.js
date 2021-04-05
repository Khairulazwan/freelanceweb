const jobStatusForm = document.querySelector('#jobStatusForm');
console.log("Before enter submit");

var email=localStorage.getItem("storageName");  


jobStatusForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("After enter submit");
})




//get data
console.log(email);
db.collection('status').where("JobStatus", "==", "COMPLETED").where("UserReputation", "==", "Reported").where("UserExist", "==", "Yes").get().then(snapshot => {
  setupJobs(snapshot.docs);
});

const reqList = document.querySelector('.status');

//setup status
const setupJobs = (data) => {
  let tableHeader = '';
  let html = '';
  let completeTable = '';

  data.forEach(doc => {
    const status = doc.data();
    const tr = `
      <tbody>
       <tr class="collapsible z-depth-0">
          <td>${status.ProjectName}</td>
          <td>${status.EmployerName}</td>
          <td>${status.ProjectBy}</td>
          <td>${status.EmployerContactNo}</td>
          <td>${status.JobStatus}</td>
          <td>${status.UserReputation}</td>
          <td><button style="display: block;" type="submit" onclick="deleteUser('${doc.id}','${status.EmployerID}')">Delete User</button></td> 
          
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
        <th>Employer Name</th>
        <th>Email</th>
        <th>Contact No.</th>
        <th>Job Status</th>
        <th>Commend/Report</th>
        <th></th>
    </tr>
    <thead>`

  completeTable = tableHeader + html + '</table>';

  reqList.innerHTML = completeTable;
}


 function deleteUser(ID,empId) {
    db.collection("users").doc(empId).delete().then(function () {
      console.log(empId);
      console.log("Document successfully deleted!");

      var docRef = db.collection("status").doc(ID);   

      return docRef.update({
 
        UserExist: 'No',
      
      })

    }).catch(function (error) {
      console.error("Error removing document: ", error);
  
    }).then(() => {
  
      window.alert("The user is removed from e-Rajin system")
      window.location = 'adminViewReport.html';
    })
  
  }