function sendResetLink() {
    const email = document.getElementById("email").value;
    const message = document.getElementById("message");

    if (!email) {
        message.innerText = "Please enter your email.";
        message.style.color = "red";
        return;
    }

    // API request (example)
    fetch("/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            message.innerText = "OTP sent to your email.";
            message.style.color = "green";
            // redirect to reset page with email param
            setTimeout(() => {
                window.location.href = `../login/reset/reset-password.html?email=${encodeURIComponent(email)}`;
            }, 1500);
        } else {
            message.innerText = data.message || "Something went wrong!";
            message.style.color = "red";
        }
    })
    .catch(() => {
        message.innerText = "Error sending OTP.";
        message.style.color = "red";
    });
}
