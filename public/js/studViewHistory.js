const jobStatusForm = document.querySelector('#jobStatusForm');
console.log("Before enter submit");

var email=localStorage.getItem("storageName");  


jobStatusForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("After enter submit");
})




//get data
console.log(email);
db.collection('status').where("RequestBy", "==", email).where("JobStatus", "==", "COMPLETED").get().then(snapshot => {
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
          <td>${status.ProjectComplete}</td>
          <td>${status.EmployerName}</td>
          <td>${status.ProjectBy}</td>
          <td>${status.EmployerContactNo}</td>
          <td>${status.UserReputation}</td> 
          <td><button style="display: block; width:100px" type="submit" onclick="viewRate('${doc.id}')">View</button></td>

          
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
        <th>Payment</th>
        <th>Complete Date</th>
        <th>Employer Name</th>
        <th>Email</th>
        <th>Contact No.</th>
        <th>Commend/Report</th>
        <th>More Info</th>
     
    </tr>
    </thead>`

  completeTable = tableHeader + html + '</table>';

  reqList.innerHTML = completeTable;
}


function viewRate(ID){
  localStorage.setItem("ratesStorage",ID);
  // console.log(ID);
  window.location = 'studViewHistoryRate.html';
    
}