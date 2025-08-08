// secure/config/configure.js

// AES Encryption and Decryption functions using CryptoJS
// CryptoJS CDN लिंक आपको अपने HTML में जोड़ना होगा

const CryptoJS = window.CryptoJS || require('crypto-js'); // Node या Browser दोनों के लिए

// Secret key (इसे कहीं शेयर मत करना)
const secretKey = 'tubeearn_super_secret_key_2025';

// एन्क्रिप्टेड डेटा (आपका दिया हुआ डेटा यहाँ एन्क्रिप्टेड रूप में)
const encryptedData = {
  apiUrl: 'U2FsdGVkX1+zJHwGbpY6x+29Z3UycZxp35vK5fHuHtFkRC6aJzrbF1NYaxkWQ1Lc',
  apiToken: 'U2FsdGVkX1+XYG2dmYvl7QkuAYRf8hvjE7LvZj/yKBGKPt/vkGhjPtZ7EtSW7+pt',
  cloudStorage: 'U2FsdGVkX1/72Dn1DxPifXxNtJrBC+sjV/T6NW4n5Dk='
};

// Decrypt function
function decryptData(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Decrypted values for use
const config = {
  apiUrl: decryptData(encryptedData.apiUrl),
  apiToken: decryptData(encryptedData.apiToken),
  cloudStorage: decryptData(encryptedData.cloudStorage)
};

// Export config for usage
if(typeof module !== 'undefined' && module.exports) {
  module.exports = config;
}
