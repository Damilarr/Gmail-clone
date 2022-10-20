let colorArray=['#6c757d','#17a2b8','#28a745',"#007bff",'#007bff','#6610f2','#6f42c1','#e83e8c','#dc3545','#fd7e14','#ffc107','#28a745','#17a2b8','#6c757d',' #343a40']
let currentUser = localStorage.getItem("currentUser");
let userArray = JSON.parse(window.localStorage.getItem("userArr"));
let cuurentUserIndex;
console.log(userArray, "userArray");

let user = userArray.find((element,i) => {
    cuurentUserIndex=i
  return element.userName == `${currentUser}`;
});
let mailArray = user.mailArray;
let sentMailArray;
let getSentMails,deleting,starPress,msgIndex;
let progress = 0;
let mailIndex = "";
let deletedMail = [];
let undoTimer = 3;
// MOBILE CURRENT PAGE
let currPage = '#defaultPage'
document.getElementById("signedInAccount").innerHTML = user.firstName
  .charAt("0")
  .toUpperCase();
document.getElementById("signedInAccount").setAttribute(
  "title",
  `Google Account
${user.firstName}
${user.userName}`
);
function progressBar() {
  document.getElementById("progressBar").style.width = `${progress}%`;
  if (progress < 100) {
    progress += 10;
    setTimeout(() => {
      progressBar();
    }, 100);
  } else {
    if (window.innerWidth > 662) {
      loading.classList.replace("d-flex", "d-none");
      emails.classList.remove("d-none");
      show("primary",'mailArray');
    } else {
      loading.classList.replace("d-flex", "d-none");
      emailMobile.classList.remove("d-none");
      show("primary2",'mailArray');
    }
  }
}
function sentMail(id) {
  console.log("jajajj", user.sentMailArray);
  document.getElementById(id).innerHTML = "";
  user.sentMailArray.forEach(function (element, i) {
    document.getElementById(id).innerHTML += `<div class="bg-light ${
      window.innerWidth > 662
        ? "d-flex align-items-center justify-content-evenly border border-muted p-1 mail-row"
        : "d-block p-1 pl-2 border mail-row2 w-100"
    }" id="mailRow" onclick="showMessagee(${i})">
        <div class="d-flex align-items-center mr-5">
        ${
          window.innerWidth > 662
            ? '<input type="checkbox" class="mr-2" name="" id="">'
            : ""
        }
        ${
          window.innerWidth > 662
            ? `<p class="mb-0 text-secondary">To:${element.sentTo}</p>`
            : `<div class="w-100 d-flex justify-content-between"><p class="mb-0 text-seconday">${element.sentTo}</p> <span class="date">Oct 8</span> </div>`
        }
    </div>
    <div class=" d-flex  justify-content-around w-75 align-items-center  ${
      window.innerWidth > 662 ? "" : "w-100"
    }">
        <p class="mb-0"><span class="font-weight-bold">${
          element.messageSub
        }</span> -- <span class"text-muted text-justified">${element.messageBody.slice(
      0,
      25
    )}...</p>
        ${window.innerWidth > 662 ? '<span class="date">Oct 8</span>' : ""}
        <div class="justify-content-around icons" id="icons">
            <button data-toggle="tooltip"  data-placement="bottom" title="Archive" class="mr-2 btn rounded-circle fa fa-archive  text-muted"></button>
            <button  class="fa fa-trash mr-2 text-muted btn rounded-circle" onclick="delMail(${i})"></button>
            <button data-toggle="tooltip"  data-placement="bottom" title="Snooze" class="fa fa-clock mr-2 text-muted btn  rounded-circle"></button>
            <button data-toggle="tooltip"  data-placement="bottom" title="Mark as Unread" class="btn rounded-circle fa fa-clock mr-2 text-muted"></button>
        </div>
        ${window.innerWidth > 662 ? "" : '<i class="fa fa-bars mt-5"></i>'}
    </div>
    </div>`;
  });
  localStorage.setItem(
    `${user.userName}SentMailArr`,
    JSON.stringify(user.sentMailArray)
  );
}
getSentMails = localStorage.getItem(`${user.userName}SentMailArr`);
function checkk() {
  if (getSentMails) {
    user.sentMailArray = JSON.parse(getSentMails);
    sentMail("sentMail");
    sentMail("sentMailInp");
  } else {
    user.sentMailArray = [];
  }
}
checkk();
function show(id,array) {
  document.getElementById(id).innerHTML = "";
  eval(array).forEach(function (element, i) {
    document.getElementById(id).innerHTML += `<a class="${
      window.innerWidth > 662
        ? "d-flex align-items-center justify-content-between border border-muted p-1 mail-row"
        : "d-block p-1 pl-2 border mail-row2 w-100"
    }" id="mailRow"  onclick="showMessage(${i})">
        <div class="d-flex align-items-center mr-5">
        ${
          window.innerWidth > 662
            ? '<input type="checkbox" class="mr-2" name="" id="">'
            : ""
        }
        ${
          window.innerWidth > 662
            ? `${
                user.mailArray[i].starred == false
                  ? `<i class="fa-regular  fa-star  mr-2" name="" onclick='starMessage(${i})'></i>`
                  : `<i class="fa fa-star text-warning mr-2" name="" onclick='starMessage(${i})'></i>`
              }`
            : ""
        }
        ${
          window.innerWidth > 662
            ? `<p class="mb-0 font-weight-bold">${element.sender}</p>`
            : `<div class="w-100 d-flex justify-content-between"><p class="mb-0 font-weight-bold">${element.sender}</p> <span class="date">Oct 8</span> </div>`
        }
    </div>
    <div class=" d-flex  justify-content-around w-75 align-items-center  ${
      window.innerWidth > 662 ? "" : "w-100"
    }">
        <p class="mb-0"><span class="font-weight-bold">${
          element.subject
        }</span>----- <span class"text-muted text-justified">${element.emailBody.slice(
      0,
      22
    )}...</p>
        ${window.innerWidth > 662 ? '<span class="date">Oct 8</span>' : ""}
        <div class="justify-content-around m-0 w-25 icons" id="icons">
            <button data-toggle="tooltip"  data-placement="bottom" title="Archive" class="mr-1 btn rounded-circle fa fa-archive  text-muted"></button>
            <button  class="fa fa-trash mr-1 text-muted btn rounded-circle" onclick="delMail(${i})"></button>
            <button data-toggle="tooltip"  data-placement="bottom" title="Snooze" class="fa fa-clock mr-1 text-muted btn  rounded-circle"></button>
            <button data-toggle="tooltip"  data-placement="bottom" title="Mark as Unread" class="btn rounded-circle fa fa-clock  text-muted"></button>
        </div>
        ${window.innerWidth > 662 ? "" : `${user.mailArray[i].starred == false 
            ? `<i class="fa-regular  fa-star  mr-2" name="" onclick='starMessage(${i})'></i>`
            : `<i class="fa fa-star text-warning mr-2" name="" onclick='starMessage(${i})'></i>`
          }`}
    </div>
    </a>`;
  });
}

