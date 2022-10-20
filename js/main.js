let userArray = [
  {
    firstName: "Emmanuel",
    lastName: "Ade",
    userName: "imaxx66@gmail.com",
    password: "1234abc#",
    starredMailArray:[],
    senderUsername:'mail@google.com',
    sentMailArray: [],
    mailArray: [
      {
        subject: "Security Alert",
        emailBody:
          "We noticed a new sign-in to your Google Account.If this was not you,you don't need to do Anything.If not We'll help you secure your Account",
        starred: false,
      },
      {
        subject: "Finish Account Set up",
        emailBody:
          ",A better experience is waiting. Take one minute to set up your device with Google Your new account comes with access to google products apps and services",
          starred: false,
      },
    ],
  },
];
let savedArr;
// savedArr = localStorage.setItem("userArr", JSON.stringify(userArray));
let [{ mailArray: mailArray }] = userArray;
let mails = localStorage.setItem("mailArr", JSON.stringify(mailArray));
console.log(mailArray);
let currentPage = 0;
let validity = false;
let nameVal = false;
let passwordVal = false;
let userNameVal = false;
// let checkUsers;
let pages = document.getElementsByClassName("page");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const userName = document.getElementById("userName");
const signUpPage = document.getElementById("signUp");
const signInPage = document.getElementById("signIn");
const recoveryMail = document.getElementById("recoveryMail");
const phoneNumber = document.getElementById("phoneNumber");
const gender = document.getElementById("gender");
const birthDay = document.getElementById("b-day");
const birthMonth = document.getElementById("b-month");
const birthYear = document.getElementById("b-year");

let getUsers = localStorage.getItem("userArr");
function checkUsers() {
  if (getUsers) {
    userArray = JSON.parse(getUsers);
  }
}
checkUsers();
function changeSignPage(id) {
  console.log(id);
  if (id == "toSignUp") {
    signIn.classList.add("d-none");
    signUp.classList.remove("d-none");
  } else {
    signUp.classList.add("d-none");
    signIn.classList.remove("d-none");
  }

  currentPage = 0;
  showPage(currentPage);
}
function showPage(i) {
  if (pages[i].id == "signUpIn") {
    pages[i].style.display = "block";
  } else {
    pages[i].style.display = "block";
  }
}
showPage(currentPage);
function nextPage() {
  if (currentPage == 0) {
    let inputNode;
    let inputsFilled = true;
    signInPage.classList.contains("d-none")
      ? (inputNode = pages[currentPage].querySelectorAll("#signUp input"))
      : (inputNode = pages[currentPage].querySelectorAll("#signIn input"));
    inputNode.forEach(function (element) {
      if (element.value == "") {
        inputsFilled = false;
      }
    });
    let index
    if (inputsFilled && signUpPage.classList.contains("d-none")) {
      let emailCheck = userArray.find((element, i ) => {
           index = i
        return element.userName == accountEmail.value;
      });
      if (emailCheck) {
        signInPage.classList.add("d-none");
        document.getElementById("userEmail").innerHTML = accountEmail.value;
        document.getElementById("signInPassword").classList.remove("d-none");
      } else {
        accountEmail.style.borderColor = "red";
        accountEmailP.innerHTML = "Google account not found";
      }
    } else if (inputsFilled && validity == true) {
      pages[currentPage].style.display = "none";
      currentPage++;
      document.getElementById(
        "welcomeText"
      ).innerHTML = `${firstName.value},Welcome to Google`;
      document.getElementById(
        "createdUsername"
      ).innerHTML = `${userName.value}@gmail.com`;
      let details = {
        firstName: firstName.value,
        lastName: lastName.value,
        userName: userName.value + "@gmail.com",
        password: password.value,
        starredMailArray:[],
        senderUsername:'mail@google.com',
        sentMailArray: [],
        mailArray: [
          {
            sender: "Google",
            subject: "Finish Account Set up",
            emailBody:
              ",A better experience is waiting. Take one minute to set up your device with Google",
            starred: false,
          },
        ],
      };
      userArray.push(details);
      savedArr = localStorage.setItem("userArr", JSON.stringify(userArray));
      showPage(currentPage);
    } else if (validity !== true) {
      alert("Fill all fields in the correct order");
    } else {
      alert("Please Fill all Fields correctly");
    }
  } else if (currentPage == 1) {
    if (
      gender.value &&
      birthDay.value &&
      birthMonth.value &&
      birthYear.value &&
      Number(birthDay.value) < 32 &&
      Number(birthYear.value < 2022)
    ) {
      pages[currentPage].style.display = "none";
      currentPage++;
      showPage(currentPage);
    } else if( Number(birthYear.value) > 2022 || Number(birthDay.value) > 32){
        if(Number(birthYear.value) > 2022){
            birthYear.style.borderColor= 'red'
            birthDay.style.borderColor= 'black'
        }else if(Number(birthDay.value) > 32){
            birthDay.style.borderColor= 'red'
            birthYear.style.borderColor= 'black'
        }   
    }else {
      alert("Fill all required fields");
    }
  } else if (
    currentPage < pages.length - 1 &&
    validity == true &&
    currentPage !== "0"
  ) {
    pages[currentPage].style.display = "none";
    currentPage++;
    showPage(currentPage);
  } else {
    console.log("fill all inputs");
  }
}
function prevPage() {
  pages[currentPage].style.display = "none";
  currentPage--;
  showPage(currentPage);
}

