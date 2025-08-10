// forgot-password.js
// IMPORTANT: adjust relative path below according to your folder structure.
// If forgot-password.html is in login/ and configure.js is in ../secure/config/, path is:
import { OTP_API, VERIFY_API, RESET_API } from '../secure/config/configure.js';

const emailEl = document.getElementById('email');
const otpEl = document.getElementById('otp');
const newPassEl = document.getElementById('newPass');
const confirmPassEl = document.getElementById('confirmPass');
const msgEl = document.getElementById('message');

const stepEmail = document.getElementById('step-email');
const stepOtp = document.getElementById('step-otp');
const stepPass = document.getElementById('step-password');

document.getElementById('getOtpBtn').addEventListener('click', async () => {
  msgEl.textContent = '';
  const email = emailEl.value.trim();
  if (!email) { msgEl.textContent = 'Please enter your registered email.'; return; }

  try {
    const res = await fetch(OTP_API, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      msgEl.style.color = 'green';
      msgEl.textContent = 'OTP sent to your email.';
      stepEmail.classList.add('hidden');
      stepOtp.classList.remove('hidden');
    } else {
      msgEl.style.color = 'red';
      msgEl.textContent = data.message || 'Failed to send OTP.';
    }
  } catch (err) {
    msgEl.style.color = 'red';
    msgEl.textContent = 'Network error. Check backend/CORS and console.';
    console.error(err);
  }
});

document.getElementById('verifyOtpBtn').addEventListener('click', async () => {
  msgEl.textContent = '';
  const email = emailEl.value.trim();
  const otp = otpEl.value.trim();
  if (!otp) { msgEl.textContent = 'Enter the OTP.'; return; }

  try {
    const res = await fetch(VERIFY_API, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, otp })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      msgEl.style.color = 'green';
      msgEl.textContent = 'OTP verified. Enter new password.';
      stepOtp.classList.add('hidden');
      stepPass.classList.remove('hidden');
    } else {
      msgEl.style.color = 'red';
      msgEl.textContent = data.message || 'Invalid OTP.';
    }
  } catch (err) {
    msgEl.style.color = 'red';
    msgEl.textContent = 'Network error. Check backend and console.';
    console.error(err);
  }
});

document.getElementById('resetPassBtn').addEventListener('click', async () => {
  msgEl.textContent = '';
  const email = emailEl.value.trim();
  const newPass = newPassEl.value.trim();
  const confirm = confirmPassEl.value.trim();
  if (!newPass || !confirm) { msgEl.textContent = 'Fill both password fields.'; return; }
  if (newPass !== confirm) { msgEl.textContent = 'Passwords do not match.'; return; }

  try {
    const res = await fetch(RESET_API, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, newPassword: newPass })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      msgEl.style.color = 'green';
      msgEl.textContent = 'Password changed. Redirecting to login...';
      setTimeout(()=> location.href = '../login/login.html', 1800);
    } else {
      msgEl.style.color = 'red';
      msgEl.textContent = data.message || 'Password reset failed.';
    }
  } catch (err) {
    msgEl.style.color = 'red';
    msgEl.textContent = 'Network error. Check backend and console.';
    console.error(err);
  }
});
