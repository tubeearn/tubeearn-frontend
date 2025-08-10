import { OTP_API, VERIFY_API, RESET_API } from '../secure/config/configuration.js';

const emailInput = document.getElementById('email');
const otpInput = document.getElementById('otp');
const newPassInput = document.getElementById('newPass');
const confirmPassInput = document.getElementById('confirmPass');
const message = document.getElementById('message');

document.getElementById('getOtpBtn').addEventListener('click', async () => {
  const email = emailInput.value.trim();
  if (!email) return showMsg('Please enter your registered email', 'error');

  try {
    const res = await fetch(OTP_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (data.success) {
      showMsg('OTP sent to your email', 'success');
      document.getElementById('step-email').classList.add('hidden');
      document.getElementById('step-otp').classList.remove('hidden');
    } else {
      showMsg(data.message || 'Email not registered', 'error');
    }
  } catch (err) {
    showMsg('Error sending OTP', 'error');
  }
});

document.getElementById('verifyOtpBtn').addEventListener('click', async () => {
  const otp = otpInput.value.trim();
  const email = emailInput.value.trim();
  if (!otp) return showMsg('Enter OTP', 'error');

  try {
    const res = await fetch(VERIFY_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });
    const data = await res.json();
    if (data.success) {
      showMsg('OTP Verified', 'success');
      document.getElementById('step-otp').classList.add('hidden');
      document.getElementById('step-password').classList.remove('hidden');
    } else {
      showMsg('Invalid OTP', 'error');
    }
  } catch (err) {
    showMsg('Error verifying OTP', 'error');
  }
});

document.getElementById('resetPassBtn').addEventListener('click', async () => {
  const newPass = newPassInput.value.trim();
  const confirmPass = confirmPassInput.value.trim();
  const email = emailInput.value.trim();
  if (!newPass || !confirmPass) return showMsg('Fill all password fields', 'error');
  if (newPass !== confirmPass) return showMsg('Passwords do not match', 'error');

  try {
    const res = await fetch(RESET_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword: newPass })
    });
    const data = await res.json();
    if (data.success) {
      showMsg('Password successfully changed. Redirecting to login...', 'success');
      setTimeout(() => window.location.href = '../login/login.html', 2000);
    } else {
      showMsg('Password reset failed', 'error');
    }
  } catch (err) {
    showMsg('Error resetting password', 'error');
  }
});

function showMsg(msg, type) {
  message.textContent = msg;
  message.style.color = type === 'error' ? 'red' : 'lightgreen';
}
