class Chatbox {
  constructor() {
    this.args = {
      openButton: document.querySelector('.chatbox__button'),
      chatBox: document.querySelector('.chatbox__support'),
      sendButton: document.getElementById("Submit_Button"),
      form: document.getElementById('user-info-form'),
    };
    this.state = false;
    this.messages = [];
  }

  display() {
    const { openButton, chatBox, sendButton} = this.args;

    openButton.addEventListener('click', () => this.toggleState(chatBox));

    sendButton.addEventListener('click', () => this.onSendButton(chatBox));

    const node = chatBox.querySelector('input');
    node.addEventListener("keyup", ({ key }) => {
      if (key === "Enter") {
        this.onSendButton(chatBox);
      }
    })
    
   }
  toggleState(chatbox) {
    this.state = !this.state;
  
      // show or hides the box
      if (this.state) {
        chatbox.classList.add('chatbox--active');
      } else {
        chatbox.classList.remove('chatbox--active');
      }
  }
}

var startChatButton = document.getElementById('start_chat');
        startChatButton.disabled = true;

// Select the form element
var userInfoForm = document.querySelector('#user-info-form');

// Select the form inputs
var nameInput = document.querySelector('#name-input');
var emailInput = document.querySelector('#email-input');
var phoneInput = document.querySelector('#phone-input');

// Select the error message elements
var nameErrorMessage = document.querySelector('#name-error-message');
var emailErrorMessage = document.querySelector('#email-error-message');
var phoneErrorMessage = document.querySelector('#phone-error-message');

// Add a submit event listener to the form
userInfoForm.addEventListener('submit', function(event) {
  // Prevent the form from submitting
  event.preventDefault();

  // Validate the name input
  if (nameInput.value === '') {
    nameErrorMessage.innerHTML = 'Please enter your name.';
    return;
  }
  else if (!isValidName(nameInput.value)) {
    nameErrorMessage.innerHTML = 'Please enter a valid name.';
    return;
  } else {
    nameErrorMessage.innerHTML = '';
  }

  // Validate the email input
  if (emailInput.value === '') {
    emailErrorMessage.innerHTML = 'Please enter your email address.';
    return;
  } else if (!isValidEmail(emailInput.value)) {
    emailErrorMessage.innerHTML = 'Please enter a valid email address.';
    return;
  } else {
    emailErrorMessage.innerHTML = '';
  }

  // Validate the phone input
  if (phoneInput.value === '') {
    phoneErrorMessage.innerHTML = 'Please enter your phone number.';
    return;
  } else if (!isValidPhone(phoneInput.value)) {
    phoneErrorMessage.innerHTML = 'Please enter a valid phone number.';
    return;
  } else {
    phoneErrorMessage.innerHTML = '';
  }

// Sending otp to the user email
var sendOTPBtn = document.querySelector('#send_otp');
// add click event listener to the send_otp button
sendOTPBtn.addEventListener('click', function(event) {
    event.preventDefault(); // prevent default form submission behavior
    
    var emailInput = document.querySelector('#email-input');
    var userEmail = emailInput.value;
    fetch('/send_otp_email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userEmail })
    })
    .then(response => {
      if (response.ok) {
        // show message that OTP is sent
        alert("OTP sent to your email!");
      } else {
        // show error message
        alert("Error sending OTP. Please enter valid email.");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });


  var verifyBtn = document.querySelector('#verify_otp');

  // add event listener to the verify button
  verifyBtn.addEventListener('click', function(event) {
    event.preventDefault(); // prevent default form submission behavior
    
    // get the otp input field value
    var otpInput = document.querySelector('#otp-input');
    var userOtp = otpInput.value;
  
    // send the otp value to the server for verification
    fetch('/verify_otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ otp: userOtp })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        alert(data.message);
        var startChatButton = document.getElementById('start_chat');
        startChatButton.disabled = false;
      } else {
        var errorMessage = document.querySelector('#error-message');
        errorMessage.textContent = data.message;
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });



  // If all inputs are valid, send an AJAX request to store the user details
  if(event.submitter.id==='start_chat')
  {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/user_info', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // If the request was successful, redirect to the chat page
        window.location.href = '/index';
        nameErrorMessage.innerHTML = '';
        emailErrorMessage.innerHTML = '';
        phoneErrorMessage.innerHTML = '';
      } else {
        // If the request failed, display an error message
        alert('Error: ' + xhr.responseText);
      }
    }
  }; 
  var userData = {
    'name': nameInput.value,
    'email': emailInput.value,
    'phone': phoneInput.value
  };
  xhr.send(JSON.stringify(userData));
 }
});

// Function to validate email address
function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate phone number
function isValidPhone(phone) {
  var phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}
// Function to validate name
function isValidName(name) {
  var nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(name);
}

const chatbox = new Chatbox();
chatbox.display();