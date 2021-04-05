//get data
db.collection('jobs').get().then(snapshot => {
  setupJobs(snapshot.docs);
});

const jobList = document.querySelector('.jobs');

//setup jobs
const setupJobs = (data) => {
  let tableHeader = '';
  let html = '';
  let completeTable = '';

  data.forEach(doc => {
    const jobs = doc.data();
    const tr = `
       <tbody>
       <tr class="collapsible z-depth-0">
          <td>${jobs.projectName}</td>
          <td>${jobs.projectInfo}</td>
          <td>${jobs.projectSkill}</td>
          <td>${jobs.projectComplete}</td>
          <td>RM${jobs.projectPayment}</td>
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
        <th>Description</th>
        <th>Skill</th>
        <th>Complete Date</th>
        <th>Payment</th>
    </tr>
    </thead>`

  completeTable = tableHeader + html + '</table>';

  jobList.innerHTML = completeTable;
}

