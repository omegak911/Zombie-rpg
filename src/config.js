import playerImage from './assets/sprites/hero3.png';
import npcImage from './assets/sprites/npc3.png';

const characterConfigs = {
  player: {
    backgroundImage: playerImage,
  },
  npc: {
    backgroundImage: npcImage,
  },
}

const movementConfigs = {
  horizontal: 36,
  vertical: 40,
}

const mapConfigs = {
  height: 750,
  width: 1300,
  startPositionAdjustment: {
    midUpperCenter: 80,
  }
}

export { characterConfigs, mapConfigs, movementConfigs };