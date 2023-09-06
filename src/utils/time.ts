function displayTimeFromMinutes(minutes: number) {
  if (minutes < 60) {
    return `${minutes} mins`;
  } else if (minutes >= 60 && minutes < 1440) {
    const hrs = Math.trunc(minutes / 60);
    return `${hrs} hrs`;
  } else if (minutes >= 1440) {
    const days = Math.trunc(minutes / 1440);
    return `${days} days`;
  }
}

export {displayTimeFromMinutes}
