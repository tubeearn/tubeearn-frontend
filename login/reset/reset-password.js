// reset-password.js
// API_BASE = secure/config/configure.js से लिया जा रहा है

function updatePassword() {
    let newPass = document.getElementById("newPass").value;
    let confirmPass = document.getElementById("confirmPass").value;
    let passError = document.getElementById("passError");

    let passRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{6,}$/;

    // Validate password
    if (!passRegex.test(newPass)) {
        passError.innerText = "Password must have 1 uppercase, 1 number & 1 symbol.";
        return;
    }
    if (newPass !== confirmPass) {
        passError.innerText = "Passwords do not match";
        return;
    }
    passError.innerText = "";

    // यहां मान लिया कि ईमेल पहले ही स्टोर/सेशन में है
    let email = sessionStorage.getItem("resetEmail") || "";
    if (!email) {
        passError.innerText = "Session expired. Please request OTP again.";
        return;
    }

    fetch(`${API_BASE}/forgot/update-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: newPass })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            document.getElementById("successMsg").innerText = "Your password changed successfully!";
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        } else {
            passError.innerText = data.message || "Password update failed.";
        }
    })
    .catch(() => passError.innerText = "Server error. Try again.");
}
