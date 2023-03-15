const firebaseConfig = {
  apiKey: "AIzaSyAbfWJHTmKqg4AvNmDfrpR8Tq7eGxfv_ss",
  authDomain: "contact-form-4d5ef.firebaseapp.com",
  databaseURL: "https://contact-form-4d5ef-default-rtdb.firebaseio.com",
  projectId: "contact-form-4d5ef",
  storageBucket: "contact-form-4d5ef.appspot.com",
  messagingSenderId: "464606240347",
  appId: "1:464606240347:web:a9783c6976ad14bbc5697e",
  measurementId: "G-V560W0WLN5"
};

// inisialisasi
firebase.initializeApp(firebaseConfig);

// msk db
let database = firebase.database().ref('contact');

let form = document.getElementById('form');
let username = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let comment = document.getElementById('comment');

form.addEventListener('submit', e => {
  e.preventDefault();

  validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const checkEmail = email => {
    var counter = 0
    for(let i = 0; i < email.length; i++){
        if(email.charAt(i) == '@') counter++;
    }
    if(email.endsWith('.com')){
        counter++;
    }

    if(counter == 2){
        return true
    }
    else{
        return false
    }
}

const validateInputs = () => {
    let usernameValue = username.value.trim();
    let emailValue = email.value.trim();
    let phoneValue = phone.value.trim();
    let commentValue = comment.value;    
    let count = 0;

    if(usernameValue === '' || usernameValue == null) {
        setError(username, 'Username is required!');
    } else {
        setSuccess(username);
        count++;
    }

    if(emailValue === '' || emailValue == null) {
        setError(email, 'Email is required!');
    } else if (!checkEmail(emailValue)) {
        setError(email, 'Please enter a valid email address!');
    } else {
        setSuccess(email);
        count++;
    }

    if(phoneValue === '' || phoneValue == null) {
        setError(phone, 'Phone number is required!');
    }
    else if(phoneValue.length > 14){
        setError(phone, 'Phone number must not exceed 14 characters!');
    }
    else if (phoneValue[0] != '0' && phoneValue[1] != '8'){
        setError(phone, 'Phone number must starts with 08!');
    }
    else{
      setSuccess(phone);
      count++;
    }

    let wordCount = 0;

    for(var i = 0; i < commentValue.length; i++){
      if(commentValue[i] == " "){
        wordCount++;
      }
    }

    if(commentValue === '' || commentValue == null) {
      setError(comment, 'Comment is required!');
    }
    else if(wordCount < 4){
      setError(comment, 'Comment must be at least 5 words long!');
    }
    else if(wordCount > 99){
      setError(comment, 'Comment must not exceed 100 words!');
    }    
    else{
      setSuccess(comment);
      count++;      
    }

    if(count == 4){
      // mskin ke db
      let newContact = database.push();

      // ngirim data
      newContact.set({
        name: usernameValue,
        email: emailValue,
        phone: phoneValue,
        comment: commentValue
      });       

      window.location.href="./index.html";
    }
};

function show(){
  var x = document.getElementById("nav-mobile-overlay");
  if (x.style.visibility === "hidden") {
    x.style.visibility = "visible";
  } else {
    x.style.visibility = "hidden";
  }
}

function hide(){
  var x = document.getElementById("nav-mobile-overlay");
  if (x.style.visibility === "visible") {
    x.style.visibility = "hidden";
  } else {
    x.style.visibility = "visible";
  }
}