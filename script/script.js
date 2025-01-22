// check the password
function validatePassword(){
    let userName = document.getElementById('nameId').value;
    let passWord = document.getElementById('passwordId').value;
    

    let correctUsername = "customer1";
    let correctPassword = "1234";

    if (userName == correctUsername && passWord == correctPassword)
    {   
        window.location.href = "dashboard.html";
    }
    else{
        alert("UserAccount and Password don't match");
    }
}

//Go to Form list
function fillForm(){
window.location.href= "Form.html";
}


