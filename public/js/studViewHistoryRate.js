const jobRateForm = document.querySelector('#jobRateForm');
console.log("Before enter submit");

var email=localStorage.getItem("storageName");  
var ratingID =localStorage.getItem("ratesStorage"); 


jobRateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("After enter submit");
})




//get data
console.log(email);
db.collection('rating').where("studentEmail", "==", email).where("rateId", "==", ratingID).get().then(snapshot => {
  rateJobs(snapshot.docs);
});

const rateList = document.querySelector('.rating');

//setup rating
const rateJobs = (data) => {
  let tableHeader = '';
  let html = '';
  let completeTable = '';

  data.forEach(doc => {
    const rating = doc.data();
    const tr = `
    <tbody>
       <tr class="collapsible z-depth-0">
       <td>${rating.employerName}</td>
       <td>${rating.projectRate}</td>
       <td>${rating.projectSatisfaction}</td>
       <td>${rating.projectComment}</td>

          
       </tr>
    </tbody>
   
    `;
    html += tr
  });

  tableHeader = `
  <table>
  <thead>
    <tr>
        <th>Employer Name</th>
        <th>Rate (0-5 stars)</th>
        <th>Satisfaction</th>
        <th>Comment</th>
     
    </tr>
    </thead>`

  completeTable = tableHeader + html + '</table>';

  rateList.innerHTML = completeTable;
}


