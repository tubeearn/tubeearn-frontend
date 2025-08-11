function sendOTP() {
    let email = document.getElementById("email").value.trim();
    let emailError = document.getElementById("emailError");

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
            sessionStorage.setItem("resetEmail", email);
            document.getElementById("step1").style.display = "none";
            document.getElementById("step2").style.display = "block";
            emailError.innerText = "";
        } else {
            emailError.innerText = data.message || "Failed to send OTP";
        }
    })
    .catch(() => emailError.innerText = "Server error. Try again.");
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
            window.location.href = "reset-password.html";
        } else {
            otpError.innerText = data.message || "OTP invalid or expired";
        }
    })
    .catch(() => otpError.innerText = "Server error. Try again.");
}