if (userArray[cuurentUserIndex].starredMailArray.length >=1) {
    show('starredMailInp','user.starredMailArray')
    show('starredMailInp2','user.starredMailArray')
}
function starMessage(i) {
    if (user.mailArray[i].starred == false) {
        userArray[cuurentUserIndex].mailArray[i].starred= true
        show('primary','mailArray');
        show('primary2','mailArray');
        userArray[cuurentUserIndex].starredMailArray.push(userArray[cuurentUserIndex].mailArray[i])
        localStorage.setItem("userArr", JSON.stringify(userArray));
        show('starredMailInp','user.starredMailArray');
        show('starredMailInp2','user.starredMailArray');
      } else if (user.mailArray[i].starred == true) {
        userArray[cuurentUserIndex].mailArray[i].starred= false
        show('primary','mailArray');
        show('primary2','mailArray');
        userArray[cuurentUserIndex].starredMailArray.splice(userArray[cuurentUserIndex].mailArray[i],1)
        localStorage.setItem("userArr", JSON.stringify(userArray));
        show('starredMailInp','user.starredMailArray');
        show('starredMailInp2','user.starredMailArray');
      }
}
function displayInp() {
  let composeBx = document.querySelector(".composeBox");
  composeBx.classList.contains("d-none")
    ? composeBx.classList.replace("d-none", "d-flex")
    : composeBx.classList.replace("d-flex", "d-none");
}
function closeCompose() {
  document.querySelector(".composeBox").classList.replace("d-flex", "d-none");
}
function delMail(i) {
    deleting=true
  mailIndex = i;
  deletedMail.push(user.mailArray[mailIndex]);
  user.mailArray.splice(mailIndex, 1);
  showUndo(
    `Mail Deleted  <button class="btn btn-dark text-info" onclick="undoDelete()">Undo</button><span></span>`
  );
  show('starredMailInp','user.starredMailArray')
  show('starredMailInp2','user.starredMailArray')
  show('primary','mailArray');
  show('primary2','mailArray')
}
function showUndo(param) {
  if (undoTimer > 0) {
    undoBlock.innerHTML = param;
    document.getElementById("undoBlock").classList.remove("d-none");
    setTimeout(() => {
      undoTimer--;
      showUndo(param);
    }, 1000);
  } else {
    document.getElementById("undoBlock").classList.add("d-none");
    undoTimer = 3;
    deleting = false
    localStorage.setItem("userArr", JSON.stringify(userArray));
  }
};
function undoDelete() {
  user.mailArray.push(deletedMail[deletedMail.length - 1]);
  deletedMail.pop();
  show('primary','mailArray');
}
let colorIndex = Math.trunc(Math.random()*colorArray.length)
document.getElementById(
    "signedInAccount"
  ).style.backgroundColor=`${colorArray[colorIndex]}`
