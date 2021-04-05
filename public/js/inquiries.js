const contactForm = document.querySelector('#contactForm');
console.log("Before enter submit");



contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("After enter submit");

  var custName = contactForm['name'].value;
  var custEmail = contactForm['email'].value;
  var custMsg = contactForm['message'].value;


  db.collection('inquiries').add({
    UserName: custName,
    UserEmail: custEmail,
    UserMessage: custMsg,
    AdminResponse: 'UNANSWERED',
    
  })
    .then(function () {
      console.log("Document successfully written!");
      contactForm.reset();
      window.alert("Your message has been sent successfully. The system admin will reply your message ASAP");
      window.location = 'index.html';
  
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });

 
})