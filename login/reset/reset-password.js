function updatePassword() {
    let email = sessionStorage.getItem("resetEmail");
    let newPass = document.getElementById("newPass").value.trim();
    let confirmPass = document.getElementById("confirmPass").value.trim();
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
            document.getElementById("successMsg").innerText = "Password changed successfully!";
            sessionStorage.removeItem("resetEmail");
            setTimeout(() => { window.location.href = "login.html"; }, 2000);
        } else {
            passError.innerText = data.message || "Failed to update password";
        }
    })
    .catch(() => passError.innerText = "Server error. Try again.");
}
