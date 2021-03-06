// Find the elements of the HTML that we will be interacting with
var generateBtn = document.querySelector("#generate");
var passwordText = document.querySelector("#password");

// Declare password variable
var password = ""

// Declare utility variables - Maybe later, we could call these functions from buttons, or a form with checkboxes...
// return a random lowercase
var randomLower = function () { // declare the variable
  var lower = 'abcdefghijklmnopqrstuvwxyz'; // creates a string with all possible characters
  return lower[Math.floor(Math.random() * lower.length)]; // round down, and multiple times lenght of the string to get a number.
}

// return a random uppercase
var randomUpper = function () {
  var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return upper[Math.floor(Math.random() * upper.length)];
}

// return a random number
var randomNumber = function () {
  var num = '123456790';
  return num[Math.floor(Math.random() * num.length)];
}

// return a random special character - note that "\" is used as an escape character to allow for single quote
var randomSpecial = function () {
  var sym = '~`!@#$%^&*()-_+={}[]|\;:"<>,./?\'';
  return sym[Math.floor(Math.random() * sym.length)];
}

// Array to store the properties (functions) to be chosen below 
var passwordProperties = []

//  function that will randomly execute one of the functions stored in the passwordProperties array (so that passwords' structure is also random)
var mixer = function () {
  return passwordProperties[Math.floor(Math.random() * passwordProperties.length)]();
}

// This is where the user interaction happens
function writePassword() {

  // Sets the password lenght
  var charCount = prompt("How many characters? (Between 8 - 128 characters)");
  if (charCount < 8 | charCount > 128) {
    return alert("That is not a number between 8 and 128");
  }
  else if (isNaN(charCount) == true) // If it is TRUE that the value entered is NOT A NUMBER
  {
    return alert("That is not even a number!");
  }

  // Ask for the properties of the password
  var lowerCase = confirm("Do you want lowercase letters?");
  if (lowerCase === true) {
    passwordProperties.push(randomLower);  // Push adds new items to the passwordProperties array.
  }
  var upperCase = confirm("Do you want uppercase letters?");
  if (upperCase === true) {
    passwordProperties.push(randomUpper);
  }
  var num = confirm("Do you want numbers?");
  if (num === true) {
    passwordProperties.push(randomNumber);
  }
  var specialChar = confirm("Do you want special characters?");
  if (specialChar === true) {
    passwordProperties.push(randomSpecial);
  }

  // At least one property must be chosen
  else if (lowerCase === false && upperCase === false && num === false && specialChar == false) {
    return alert("You must select at least 1 of the 4 options, please try again");
  }

  // Execute the mixer as many times as characters were chosen
  for (var i = 0; i < charCount; i++) {
    password += mixer(); // appends the result of the mixer to the password variable
  }

  //Write the password in the box we declared at the top
  passwordText.value = password;
}

// Ask button to run writePassword function when clicked.
generateBtn.addEventListener("click", writePassword);