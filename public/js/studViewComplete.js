const jobStatusForm = document.querySelector('#jobStatusForm');
console.log("Before enter submit");

var email=localStorage.getItem("storageName");  


jobStatusForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("After enter submit");
})




//get data
console.log(email);
db.collection('status').where("RequestBy", "==", email).where("JobStatus", "==", "COMPLETED").where("UserReputation", "==", "Undefined").get().then(snapshot => {
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
          <td>RM${status.ProjectPayment}</td>
          <td>${status.EmployerName}</td>
          <td>${status.ProjectBy}</td>
          <td>${status.EmployerContactNo}</td>
          <td><button style="width:100px; display: block;" type="submit" onclick="report('${doc.id}')">Report</button></td>
          <td><button style="width:100px; display: block;" type="submit" onclick="commend('${doc.id}')">Commend</button></td>
    </tbody>      
       </tr>
   
    `;
    html += tr
  });

  tableHeader = `
  <table>
  <thead>
    <tr>
        <th>Project Name</th>
        <th>Payment</th>
        <th>Employer</th>
        <th>Email</th>
        <th>Contact No.</th>
        <th></th>
        <th></th>
    </tr>
    </thead>`

  completeTable = tableHeader + html + '</table>';

  reqList.innerHTML = completeTable;
}


function report(ID){
    var repRef = db.collection("status").doc(ID);

    return repRef.update({       
            UserReputation: 'Reported',
    })   

        .then(function() {
            window.alert("You have report the employer");
            console.log("Document successfully updated!");

            jobStatusForm.reset();
            window.location = 'studProfile.html';

        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    
}

function commend(ID){
    var cmdRef = db.collection("status").doc(ID);   

        return cmdRef.update({
   
           UserReputation: 'Commended',
   
        })
        .then(function() {
            window.alert("You have commend the employer");
            console.log("Document successfully updated!");

            jobStatusForm.reset();
            window.location = 'studProfile.html';

        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    
}