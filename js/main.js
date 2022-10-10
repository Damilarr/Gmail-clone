let userArray =[{firstName:'Emmanuel',lastName:'Ade',userName:'imaxx66@gmail.com',password:'1234abc#'}]
let currentPage = 0
let  validity = false
let pages = document.getElementsByClassName('page')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirmPassword')
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const userName = document.getElementById('userName')
const signUpPage = document.getElementById('signUp')
const signInPage = document.getElementById('signIn')
const recoveryMail = document.getElementById('recoveryMail')
const phoneNumber = document.getElementById('phoneNumber')
const gender = document.getElementById('gender')
const birthDay = document.getElementById('b-day')
const birthMonth = document.getElementById('b-month')
const birthYear = document.getElementById('b-year')


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
    if (currentPage == 0){
        let inputNode;
        let inputsFilled = true
        signInPage.classList.contains('d-none')
        ?inputNode = (pages[currentPage].querySelectorAll('#signUp input'))
        :inputNode = (pages[currentPage].querySelectorAll('#signIn input'));
        inputNode.forEach(function (element) {
            if (element.value == '') {
                inputsFilled = false                
            }
          });
        if(inputsFilled && validity == true){
            pages[currentPage].style.display='none'
            currentPage++
            document.getElementById('welcomeText').innerHTML=`${firstName.value},Welcome to Google`;
            document.getElementById('createdUsername').innerHTML =`${userName.value}@gmail.com`
            showPage(currentPage)
        }else if(inputsFilled && signUpPage.classList.contains('d-none')){
            let emailCheck = userArray.find(element=>{
                return element.userName == accountEmail.value
            });
            if(emailCheck){
                signInPage.classList.add('d-none')
                document.getElementById('signInPassword').classList.remove('d-none')
            }else{
                accountEmail.style.borderColor='red'
                accountEmailP.innerHTML='Google account not found'
            }
        }else if(validity !== true){
            alert('Fill all fields in the correct order')
        }else{
            alert('Please Fill all Fields correctly')
        }
    }else if(currentPage == 1){
        if(gender.value && birthDay.value && birthMonth.value && birthYear.value && (Number(birthDay.value) < 32)){
            pages[currentPage].style.display='none'
            currentPage++
            showPage(currentPage)
        }else{
            alert('Fill all required fields')
        }
    } else if(currentPage < pages.length - 1 && validity == true && currentPage !=='0'){
        pages[currentPage].style.display='none'
        currentPage++
        showPage(currentPage)
    }
    else{
       console.log('fill all inputs');
    }
}
function prevPage(){
    pages[currentPage].style.display='none'
    currentPage--
    showPage(currentPage)
}

function validateName(inpId){
    let nameRegex = /^[A-Za-z]{2,}$/
    let userNameReg = /^[0-9-A-Za-z\#\_\+\.]{3,25}$/
    const input = document.getElementById(inpId)
    const userNameP = document.getElementById('userNameP')
    const userNameSpan =  document.getElementById('basic-addon2')
    if(inpId == 'firstName' || inpId == 'lastName' ){
        if (nameRegex.test(input.value)) {
            input.classList.remove('border-danger')
            validity = true
        } else {
            input.classList.add('border-danger')
            validity = false
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
               userNameP.innerHTML +=`Available: <span class="link-style mr-2">${lastName.value.slice(2,-2) + generate()}</span><span class="link-style">${firstName.value.slice(0,-2) + generate()}</span>`
               validity = false
            }else{
               validity = true
           }
        } else{
            console.log('False');
            userName.classList.add('border-danger')
           userNameSpan.classList.add('border-danger')
           validity = false
        }
    }
}
function showLabel(labelId,inputId){
    let passwordReg = /^(?=.*[A-Za-z0-9])(?=.*[#\$\@\.\*])(?=.{8,})/
    const inpId = document.getElementById(inputId)
    const passText2 = document.getElementById('passText2')
    const passText1 = document.getElementById('passText1')
    if(inpId.value !== ''){
        document.getElementById(labelId).classList.remove('d-none')
        if(inputId =='password'){
            if (passwordReg.test(inpId.value)) {
                console.log('passed test');
                inpId.classList.remove('border-danger')
                passText2.style.color='black';
                validity = true
                
            } else{
                inpId.classList.add('border-danger');
                passText2.style.color='red';
                validity = false
            }
        }
        if (inputId == 'confirmPassword') {
            if (password.value == confirmPassword.value) {
                inpId.classList.remove('border-danger')
                passText1.innerHTML='';
                validity = true
            }else{
                inpId.classList.add('border-danger')
                passText1.style.color='red'
                passText1.innerHTML='Passwords do not match'
                validity = false
            }
        }
        
    }else{
        document.getElementById(labelId).classList.add('d-none')   
    }
}
function generate(){
    randNo = (Math.random()*690).toString().slice(-3)
    return randNo;
}
function showPassword(){
    if(password.type == 'password'){
        password.type = 'text'
        confirmPassword.type = 'text'
    }else{
        password.type = 'password'
        confirmPassword.type = 'password'
    }
}
function passwordToggle(){
    document.getElementById('accountPassword').type == 'password'
    ?document.getElementById('accountPassword').type ='text'
    :document.getElementById('accountPassword').type='password'
}

////////////////////////////////////////
function openMail(){
    let userCheck = userArray.find(function (element) {
        return element.userName == accountEmail.value && element.password == accountPassword.value;
    });
    if (userCheck) {
        console.log(userCheck,typeof userCheck);
        fBtn.setAttribute('formaction','./mailPage.html')

    }else{
        passwordError.innerHTML ='⛔ Wrong password,try again or click \'forgot password\' to reset it'
        accountPassword.style.borderColor='red'
    }
}