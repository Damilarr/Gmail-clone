let currentUser = localStorage.getItem('currentUser');
let userArray = (JSON.parse(window.localStorage.getItem('userArr')))
console.log(userArray,'userArray');
let user = userArray.find(element =>{
    return element.userName == `${currentUser}`;
})
let mailArray = user.mailArray
let progress = 0;
let mailIndex='';
let deletedMail=[]
let undoTimer = 3
document.getElementById('signedInAccount').innerHTML=user.firstName.charAt('0')
document.getElementById('signedInAccount').setAttribute('title',`Google Account
${user.firstName}
${user.userName}`)
function progressBar(){
  document.getElementById("progressBar").style.width = `${progress}%`;
  if (progress < 100) {
    progress += 10;
    setTimeout(() => {
      progressBar();
    }, 100);
  } else {
    loading.classList.replace("d-flex", "d-none");
    if (window.innerWidth > 577){
        emails.classList.remove("d-none");
         show('primary')
    }else{
        emailMobile.classList.remove("d-none");
        show('primary2')
    }
   
   
  }
}
// document.querySelector('.mail-row .icons').onmouseover=function(){
    // document.querySelector('.icons').classList.add('showww')
// }
function show(id){
    document.getElementById(id).innerHTML=''
    mailArray.forEach(function(element,i){
        document.getElementById(id).innerHTML +=`<div class="${window.innerWidth > 577?'d-flex align-items-center justify-content-evenly border border-muted p-1 mail-row':'d-block p-1 pl-2 border mail-row2 w-100'}" id="mailRow">
        <div class="d-flex align-items-center mr-5">
        ${window.innerWidth>577?'<input type="checkbox" class="mr-2" name="" id="">':''}
        ${window.innerWidth>577?`<p class="mb-0 font-weight-bold">${element.sender}</p>`:`<div class="w-100 d-flex justify-content-between"><p class="mb-0 font-weight-bold">${element.sender}</p> <span class="date">Oct 8</span> </div>`}
    </div>
    <div class=" d-flex  justify-content-around w-75 align-items-center  ${window.innerWidth>577?'':'w-100'}">
        <p class="mb-0"><span class="font-weight-bold">${element.subject}</span>----- <span class"text-muted text-justified">${element.emailBody.slice(0,36)}......</p>
        ${window.innerWidth>577?'<span class="date">Oct 8</span>':''}
        <div class="justify-content-around icons" id="icons">
            <button data-toggle="tooltip"  data-placement="bottom" title="Archive" class="mr-2 btn rounded-circle fa fa-archive  text-muted"></button>
            <button  class="fa fa-trash mr-2 text-muted btn rounded-circle" onclick="delMail(${i})"></button>
            <button data-toggle="tooltip"  data-placement="bottom" title="Snooze" class="fa fa-clock mr-2 text-muted btn  rounded-circle"></button>
            <button data-toggle="tooltip"  data-placement="bottom" title="Mark as Unread" class="btn rounded-circle fa fa-clock mr-2 text-muted"></button>
        </div>
        ${window.innerWidth>577?'':'<i class="fa fa-bars mt-5"></i>'}
    </div>
    </div>`
    })
}
function displayInp(){
    let composeBx = document.querySelector('.composeBox')
    composeBx.classList.contains('d-none')?composeBx.classList.replace('d-none','d-flex'):composeBx.classList.replace('d-flex','d-none')
}
function closeCompose(){
    document.querySelector('.composeBox').classList.replace('d-flex','d-none')
}
function delMail(i){
    mailIndex=i
    deletedMail.push(user.mailArray[mailIndex])
    user.mailArray.splice(mailIndex,1)
    show()
    showUndo(`Mail Deleted  <button class="btn btn-dark text-info" onclick="undoDelete()">Undo</button>  <span class="mb-0">3</span>`)
    
}
const showUndo=function(param){
    if(undoTimer > 0){
        // debugger
        undoBlock.innerHTML=param
        document.getElementById('undoBlock').classList.remove('d-none')
        setTimeout(() => {
            undoTimer--
            showUndo(param)
        }, 1000);
    }else{
        document.getElementById('undoBlock').classList.add('d-none')
        undoTimer=3
    }
}
function undoDelete(){
    user.mailArray.push(deletedMail[deletedMail.length - 1])
    deletedMail.pop()
    show()
}
// function delMail(){
//     document.querySelector('body').classList.remove('modal-open')
//     document.querySelector('#staticBackdrop').classList.remove('show')
//     staticBackdrop.style.display='none'
//     document.querySelector('.modal-backdrop').classList.add('d-none')
   