progressBar();
function showSignOutBox() {
  document.getElementById(
    "currUserAccount"
  ).innerHTML = `<h1>${user.firstName.charAt("0")}</h1>`;
  document.getElementById(
    "currUserAccount"
  ).style.backgroundColor=`${colorArray[colorIndex]}`
  document.querySelector("#signOutBox #userNames").innerHTML = `${
    user.firstName + " " + user.lastName
  }`;
  document.querySelector(
    "#signOutBox #userUserName"
  ).innerHTML = `${user.userName}`;
  if (document.getElementById("signOutBox").classList.contains("d-none")) {
    document.getElementById("signOutBox").classList.replace("d-none", "d-flex");
    document.querySelector(".signOutBoxOverlay").classList.remove("d-none");
  } else {
    document.getElementById("signOutBox").classList.replace("d-flex", "d-none");
    document.querySelector(".signOutBoxOverlay").classList.add("d-none");
  }
}
// Go back t sign in page
function signInPage() {
  window.location.href = "./index.html";
}
///////////////////////////
function sendMail() {
  if (!mRecipient.value) {
    sendMailBtn.setAttribute("data-toggle", "modal");
    sendMailBtn.setAttribute("data-target", "#staticBackdrop");
    document.querySelector(".modal-title").innerHTML = "Error";
    document.querySelector(".modal-body").innerHTML =
      "Enter at least one recipient to send the mail to";
    document.querySelector("body").classList.add("modal-open");
  } else if (
    typeof userArray.find((element) => {
      return element.userName == mRecipient.value;
    }) !== "object"
  ) {
    console.log(
      userArray.find((element) => {
        return element.userName == mRecipient.value;
      })
    );
    sendMailBtn.setAttribute("data-toggle", "modal");
    sendMailBtn.setAttribute("data-target", "#staticBackdrop");
    document.querySelector(".modal-title").innerHTML = "Error";
    document.querySelector(
      ".modal-body"
    ).innerHTML = `The address "${mRecipient.value}" in the "To" field was not recognised. Please make sure that all addresses are properly formed.`;
    document.querySelector("body").classList.add("modal-open");
  } else if (mRecipient.value && mBody.value && mSubject.value) {
    sendd(mRecipient, mSubject, mBody);
    addTosentMail(mRecipient, mSubject, mBody);
    console.log(sentMailArray);
    sentMail("sentMail");
    displayInp();
    if (undoTimer >= 2) {
      showUndo(`Sending....`);
    } else if (undoTimer < 2) {
      showUndo(`Sent`);
    }
    // }
  }
  // Remove modal call from button
  setTimeout(() => {
    if (document.querySelector("body").classList.contains("modal-open")) {
      document.querySelector("body").classList.remove("modal-open");
      sendMailBtn.removeAttribute("data-toggle");
      sendMailBtn.removeAttribute("data-target");
      console.log("done");
    }
  }, 1000);
}
function addTosentMail(mailRecipient, mailSubject, mailBody) {
  let mRec = mailRecipient.value;
  let mSub = mailSubject.value;
  let mBdy = mailBody.value;
  user.sentMailArray.push({
    sentTo: mRec,
    messageSub: mSub,
    messageBody: mBdy,
  });
}
function sendd(recipient, subject, body) {
  // debugger
  let rec = recipient.value;
  let sub = subject.value;
  let bdy = body.value;
  let findRecipient = userArray.find((element) => {
    return element.userName == rec;
  });
  console.log(findRecipient);
  if (findRecipient) {
    findRecipient.mailArray.push({
      sender: user.firstName,
      subject: sub,
      emailBody: bdy,
      starred: false,
      senderUsername:user.userName,
    });
    localStorage.setItem("userArr", JSON.stringify(userArray));
  }
}

