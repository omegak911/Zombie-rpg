import playerImage from './assets/sprites/hero3.png';
import npcImage from './assets/sprites/npc3.png';

const characterConfigs = {
  player: {
    backgroundImage: playerImage,
    spriteCrop: ['0px -80px','0px -120px','0px -40px','0px 0px'],
    startTop: 400,
    startLeft: 800,
    startRow: 10,
    startColumn: 20,
  },
  npcMan: {
    backgroundImage: npcImage,
    spriteCrop: ['0px 0px','-120px 0px','-80px 0px','-40px 0px'],
  },
  npcWoman: {
    backgroundImage: npcImage,
    spriteCrop: ['0px -41px','-120px -41px','-80px -41px','-40px -41px'],
  },
  npcGirl: {
    backgroundImage: npcImage,
    spriteCrop: ['0px -83px','-120px -83px','-80px -83px','-40px -83px'],
  },
  npcBoy: {
      backgroundImage: npcImage,
      spriteCrop: ['0px -125px','-120px -125px','-80px -125px','-40px -125px'],
  }
}

const movementConfigs = {
  horizontal: 40,
  vertical: 40,
}

const mapConfigs = {
  height: 750,
  width: 1300,
  startPositionAdjustment: {
    midUpperCenter: 80,
  }
}

//scalable width height will probably be based on length/width of matrix and current number of pixels.  
//once we have that ratioed, we can set dynamic px



export { characterConfigs, mapConfigs, movementConfigs };