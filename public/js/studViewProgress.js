const jobStatusForm = document.querySelector('#jobStatusForm');
console.log("Before enter submit");

var email=localStorage.getItem("storageName");  


jobStatusForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("After enter submit");
})




//get data
console.log(email);
db.collection('status').where("RequestBy", "==", email).where("JobStatus", "==", "In progress").get().then(snapshot => {
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
       <div class="divider1">Project Name:  </div>
       ${status.ProjectName} <br>
       <div class="divider1">Payment:  </div>
       ${status.ProjectPayment} <br>
       <div class="divider1">Completion Date:  </div>
       ${status.ProjectComplete} <br>
       <div class="divider1">Employer Name:  </div>
       ${status.EmployerName} <br>
       <div class="divider1">Employer Email:  </div>
       ${status.ProjectBy} <br>
       <div class="divider1">Contact Number:  </div>
       ${status.EmployerContactNo} <br>
       <div class="divider1">Job Status:  </div>
       ${status.JobStatus}
      </a></li> 
       </ul>
   
    `;
    html += ul
  });

  reqList.innerHTML = html;
}

var viewButton = document.querySelector('#viewButton');
viewButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.location = 'studViewComplete.html';
})




