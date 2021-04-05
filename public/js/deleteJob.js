var email=localStorage.getItem("storageName");  
  
  
  //get data
  db.collection('jobs').where("projectBy", "==", email).where("ProjectStatus", "==", "PENDING").get().then(snapshot => {
    setupJobs(snapshot.docs);
  });
  
  const jobList = document.querySelector('.jobs');

  const tableJob = document.querySelector('#tableJob');
  

  const setupJobs = (data) => {

  
    data.forEach(doc => {
      const jobs = doc.data();
      console.log(doc.id);

      var tr = document.createElement('tr');
      var tbody = document.createElement('tbody');
      var td1 = document.createElement('td');
      td1.setAttribute("id","displayName");
      td1.innerHTML = jobs.projectName;
      tr.appendChild(td1);
      
      var td2 = document.createElement('td');
      td2.setAttribute("id","displayInfo");
      td2.innerHTML = jobs.projectInfo;
      tr.appendChild(td2);

      var td3 = document.createElement('td');
      td3.setAttribute("id","displaySkill");
      td3.innerHTML = jobs.projectSkill;
      tr.appendChild(td3);

      var td4 = document.createElement('td');
      td4.setAttribute("id","displayComplete");
      td4.innerHTML = jobs.projectComplete;
      tr.appendChild(td4);

      var td5 = document.createElement('td');
      td5.setAttribute("id","displayPayment");
      td5.innerHTML = jobs.projectPayment;
      tr.appendChild(td5);


      var td6 = document.createElement('td');
      var input = document.createElement('input');
      input.type = "button";
      input.style = "background-color:#ffbb05; border-radius: 10px;  line-height: 10px; padding: 10px;  font-size: 14px; margin-top: 60px; ";
      input.setAttribute("id","goUpdate");
      input.value = "Update";
      input.onclick = (function() {
        return function() {
          db.collection('jobs').get().then(snapshot => {
        setupJobs(snapshot.docs);
        });
          updateJob(doc.id);
        }})(doc.id);

      td6.appendChild(input);   
      tr.appendChild(td6);
      

      var td7 = document.createElement('td');
      var input = document.createElement('input');
      input.type = "button";
      input.style = "background-color:#ffbb05; border-radius: 10px; line-height: 10px; padding: 10px;  font-size: 14px; margin-top: 60px; ";
      input.setAttribute("id","goDelete");
      input.value = "Delete ";
      input.onclick = (function() {
        return function() {
          deleteJob(doc.id);
        }})(doc.id);

      td7.appendChild(input);   
      tr.appendChild(td7);
      tbody.appendChild(tr);
      tableJob.appendChild(tbody);

    });
  }

    function updateJob(ID) {
    // db.collection("jobs").doc(ID);
      localStorage.setItem("updateStorage",ID);
      window.location = 'hirerUpdateJob.html';
  }


  function deleteJob(ID) {
    console.log("delete");
    db.collection("jobs").doc(ID).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
  
    }).then(() => {
  
      window.alert("The project is successfully deleted!")
      window.location = 'hirerUpdateDelete.html';
    })
  
  }

   