// }
progressBar();
function showSignOutBox(){
    document.getElementById('currUserAccount').innerHTML=`<h1>${user.firstName.charAt('0')}</h1>`
    document.querySelector('#signOutBox #userNames').innerHTML=`${user.firstName +' '+ user.lastName}`
    document.querySelector('#signOutBox #userUserName').innerHTML=`${user.userName}`
    if( document.getElementById('signOutBox').classList.contains('d-none')){
        document.getElementById('signOutBox').classList.replace('d-none','d-flex')
    }else{
        document.getElementById('signOutBox').classList.replace('d-flex','d-none')
    }
}
function signInPage(){
    window.location.href='./index.html'
}
function sendMail(){
    if(!mRecipient.value){
        sendMailBtn.setAttribute('data-toggle','modal')
        sendMailBtn.setAttribute('data-target','#staticBackdrop')
        document.querySelector('.modal-title').innerHTML='Error'
        document.querySelector('.modal-body').innerHTML='Enter at least one recipient to send the mail to'
        document.querySelector('body').classList.add('modal-open')
    }else if(typeof userArray.find(element =>{return element.userName == mRecipient.value}) !== 'object'){
        console.log(userArray.find(element =>{return element.userName == mRecipient.value}));
        sendMailBtn.setAttribute('data-toggle','modal')
        sendMailBtn.setAttribute('data-target','#staticBackdrop')
        document.querySelector('.modal-title').innerHTML='Error'
        document.querySelector('.modal-body').innerHTML=`The address "${mRecipient.value}" in the "To" field was not recognised. Please make sure that all addresses are properly formed.`
        document.querySelector('body').classList.add('modal-open')
    }else if(mRecipient.value && mBody.value && mSubject.value){
        // let findRecipient = userArray.find(element=>{
        //     return element.userName == mRecipient.value;
        // })
        // console.log(findRecipient);
        // if (findRecipient) {
        //     findRecipient.mailArray.push({sender:user.firstName,subject:mSubject.value,emailBody:mBody.value})
        //     localStorage.setItem('userArr',JSON.stringify(userArray))
        sendd(mRecipient,mSubject,mBody)
            displayInp()
            if(undoTimer >=2){
                showUndo(`Sending....`)
            }else if(undoTimer < 2){
                showUndo(`Sent`)
            }   
        // }
    }
    // Remove modal call from button
   setTimeout(() => {
    if (document.querySelector('body').classList.contains('modal-open')) {
        document.querySelector('body').classList.remove('modal-open')
        sendMailBtn.removeAttribute('data-toggle')
        sendMailBtn.removeAttribute('data-target')
        console.log('done');
    }
   }, 1000);
}
function sendd(recipient,subject,body){
    debugger
    let rec = recipient.value
    let sub= subject.value
    let bdy = body.value
    let findRecipient = userArray.find(element=>{
        return element.userName == rec;
    })
    console.log(findRecipient);
    if (findRecipient) {
        findRecipient.mailArray.push({sender:user.firstName,subject:sub,emailBody:bdy})
        localStorage.setItem('userArr',JSON.stringify(userArray))
    }
}

///////////////////////////////Mobile buttons and functions//////////////////////////////////////////////////////////
function typeMail(){
    document.getElementById('defaultPage').classList.add('d-none')
    document.getElementById('typePage').classList.remove('d-none')
   
    console.log(userArray);
}
function closeTypeMail(){
    document.getElementById('typePage').classList.add('d-none')
    document.getElementById('defaultPage').classList.remove('d-none')
}

function sendMobileMail(){
    if(!mobileRecipient.value){
        document.getElementById('noRecipient').innerHTML='Please add a recipient'
    } else if(typeof userArray.find(element =>{return element.userName == mobileRecipient.value}) !== 'object'){
        alert(`"${mobileRecipient.value}" isn't a valid Email Address Try sending again After fixing`)
    } else if(mobileRecipient.value && mobileBody.value && mobileSubject.value){
        sendd(mobileRecipient,mobileSubject,mobileBody)
        alert('sent')
        closeTypeMail()
    }
}