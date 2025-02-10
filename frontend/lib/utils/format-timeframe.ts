export function formatTimeframe(timeframe: string): string {
  // Remove any spaces and convert to uppercase for consistency
  const tf = timeframe.replace(/\s+/g, "").toUpperCase();

  // Handle minute timeframes
  if (tf.startsWith("MINUTE")) {
    const minutes = tf.replace("MINUTE", "");
    return minutes ? `${minutes}m` : "1m";
  }

  // Handle hour timeframes
  if (tf.startsWith("HOUR")) {
    const hours = tf.replace("HOUR", "");
    return hours ? `${hours}h` : "1h";
  }

  // Handle special cases
  switch (tf) {
    case "DAILY":
      return "1d";
    case "WEEKLY":
      return "1w";
    case "MONTHLY":
      return "1M";
    default:
      return tf.toLowerCase();
  }
}
