import { convertTimeToTwelveHourFormat, isTimeBetween } from "./helpers.js";

async function slotParser(slots) {
  console.log(`There are ${slots.length} slots available`);
  
  // Check all slots in parallel
  const slotPromises = slots.map(slot => 
    slotChooser(slot, convertTimeToTwelveHourFormat(slot.date.start), slot.config.type)
  );
  
  // Find first valid slot
  const results = await Promise.all(slotPromises);
  const slotId = results.find(id => id !== undefined);
  
  if (!slotId) {
    console.log("No prime slots available");
  }
  return slotId;
}

function slotChooser(slot, time, type) {
  // Remove async since we're not doing any async operations
  if (isTimeBetween(process.env.EARLIEST, process.env.LATEST, slot.date.start)) {
    console.log(
      `Booking a prime slot at ${time} ${
        type === "Dining Room" ? "in" : "on"
      } the ${type}!`
    );
    return slot.config.token;
  }
  return undefined;
}

export { slotParser };
