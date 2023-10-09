function validateEmail(email) {
    // regular expression pattern for a valid email address
    const pattern = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    // test method to check if the email matches the pattern
    return pattern.test(email);
}
  
module.exports = {
    validateEmail : validateEmail,
}