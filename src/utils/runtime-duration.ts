function runtimeDuration(minutes: number) {
  // Handle negative or zero input
  if (minutes <= 0) {
    return minutes === 0 ? "0 h 0 m" : "Invalid input";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours} h ${remainingMinutes} m`;
}

export default runtimeDuration;
