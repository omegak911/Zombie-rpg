import characterConfigs from './characterConfig';
import homeBaseConfigs from './homeBaseConfig';
import mapConfigs from './mapConfig.js';
import movementConfigs from './movementConfig';

const configs = {
  characterConfigs,
  movementConfigs,
  mapConfigs,
  homeBaseConfigs,
}

//scalable width height will probably be based on length/width of matrix and current number of pixels.  
//once we have that ratioed, we can set dynamic px

export default configs;