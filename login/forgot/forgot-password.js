// forget-password.js

// Backend API Base URL
const API_BASE_URL = "https://tubeearn-backend.onrender.com";

// DOM elements
const emailInput = document.getElementById("email");
const getOtpBtn = document.getElementById("getOtpBtn");
const messageBox = document.getElementById("message");

// Show message function
function showMessage(text, type = "success") {
    messageBox.textContent = text;
    messageBox.style.color = type === "error" ? "red" : "green";
}

// Handle Get OTP click
getOtpBtn.addEventListener("click", async () => {
    const email = emailInput.value.trim();

    if (!email) {
        showMessage("Please enter your email", "error");
        return;
    }

    try {
        getOtpBtn.disabled = true;
        getOtpBtn.textContent = "Sending...";

        const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
            showMessage(data.message || "OTP sent successfully!");
        } else {
            showMessage(data.error || "Something went wrong", "error");
        }
    } catch (error) {
        console.error("Error sending OTP:", error);
        showMessage("Server error. Please try again later.", "error");
    } finally {
        getOtpBtn.disabled = false;
        getOtpBtn.textContent = "Get OTP";
    }
});

// Back to Login link fix
document.getElementById("backToLogin").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/login.html"; // Make sure login.html exists
});
