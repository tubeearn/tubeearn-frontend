<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Forgot / Reset Password</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body, html { margin:0; padding:0; font-family:Arial,sans-serif; background:linear-gradient(135deg,#6a11cb,#2575fc);}
.page-wrapper { display:flex; justify-content:center; align-items:flex-start; min-height:100vh; padding-top:30px;}
.form-box { background:white; width:21cm; padding:30px; border-radius:10px; box-shadow:0 0 15px rgba(0,0,0,0.2); text-align:center;}
h2{color:#333;margin-bottom:20px;}
input {width:80%;padding:12px;margin:10px auto;border:1px solid #ccc;border-radius:5px;font-size:16px;}
button {padding:12px 25px;background:#2575fc;color:white;border:none;border-radius:5px;cursor:pointer;}
button:hover{background:#1a5fd1;}
small{display:block;font-size:14px;color:red;}
#successMsg{color:green;margin-top:15px;}
</style>
</head>
<body>
<div class="page-wrapper">
<div class="form-box">
    <h2>Forgot Password</h2>

    <div id="step1">
        <input type="email" id="email" placeholder="Enter Registered Email">
        <small id="emailError"></small>
        <button onclick="sendOTP()">Send OTP</button>
    </div>

    <div id="step2" style="display:none;">
        <input type="text" id="otp" placeholder="Enter OTP">
        <small id="otpError"></small>
        <button onclick="verifyOTP()">Verify OTP</button>
    </div>

    <div id="step3" style="display:none;">
        <input type="password" id="newPass" placeholder="Enter new password">
        <small>Password must contain 1 uppercase, 1 number & 1 symbol</small>
        <input type="password" id="confirmPass" placeholder="Confirm password">
        <small id="passError"></small>
        <button onclick="updatePassword()">Submit</button>
    </div>

    <p id="successMsg"></p>
</div>
</div>

<script src="secure/config/configuration.js"></script>
<script>
// Step 1: Send OTP
function sendOTP(){
    let email=document.getElementById("email").value.trim();
    let emailError=document.getElementById("emailError");
    if(!email){ emailError.innerText="Please enter your registered email"; return; }
    emailError.innerText="Sending OTP...";
    fetch(`${API_BASE}/forgot/send-otp`,{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email})
    })
    .then(r=>r.json()).then(d=>{
        if(d.success){
            sessionStorage.setItem("resetEmail",email);
            document.getElementById("step1").style.display="none";
            document.getElementById("step2").style.display="block";
            emailError.innerText="";
        }else{ emailError.innerText=d.message || "Failed to send OTP"; }
    }).catch(()=> emailError.innerText="Server error. Try again.");
}

// Step 2: Verify OTP
function verifyOTP(){
    let email=sessionStorage.getItem("resetEmail");
    let otp=document.getElementById("otp").value.trim();
    let otpError=document.getElementById("otpError");
    if(!otp){ otpError.innerText="Please enter OTP"; return; }
    otpError.innerText="Verifying OTP...";
    fetch(`${API_BASE}/forgot/verify-otp`,{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,otp})
    })
    .then(r=>r.json()).then(d=>{
        if(d.success){
            document.getElementById("step2").style.display="none";
            document.getElementById("step3").style.display="block";
            otpError.innerText="";
        }else{ otpError.innerText=d.message || "Invalid or expired OTP"; }
    }).catch(()=> otpError.innerText="Server error. Try again.");
}

// Step 3: Update Password
function updatePassword(){
    let email=sessionStorage.getItem("resetEmail");
    let newPass=document.getElementById("newPass").value.trim();
    let confirmPass=document.getElementById("confirmPass").value.trim();
    let passError=document.getElementById("passError");
    let passRegex=/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{6,}$/;
    if(!passRegex.test(newPass)){ passError.innerText="Password must have 1 uppercase, 1 number & 1 symbol."; return; }
    if(newPass!==confirmPass){ passError.innerText="Passwords do not match"; return; }
    passError.innerText="Updating password...";
    fetch(`${API_BASE}/forgot/update-password`,{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,password:newPass})
    })
    .then(r=>r.json()).then(d=>{
        if(d.success){
            document.getElementById("successMsg").innerText="Password changed successfully!";
            sessionStorage.removeItem("resetEmail");
            passError.innerText="";
            setTimeout(()=> window.location.href="login.html",2000);
        }else{ passError.innerText=d.message || "Failed to update password"; }
    }).catch(()=> passError.innerText="Server error. Try again.");
}
</script>
</body>
</html>
