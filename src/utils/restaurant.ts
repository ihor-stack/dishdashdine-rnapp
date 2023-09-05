import {IRestaurant} from '@/api/generic';
import {displayTimeFromMinutes} from '@/utils/time';

function displayPrepTime(restaurant: IRestaurant) {
  const {preparationTimes} = restaurant;
  // In minutes
  let prepTimeMin = restaurant.prepTimeMin;
  let prepTimeMax = restaurant.prepTimeMax;
  const enabledTime = (preparationTimes || []).find(
    item => item.enabled && item.preparationTimeMode === restaurant.currentMode,
  );

  if (enabledTime) {
    prepTimeMin = enabledTime.prepTimeMin;
    prepTimeMax = enabledTime.prepTimeMax;
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

export {displayPrepTime, displayPrepTimeFromRange};
