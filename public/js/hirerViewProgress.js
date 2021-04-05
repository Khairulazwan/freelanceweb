const jobStatusForm = document.querySelector('#jobStatusForm');
console.log("Before enter submit");

var email=localStorage.getItem("storageName");  


jobStatusForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("After enter submit");
})





//get data
console.log(email);
db.collection('status').where("ProjectBy", "==", email).where("JobStatus", "==", "In progress").get().then(snapshot => {
  setupJobs(snapshot.docs);
});

const reqList = document.querySelector('.status');

//setup status
const setupJobs = (data) => {
  let html = '';

  data.forEach(doc => {
    const status = doc.data();
    const ul = `
       <ul id="list" class="collapsible z-depth-0">
       <li><a href="#">
          <div class="divider1">Student Name: </div>
          ${status.StudentName} <br>
          <div class="divider1">Student Email: </div>
          ${status.RequestBy} <br>
          <div class="divider1">Contact Nummber: </div>
          ${status.StudentContactNo} <br>
          <div class="divider1">Project Name:  </div>
          ${status.ProjectName} <br>
          <div class="divider1">Job Status:   </div>
          ${status.JobStatus} <br><br>
          <button style="display: block" type="submit" onclick="jobStatus('${doc.id}','${status.ReqID}')">Job Complete</button>
       </a></li>
       </ul>
   
    `;
    html += ul
  });

  reqList.innerHTML = html;
}





function jobStatus(ID,reqID){
    var jobRef = db.collection("status").doc(ID);   

        return jobRef.update({
   
           GiveRate: 'Not yet',
           JobStatus: 'COMPLETED',
           UserReputation: 'Undefined',
           UserExist: 'Yes',
   
        })
        
        .then(function() {
         
          var docRef = db.collection("request").doc(reqID);   
          return docRef.update({  
            RequestDone: 'Yes',  
          })

        }).then(function() {
            window.alert("You have update the job status to completed");
            console.log("Document successfully updated!");
            window.location = 'hirerViewProgress.html';
            accRequestForm.reset();

        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    
}

var completeBtn = document.querySelector('#completeBtn');
completeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.location = 'hirerRate.html';
})