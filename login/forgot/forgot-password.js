// forgot.js -> API_BASE को configure.js से लेता है

function sendOTP() {
    let email = document.getElementById("email").value.trim();
    let emailError = document.getElementById("emailError");
    emailError.innerText = "";

    if (!email) {
        emailError.innerText = "Please enter your registered email";
        return;
    }

    emailError.innerText = "Sending OTP...";

    fetch(`${API_BASE}/forgot/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            sessionStorage.setItem("resetEmail", email); // बाद में Reset पेज में यूज़
            document.getElementById("step1").style.display = "none";
            document.getElementById("step2").style.display = "block";
            emailError.innerText = "";
        } else {
            emailError.innerText = data.message || "Invalid Email";
        }
    })
    .catch(() => emailError.innerText = "Server Error. Try again.");
}

function verifyOTP() {
    let email = sessionStorage.getItem("resetEmail");
    let otp = document.getElementById("otp").value.trim();
    let otpError = document.getElementById("otpError");

    if (!otp) {
        otpError.innerText = "Please enter OTP";
        return;
    }
    otpError.innerText = "Verifying OTP...";

    fetch(`${API_BASE}/forgot/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            document.getElementById("step2").style.display = "none";
            document.getElementById("step3").style.display = "block";
            otpError.innerText = "";
        } else {
            otpError.innerText = data.message || "OTP Invalid or Expired";
        }
    })
    .catch(() => otpError.innerText = "Server Error. Try again.");
}

function updatePassword() {
    let email = sessionStorage.getItem("resetEmail");
    let newPass = document.getElementById("newPass").value;
    let confirmPass = document.getElementById("confirmPass").value;
    let passError = document.getElementById("passError");

    let passRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{6,}$/;

    if (!passRegex.test(newPass)) {
        passError.innerText = "Password must have 1 uppercase, 1 number & 1 symbol.";
        return;
    }
    if (newPass !== confirmPass) {
        passError.innerText = "Passwords do not match";
        return;
    }
    passError.innerText = "Updating password...";

    fetch(`${API_BASE}/forgot/update-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: newPass })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            document.getElementById("step3").style.display = "none";
            document.getElementById("successMsg").innerText = "Your password changed successfully!";
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        } else {
            passError.innerText = data.message || "Password Update Failed";
        }
    })
    .catch(() => passError.innerText = "Server Error. Try again.");
}
