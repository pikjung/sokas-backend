export default function generateUniqueId() {
  const timestamp = (new Date().getTime() / 1000).toString(16); // Get timestamp in hexadecimal format
  const randomChars = Math.random().toString(36).substring(2, 8); // Generate random characters

  const uniqueId = timestamp + randomChars; // Combine timestamp and random characters
  return uniqueId.substring(0, 16); // Trim to get 16 characters
}