var email=localStorage.getItem("storageName");  


//get data
db.collection('users').where("Email", "==", email).get().then(snapshot => {
  setupUsers(snapshot.docs);
});

const userList = document.querySelector('.users');

//setup users
var FullName, ContactNumber;
const setupUsers = (data) => {
  let html = '';
  let completeTable = '';

  data.forEach(doc => {
    const users = doc.data();


    FullName = users.FullName;
    ContactNumber = users.ContactNumber;


    const li = `
    <table>
    <tr><th>Full Name</th><td>${users.FullName}</td></tr>
    <tr><th>Email</th><td>${users.Email}</td></tr>
    <tr><th>Contact Number</th><td>${users.ContactNumber}</td></tr>
    <tr><th>Ic Number</th><td>${users.IcNumber}</td></tr>
    <tr><th>Date of Birth</th><td>${users.DateOfBirth}</td></tr>
    <tr><th>Company or Agency</th><td>${users.CompanyAgency}</td></tr>
    <tr><th>Company Address</th><td>${users.CompanyAddress}</td></tr>
  
    `;
    html += li
  });

  

  completeTable = html + '</table>';

  userList.innerHTML = completeTable;

  localStorage.setItem("FullnameStorage",FullName);
  localStorage.setItem("ContactStorage",ContactNumber);

}



var addButton = document.querySelector('#addButton');
addButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.location = 'hirerAddJob.html';
})

var updateButton = document.querySelector('#updateButton');
updateButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.location = 'hirerUpdateDelete.html';
})

var viewButton = document.querySelector('#viewButton');
viewButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.location = 'hirerAcceptUser.html';
})

var viewProgress = document.querySelector('#viewProgress');
viewProgress.addEventListener('click', (e) => {
  e.preventDefault();
  window.location = 'hirerViewProgress.html';
})


