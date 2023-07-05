import { IPreparationTimes, IRestaurant } from '@/api/generic';
import { displayTimeFromMinutes } from '@/utils/time';

function displayPrepTime(restaurant: IRestaurant) {
  const { preparationTimes } = restaurant;
  // In minutes
  let prepTimeMin = restaurant.prepTimeMin;
  let prepTimeMax = restaurant.prepTimeMax;
  const enabledTime = preparationTimes.filter((item: IPreparationTimes) => {
    return item.enabled
  })

  if (enabledTime.length > 0) {
    prepTimeMin = enabledTime[0].prepTimeMin;
    prepTimeMax = enabledTime[0].prepTimeMax;
  }

  return displayPrepTimeFromRange([prepTimeMin, prepTimeMax]);
}

/**
 * @param min - Minimum preparation time in minutes
 * @param max - Maximum preparation time in minutes
 */
function displayPrepTimeFromRange([min, max]: [number, number]) {
  if (min === max) {
    return `${displayTimeFromMinutes(min)}`;
  } else {
    return `${displayTimeFromMinutes(min)} - ${displayTimeFromMinutes(max)}`;
  }
}

export { displayPrepTime, displayPrepTimeFromRange }
