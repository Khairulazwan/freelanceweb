const payRateForm = document.querySelector('#payRateForm');
console.log("Before enter submit");

var email=localStorage.getItem("storageName");  


payRateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("After enter submit");
})





//get data
console.log(email);
db.collection('status').where("ProjectBy", "==", email).where("JobStatus", "==", "COMPLETED").where("GiveRate", "==", "Not yet").get().then(snapshot => {
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
          <td>${status.StudentName}</td>
          <td>${status.RequestBy}</td>
          <td>${status.StudentContactNo}</td>
          <td>${status.ProjectName}</td>
          <td>RM${status.ProjectPayment}</td>
          <td>${status.JobStatus}</td>
          <td><button style="width:100px; display: block;" type="submit" onclick="rating('${doc.id}','${status.UserID}')">Rating</button></td>
       </tr>
    </tbody>
   
    `;
    html += tr
  });

  tableHeader = `
  <table>
  <thead>
    <tr>
        <th>Student Name</th>
        <th>Email</th>
        <th>Contact No.</th>
        <th>Project Name</th>
        <th>Payment</th>
        <th>Job Status</th>
        <th></th>
    </tr>
    </thead>`

  completeTable = tableHeader + html + '</table>';

  reqList.innerHTML = completeTable;



}



// function payment(ID) {
//   db.collection('stripe_customers').add({
//     customer_id: ID,
//   })

//     .then(function () {
//       console.log("Document successfully written!");
//       payRateForm.reset();

//       localStorage.setItem("paymentStorage", ID);
//       window.location = 'payment.html';

//     })
//     .catch(function (error) {
//       console.error("Error writing document: ", error);
//     });

// }

function rating(ID, userid) {

  var docRef = db.collection("status").doc(ID);

  return docRef.update({

    GiveRate: 'Done',

  })

    .then(function () {
      localStorage.setItem("ratingStorage", ID);
      localStorage.setItem("userStorage", userid);
      window.location = 'rating.html';
    })
}