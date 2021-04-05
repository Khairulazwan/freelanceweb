//get data
db.collection('inquiries').where("AdminResponse", "==", "UNANSWERED").get().then(snapshot => {
  setupJobs(snapshot.docs);
});

const docList = document.querySelector('.inquiries');

//setup inquiries
const setupJobs = (data) => {
  let tableHeader = '';
  let html = '';
  let completeTable = '';

  data.forEach(doc => {
    const inquiries = doc.data();
    const tr = `
       <tbody>
       <tr class="collapsible z-depth-0">
          <td>${inquiries.UserName}</td>
          <td>${inquiries.UserEmail}</td>
          <td>${inquiries.UserMessage}</td>
          <td>${inquiries.AdminResponse}</td>
          <td><a target="_blank" onclick="resp('${doc.id}','${inquiries.AdminResponse}')" href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=E-Rajin%20System%20Message&body=Hello,%0aThank%20you%20for%20using%20e-Rajin%20system.%20The%20problem%20is%20your%20account%20is%20not%20yet%20created.%20You%20should%20fill%20in%20all%20your%20information%20in%20signup%20page%20before%20you%20can%20login%20to%20the%20system.%20Signup%20first%20and%20try%20to%20login%20again.%0a%0aFollow%20this%20link%20to%20go%20to%20the%20e-Rajin%20website.%0ahttps://erajinweb.firebaseapp.com%0a%0a%0aThanks,%0amdkhairulazwan97@gmail.com%0a(e-Rajin%20system%20administrator)">Send Respond</a></td>
       </tr>
       </tbody>
   
    `;
    html += tr
  });

  tableHeader = `
  <table>
  <thead>
    <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Message</th>
        <th>Response</th>
        <th></th>
    </tr>
    <thead>`

  completeTable = tableHeader + html + '</table>';

  docList.innerHTML = completeTable;
}

function resp(id){

    var docRef = db.collection("inquiries").doc(id);   

    return docRef.update({

      AdminResponse: 'ANSWERED',
    
    })
   .then(() => {

    window.location = 'adminPage.html';
  })

}