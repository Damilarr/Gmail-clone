let userArray =[{firstName:'Emmanuel',lastName:'Ade',userName:'imaxx66@gmail.com'}]
let currentPage = 0
let pages = document.getElementsByClassName('page')
function changeSignPage(id){
    console.log(id);
    if(id=='toSignUp'){
        signIn.classList.add('d-none')
        signUp.classList.remove('d-none')
    } else{
        signUp.classList.add('d-none')
        signIn.classList.remove('d-none')
    }
   
    currentPage = 0
    showPage(currentPage)
}
function showPage(i){
    if(pages[i].id =='signUpIn'){
        pages[i].style.display = 'block'
    }else{
        pages[i].style.display = 'block'
    }
    

}
showPage(currentPage)
function nextPage(){
   if(currentPage < pages.length - 1){
       pages[currentPage].style.display='none'
       currentPage++
       showPage(currentPage)
   }
}
function prevPage(){
    pages[currentPage].style.display='none'
    currentPage--
    showPage(currentPage)
}





function validateName(inpId){
    let nameRegex = /^[A-Za-z]{5,18}$/
    let userNameReg = /^[0-9-A-Za-z\#\_\+\.]{3,25}$/
    const input = document.getElementById(inpId)
    const userNameP = document.getElementById('userNameP')
    const userName = document.getElementById('userName')
    const userNameSpan =  document.getElementById('basic-addon2')
    if(inpId == 'firstName' || inpId == 'lastName' ){
        if (nameRegex.test(input.value)) {
            input.classList.remove('border-danger')
        } else {
            input.classList.add('border-danger')
        }   
    } else if(inpId == 'userName'){
        if (userNameReg.test(input.value)) {
            console.log('TRUE');
            userName.classList.remove('border-danger')
           userNameSpan.classList.remove('border-danger')
           let nameCheck = userArray.find(element=>{
                return element.userName == `${input.value}@gmail.com`
            });
           if(nameCheck){
               console.log('found');
               userNameP.innerHTML ='<span class="text-danger text-left mr-1">Username already exists...</span>'
               userNameP.innerHTML +=`Available: <span class="link-style mr-2">${firstName.value.slice(2,-2) + generate()}</span><span class="link-style">${firstName.value.slice(0,-2) + generate()}</span>`
           }
        } else{
            console.log('False');
            userName.classList.add('border-danger')
           userNameSpan.classList.add('border-danger')
        }
        // if(!userCheck){
        //     document.getElementById('userName').classList.add('border-danger')
        //     document.getElementById('basic-addon2').classList.add('border-danger')
        //     userNameP.innerHTML =`Available: <span class="link-style mr-2">${firstName.value.slice(2,-2) + generate()}</span><span class="link-style">${firstName.value.slice(0,-2) + generate()}</span>`
        // } else{
        //     document.getElementById('userName').classList.remove('border-danger')
        //     document.getElementById('basic-addon2').classList.remove('border-danger')
        // }
    }
}
function showLabel(labelId,inputId){
    if(document.getElementById(inputId).value !== ''){
        document.getElementById(labelId).classList.remove('d-none')
    }else{
        document.getElementById(labelId).classList.add('d-none')   
    }
}
function generate(){
    randNo = (Math.random()*690).toString().slice(-3)
    return randNo
}
function showPassword(){
    let password = document.getElementById('password')
    let passConfirm = document.getElementById('confirmPassword')
    if(password.type == 'password'){
        password.type = 'text'
        confirmPassword.type = 'text'
    }else{
        password.type = 'password'
        confirmPassword.type = 'password'
    }
}