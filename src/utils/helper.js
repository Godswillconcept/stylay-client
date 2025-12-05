// utils/helper.js

export function getPlaceholder(firstName = "", lastName = "") {
  const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
  return `https://placehold.co/600x400/EEE/31343C?text=${initials || "?"}`;
}

/**
 * Gets a consistent random item from an array based on the current date
 * @param {Array} items - Array of items to select from
 * @returns {*} A random item from the array
 */
export function getRandomVendor(items) {
  if (!items || items.length === 0) return null;

  // Get today's date as a seed (YYYYMMDD format)
  const today = new Date();
  const seed = parseInt(
    `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`,
    10,
  );

  // Simple deterministic random based on the date
  const randomIndex = seed % items.length;
  return items[randomIndex];
}
