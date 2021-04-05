
var email=localStorage.getItem("storageName");  

//get data
db.collection('request').where("RequestBy", "==", email).where("RequestDone", "==", 'No').get().then(snapshot => {
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
          <td>${request.EmployerName}</td>
          <td>${request.ProjectBy}</td>
          <td>${request.EmployerContactNo}</td>
          <td>${request.ProjectStatus}</td>
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
        <th>Request Status</th>
    </tr>
    </thead>`

  completeTable = tableHeader + html + '</table>';

  reqList.innerHTML = completeTable;
}