function validateName(inpId) {
  let nameRegex = /^[A-Za-z]{2,}$/;
  let userNameReg = /^[0-9-A-Za-z\#\_\+\.]{3,25}$/;
  const input = document.getElementById(inpId);
  const userNameP = document.getElementById("userNameP");
  const userNameSpan = document.getElementById("basic-addon2");
  if (inpId == "firstName" || inpId == "lastName") {
    if (nameRegex.test(input.value)) {
      input.classList.remove("border-danger");
      nameVal = true;
    } else {
      input.classList.add("border-danger");
      nameVal = false;
    }
  } else if (inpId == "userName") {
    if (userNameReg.test(input.value)) {
      console.log("TRUE");
      userName.classList.remove("border-danger");
      userNameSpan.classList.remove("border-danger");
      let nameCheck = userArray.find((element) => {
        return element.userName == `${input.value}@gmail.com`;
      });
      if (nameCheck) {
        console.log("found");
        userNameVal = false;
        userNameP.innerHTML =
          '<span class="text-danger text-left mr-1">Username already exists...</span>';
        userNameP.innerHTML += `Available: <span class="link-style mr-2">${
          lastName.value.slice(2, -2) + generate()
        }</span><span class="link-style">${
          firstName.value.slice(0, -2) + generate()
        }</span>`;
      } else {
        userNameVal = true;
        userNameP.innerHTML = "";
      }
    } else {
      console.log("False");
      userName.classList.add("border-danger");
      userNameSpan.classList.add("border-danger");
      userNameVal = false;
    }
  }
}
function showLabel(labelId, inputId) {
  let passwordReg = /^(?=.*[A-Za-z0-9])(?=.*[#\$\@\.\*])(?=.{8,})/;
  const inpId = document.getElementById(inputId);
  const passText2 = document.getElementById("passText2");
  const passText1 = document.getElementById("passText1");
  if (inpId.value !== "") {
    document.getElementById(labelId).classList.remove("d-none");
    if (inputId == "password") {
      if (passwordReg.test(inpId.value)) {
        console.log("passed test");
        inpId.classList.remove("border-danger");
        passText2.style.color = "black";
        passwordVal = true;
      } else {
        inpId.classList.add("border-danger");
        passText2.style.color = "red";
        passwordVal = false;
      }
    }
    if (inputId == "confirmPassword") {
      if (password.value == confirmPassword.value) {
        inpId.classList.remove("border-danger");
        passText1.innerHTML = "";
        passwordVal = true;
      } else {
        inpId.classList.add("border-danger");
        passText1.style.color = "red";
        passText1.innerHTML = "Passwords do not match";
        passwordVal = false;
      }
    }
  } else {
    document.getElementById(labelId).classList.add("d-none");
  }
}
let timerr = setInterval(() => {
  // debugger
  if (nameVal == true && passwordVal == true && userNameVal == true) {
    validity = true;
  } else {
    validity = false;
  }
}, 1000);
function generate() {
  randNo = (Math.random() * 690).toString().slice(-3);
  return randNo;
}
function showPassword() {
  if (password.type == "password") {
    password.type = "text";
    confirmPassword.type = "text";
  } else {
    password.type = "password";
    confirmPassword.type = "password";
  }
}
function passwordToggle() {
  document.getElementById("accountPassword").type == "password"
    ? (document.getElementById("accountPassword").type = "text")
    : (document.getElementById("accountPassword").type = "password");
}

////////////////////////////////////////
function openMail() {
  let userCheck = userArray.find(function (element) {
    return (
      element.userName == accountEmail.value &&
      element.password == accountPassword.value
    );
  });
  if (userCheck) {
    localStorage.removeItem("currentUser");
    localStorage.setItem("currentUser", accountEmail.value);
    savedArr = localStorage.setItem("userArr", JSON.stringify(userArray));
    window.location.href = "./mailPage.html";
  } else if (validity == true) {
    localStorage.removeItem("currentUser");
    localStorage.setItem("currentUser", `${userName.value}@gmail.com`);
    savedArr = localStorage.setItem("userArr", JSON.stringify(userArray));
    window.location.href = "./mailPage.html";
  } else {
    console.log(document.getElementById("accountPassword").value);
    passwordError.innerHTML =
      "⛔ Wrong password,try again or click 'forgot password' to reset it";
    accountPassword.style.borderColor = "red";
  }
}
