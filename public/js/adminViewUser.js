
//get data
db.collection('users').where("userStatus", "==", "EMPLOYER").get().then(snapshot => {
  setupUser(snapshot.docs);
});

const userList = document.querySelector('.users');

const setupUser = (data) => {
  let tableHeader = '';
  let html = '';
  let completeTable = '';

  data.forEach(doc => {
    const users = doc.data();
    const tr = `
    <tbody>
       <tr class="collapsible z-depth-0" users>
         <td>${users.FullName}</td>
         <td>${users.Email}</td>
         <td>${users.ContactNumber}</td>
         <td>${users.IcNumber}</td>
         <td>${users.DateOfBirth}</td>
         <td>${users.CompanyAgency}</td>
         <td>${users.CompanyAddress}</td>

       </tr>
    </tbody>
   
    `;
    html += tr
  });

  tableHeader = `
  <table>
    <thead>
    <tr>
        <th>Full Name</th>
        <th>Email</th>
        <th>Contact No.</th>
        <th>Ic Number</th>
        <th>Date of Birth</th>
        <th style="width:120px">Company Agency</th>
        <th style="width:250px">Company Address</th>
   
    </tr>
    </thead>`

  completeTable = tableHeader + html + '</table>';

  userList.innerHTML = completeTable;
}


//get data
db.collection('users').where("userStatus", "==", "STUDENT").get().then(snapshot => {
  setupStud(snapshot.docs);
});

const studList = document.querySelector('.stud');

const setupStud = (data) => {
  let tableHeader = '';
  let html = '';
  let completeTable = '';

  data.forEach(doc => {
    const users = doc.data();
    const tr = `
    <tbody>
       <tr class="collapsible z-depth-1" stud>
         <td>${users.FullName}</td>
         <td>${users.Email}</td>
         <td>${users.ContactNumber}</td>
         <td>${users.IcNumber}</td>
         <td>${users.DateOfBirth}</td>
         <td>${users.UniversityCollege}</td>
         <td>${users.DegreeLevel}</td>
       </tr>
    </tbody>
   
    `;
    html += tr
  });

  tableHeader = `
  <table>
    <thead>
    <tr>
        <th>Full Name</th>
        <th>Email</th>
        <th>Contact No.</th>
        <th>Ic Number</th>
        <th>Date of Birth</th>
        <th>University or College</th>
        <th>Degree Level</th>
    </tr>
    </thead>`

  completeTable = tableHeader + html + '</table>';

  studList.innerHTML = completeTable;
}




var viewJob = document.querySelector('#viewJob');
viewJob.addEventListener('click', (e) => {
  e.preventDefault();
  window.location = 'jobView.html';
})

var viewReport = document.querySelector('#viewReport');
viewReport.addEventListener('click', (e) => {
  e.preventDefault();
  window.location = 'adminViewReport.html';
})

var viewInquiry = document.querySelector('#viewInquiry');
viewInquiry.addEventListener('click', (e) => {
  e.preventDefault();
  window.location = 'viewInquiries.html';
})



