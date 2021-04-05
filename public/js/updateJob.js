var updateData = document.querySelector('#updateData');
// console.log("Before enter submit");

// updateData.addEventListener('submit', (e) => {
//   e.preventDefault();
//   console.log("After enter submit");


var fname = document.querySelector('#fname');
var description = document.querySelector('#description');
var skill = document.querySelector('#skill');
var date = document.querySelector('#date');
var payment = document.querySelector('#payment');

var email = localStorage.getItem("storageName");  
var updateID=localStorage.getItem("updateStorage");

var docRef = db.collection("jobs").doc(updateID);

docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
      var data = doc.data();
      console.log(data.projectName);

      fname.value = data.projectName
      description.value = data.projectInfo
      skill.value = data.projectSkill
      date.value = data.projectComplete
      payment.value = data.projectPayment

    } else {
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});


function update()
{
  console.log(email);
  var NAME = fname.value;
  var DESCR = description.value;
  var SKILL = skill.value;
  var DATE = date.value;
  var PAYMENT = payment.value;
  var updateStat = db.collection("jobs").doc(updateID);
  
  return updateStat.update({

    projectName : NAME,
    projectInfo : DESCR,
    projectSkill : SKILL,
    projectComplete : DATE,
    projectPayment : PAYMENT,

  })
  .then(function() {
      console.log("Success update data!");
      window.alert("The data has been updated successfully");
      window.location = 'hirerProfile.html';
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating status: ", error);
  });
}


