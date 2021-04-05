var email=localStorage.getItem("storageName");  


//get data
db.collection('users').where("Email", "==", email).get().then(snapshot => {
  setupUsers(snapshot.docs);
});

const userList = document.querySelector('.users');


//setup users
var FullName, ContactNumber, Rating;
const setupUsers = (data) => {
  let html = '';
  let completeTable = '';

  data.forEach(doc => {
    const users = doc.data();

    FullName = users.FullName;
    ContactNumber = users.ContactNumber;
    Rating = users.Rating;

    const li = `
    <table>
    <tr><th style="width:350px" >Full Name</th><td>${users.FullName}</td></tr>
    <tr><th>Email</th><td>${users.Email}</td></tr>
    <tr><th>Contact Number</th><td>${users.ContactNumber}</td></tr>
    <tr><th>Ic Number</th><td>${users.IcNumber}</td></tr>
    <tr><th>Date of Birth</th><td>${users.DateOfBirth}</td></tr>
    <tr><th>University or College</th><td>${users.UniversityCollege}</td></tr>
    <tr><th>Degree Level</th><td>${users.DegreeLevel}</td></tr>
    <tr><th>Rating</th><td>${users.Rating}/5 stars</td></tr>
  
    `;
    html += li
  });

  

  completeTable = html + '</table>';

  userList.innerHTML = completeTable;

  console.log(FullName);
  console.log(ContactNumber);
  console.log(Rating);

  localStorage.setItem("storageFullname",FullName);
  localStorage.setItem("storageContact",ContactNumber);
  localStorage.setItem("storageRating",Rating);

}


var findJob = document.querySelector('#findJob');
findJob.addEventListener('click', (e) => {
  e.preventDefault();
  window.location = 'studRequestJob.html';
})

var checkJob = document.querySelector('#checkJob');
checkJob.addEventListener('click', (e) => {
  e.preventDefault();
  window.location = 'studRequestCheck.html';
})

var viewStatus = document.querySelector('#viewStatus');
viewStatus.addEventListener('click', (e) => {
  e.preventDefault();
  window.location = 'studViewProgress.html';
})

var historyButton = document.querySelector('#historyButton');
historyButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.location = 'studViewHistory.html';
})