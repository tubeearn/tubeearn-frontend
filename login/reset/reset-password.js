function resetPassword() {
    const otp = document.getElementById("otp").value;
    const newPassword = document.getElementById("newPassword").value;
    const message = document.getElementById("message");

    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");

    if (!otp || !newPassword) {
        message.innerText = "Please fill all fields.";
        message.style.color = "red";
        return;
    }

    // API request (example)
    fetch("/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            message.innerText = "Password reset successfully.";
            message.style.color = "green";
            setTimeout(() => {
                window.location.href = "../../login.html";
            }, 1500);
        } else {
            message.innerText = data.message || "Invalid OTP or password.";
            message.style.color = "red";
        }
    })
    .catch(() => {
        message.innerText = "Error resetting password.";
        message.style.color = "red";
    });
}
