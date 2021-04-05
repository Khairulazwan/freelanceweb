
const signupForm = document.querySelector('#signup_form');
console.log("Before enter submit");
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("After enter submit");

  // get user info
  const email = signupForm['signup_email'].value;
  const password = signupForm['signup_password'].value;
  const fullName = signupForm['full_name'].value;
  const icNumber = signupForm['ic_number'].value;
  const dateofbirth = signupForm['dob'].value;
  const companyAgency = signupForm['company'].value;
  const companyAddress = signupForm['address'].value;
  const contactNumber = signupForm['contact_no'].value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      // bio: signupForm['signup-bio'].value
      FullName: fullName,
      Email: email,
      IcNumber: icNumber,
      DateOfBirth: dateofbirth,
      CompanyAgency: companyAgency,
      CompanyAddress: companyAddress,
      ContactNumber: contactNumber,
      userStatus : 'EMPLOYER'
    });
  }).then(()=>{

    window.alert("You have successfully signed up. ");
    window.location = 'login.html';
  })

});

function validateForm() {
  if(document.myForm.email.value == "" || document.myForm.pass.value == "" || document.myForm.fullname.value == "" || document.myForm.icNumber.value == "" ||
  document.myForm.dateofbirth.value == "" || document.myForm.companyAgency.value == "" || document.myForm.companyAddress.value == ""){
    window.alert("The fields must be filled out..");
    document.myForm.fullname;
    document.myForm.email;
    document.myForm.pass;
    document.myForm.icnumber;
    document.myForm.dob;
    document.myForm.company;
    document.myForm.address;
    return false;
  }
}