///////////////////////////////Mobile buttons and functions//////////////////////////////////////////////////////////
function typeMail() {
//   document.getElementById("defaultPage").classList.add("d-none");
//   document.getElementById("typePage").classList.add("changePage");
//   document.getElementById("typePage").classList.remove("d-none");

  console.log(userArray);
}

function displayPage(param){
    let pages = document.querySelectorAll('#emailMobile .page')
    pages.forEach(element =>{
        if (!element.classList.contains('d-none')){
            element.classList.add('d-none')
        }
        console.log(element);
    })
    currPage = param
    console.log(param);
    document.querySelector(param).classList.remove("d-none");
}
function closeTypeMail(){
    document.getElementById("noRecipient").classList.add('d-none')
    let pages = document.querySelectorAll('#emailMobile .page')
    pages.forEach(element =>{
        if (!element.classList.contains('d-none')){
            element.classList.add('d-none')
        }
        console.log(element);
    })
    document.querySelector('#defaultPage').classList.remove("d-none");
}
// update number of messages
let countUpdate = setInterval(() => {
    document.querySelectorAll('#primNumber').forEach(element => {
        element.innerHTML = user.mailArray.length
    });
    document.querySelector('#starNumber').innerHTML = user.starredMailArray.length;
    document.querySelector('#inboxNumber').innerHTML = user.mailArray.length;
    document.querySelectorAll('.currentAcc').forEach(element => {
        element.innerHTML = currentUser
    });
}, 1000);
// 
function sendMobileMail() {
  if (!mobileRecipient.value) {
    document.getElementById("noRecipient").innerHTML = "Please add a recipient";
    document.getElementById("noRecipient").classList.remove('d-none')
  } else if (
    typeof userArray.find((element) => {
      return element.userName == mobileRecipient.value;
    }) !== "object"
  ) {
    alert(
      `"${mobileRecipient.value}" isn't a valid Email Address Try sending again After fixing`
    );
  } else if (mobileRecipient.value && mobileBody.value && mobileSubject.value) {
    sendd(mobileRecipient, mobileSubject, mobileBody);
    addTosentMail(mobileRecipient, mobileSubject, mobileBody);
    alert("sent");
    closeTypeMail();
  }
}
function closeDesktopMessage(){
    document.getElementById('desktopMessage').classList.add('d-none')
}
function closeMessageMenu(){
    
    document.getElementById('defaultPage').classList.remove('d-none')
    document.getElementById('messagePage').classList.add('d-none')
}
function showMessage(i){
    console.log(i)
    if (window.innerWidth >662 && deleting !== true){
        document.getElementById('mailTopic').innerHTML = user.mailArray[i].subject
        document.getElementById('mailSender').innerHTML =  user.mailArray[i].sender
        document.getElementById('senderUsername').innerHTML =  user.mailArray[i].senderUsername
        document.getElementById('mailBody').innerHTML = `<p class="px-5">${ user.mailArray[i].emailBody}</p>`
        document.getElementById('desktopMessage').classList.remove('d-none')

    }else{
        msgIndex = i
        document.getElementById('senderName').innerHTML=  user.mailArray[i].sender
        document.getElementById('msgBdy').innerHTML  = `<p class="pt-3">${ user.mailArray[i].emailBody}</p>`;
        document.getElementById('msgTopic').innerHTML =  user.mailArray[i].subject;
        console.log(currPage);
        document.querySelector(currPage).classList.add('d-none')
        document.getElementById('messagePage').classList.remove('d-none')
    }
}
function showMessagee(i){
    document.getElementById('mailTopic').innerHTML = user.sentMailArray[i].messageSub
        document.getElementById('mailSender').innerHTML =  user.sentMailArray[i].sentTo
        document.getElementById('mailBody').innerHTML = `<p class="px-5">${ user.sentMailArray[i].messageBody}</p>`
        document.getElementById('desktopMessage').classList.remove('d-none')
}
function reverseShowMessage(){
    document.getElementById('messagePage').classList.add('d-none')
    console.log(currPage);
    document.querySelector(currPage).classList.remove('d-none')
    delMail(msgIndex)
}
function forwardMessage(){
    document.getElementById('mobileBody').value = document.querySelector('#msgBdy p').innerHTML
    document.getElementById('mobileSubject').value = document.getElementById('msgTopic').innerHTML
    document.querySelector(currPage).classList.add('d-none')
    displayPage('#typePage')
}

