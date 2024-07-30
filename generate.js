const fs = require('fs');

// Fungsi untuk menghasilkan ID unik
function generateId(existingIds) {
  let uniqueId;
  do {
    const timestamp = (new Date().getTime() / 1000).toString(16); // Get timestamp in hexadecimal format
    const randomChars = Math.random().toString(36).substring(2, 8); // Generate random characters
    uniqueId = (timestamp + randomChars).substring(0, 16); // Combine and trim to get 16 characters
  } while (existingIds.has(uniqueId)); // Check if the ID is already generated
  return uniqueId;
}

// Set untuk menyimpan ID yang dihasilkan
const ids = new Set();

// Menghasilkan 2063 ID unik
for (let i = 0; i < 2054; i++) {
  ids.add(generateId(ids));
}

// Mengonversi set ID ke format CSV
const csvContent = Array.from(ids).join('\n');

// Menyimpan CSV ke file
fs.writeFile('ids.csv', csvContent, 'utf8', (err) => {
  if (err) {
    console.error('Error menulis file:', err);
  } else {
    console.log('File ids.csv berhasil dibuat.');
  }
});