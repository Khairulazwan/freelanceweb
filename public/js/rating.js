const rateForm = document.querySelector('#rateForm');
console.log("Before enter submit");

var sName = document.querySelector('#sName');
var sEmail = document.querySelector('#sEmail');
var sContactNo = document.querySelector('#sContactNo');
var jobStat = document.querySelector('#jobStat');

var satisfy;
var satisfied = document.querySelector('#satisfied');
satisfied.addEventListener('click', (e) => {
  e.preventDefault();
  satisfied = 'Satisfied';
  satisfy = satisfied;
  console.log(satisfy);
})


var notsatisfied = document.querySelector('#notsatisfied');
notsatisfied.addEventListener('click', (e) => {
e.preventDefault();
notsatisfied = 'Not satisfied';
satisfy=notsatisfied;
console.log(satisfy);
})


var userID =localStorage.getItem("userStorage");
console.log(userID);
var ratingID =localStorage.getItem("ratingStorage");  
console.log(ratingID);


var email=localStorage.getItem("storageName");  
var eName =localStorage.getItem("FullnameStorage");
var eContactNo =localStorage.getItem("ContactStorage");


var docRef = db.collection('status').doc(ratingID);

docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
      var data = doc.data();

      sName.value = data.StudentName
      sEmail.value = data.RequestBy
      sContactNo.value = data.StudentContactNo
      jobStat.value = data.JobStatus


    } else {
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});


rateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("After enter submit");


    var projRate = rateForm['rating'].value;
    var projComment = rateForm['comment'].value;
    var studName = rateForm['sName'].value;
    var studEmail = rateForm['sEmail'].value;
    var studContactNo = rateForm['sContactNo'].value; 
    var jobStatus = rateForm['jobStat'].value;

   
    db.collection('rating').add({
    rateId: ratingID,
    projectRate: projRate,
    projectSatisfaction: satisfy,
    projectComment: projComment,
    employerEmail: email,
    employerName: eName,
    emloyerContactNo: eContactNo,
    studentName: studName,
    studentEmail: studEmail,
    studentContactNo: studContactNo,
    jobStatus: jobStatus,

    })

  var rateRef = db.collection("users").doc(userID);

  rateRef.get().then(function (doc) {
    var numRate;
    if (doc.exists) {
      console.log("Document data:", doc.data());
      var data = doc.data();
      var rates = data.Rating;
      if (rates == 'No rating yet..') {
        numRate = projRate;
      }
      else if(rates == '1'||'2'||'3'||'4'||'5'){
        numRate = rates;
      }
      
      
      var totalRate = ((parseFloat(numRate) + parseFloat(projRate))/10)*5;
      var finalRate = parseFloat(totalRate).toFixed(2);
      var newRate = finalRate.toString();
      console.log(newRate);

      return rateRef.update({

        Rating: newRate

      })

        .then(function () {
          console.log("Document successfully written!");
          rateForm.reset();
          window.location = 'hirerProfile.html';

        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });

    } else {
      console.log("No such document!");
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });


})
