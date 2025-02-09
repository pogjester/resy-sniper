import jwt from 'jsonwebtoken';

// Cache for converted times
const timeCache = new Map();

function convertTimeToTwelveHourFormat(time) {
  const timeString = time.split(' ')[1];
  const [hour, minutes] = timeString.split(':');
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${suffix}`;
}

function convertDateToLongFormat(date) {
  const dateArray = date.split('-');
  const [year, month, day] = dateArray;
  const dateObject = new Date(year, month - 1, day);
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  return dateObject.toLocaleDateString('en-US', options);
}

function convertToMinutes(timeStr) {
  if (timeCache.has(timeStr)) {
    return timeCache.get(timeStr);
  }
  const [hours, minutes] = timeStr.split(':').map(Number);
  const result = hours * 60 + minutes;
  timeCache.set(timeStr, result);
  return result;
}

function isTimeBetween(startTime, endTime, dateString) {
  let targetTime = dateString.split(' ')[1];
  
  const startMinutes = convertToMinutes(startTime);
  const endMinutes = convertToMinutes(endTime);
  const targetMinutes = convertToMinutes(targetTime);

  return targetMinutes >= startMinutes && targetMinutes <= endMinutes;
}

async function checkTokenExpiration(token) {
  if (!token) {
    console.error('JWT token not found in the AUTH_TOKEN environment variable');
    process.exit(1);
  }

  try {
    const decoded = jwt.decode(token);

    if (decoded) {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const timeUntilExpiration = decoded.exp - currentTimestamp;
      const expirationDate = new Date(decoded.exp * 1000);

      if (timeUntilExpiration <= 0) {
        console.log('JWT has already expired');
        return false;
      } else {
        console.log(`JWT will expire on ${expirationDate}`);
        return true;
      }
    } else {
      console.error('JWT decoding failed');
      return false;
    }
  } catch (error) {
    console.error('JWT decoding failed:', error);
    return false;
  }
}

export { convertTimeToTwelveHourFormat, convertDateToLongFormat, isTimeBetween, checkTokenExpiration };
