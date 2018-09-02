import playerImage from '../assets/sprites/hero3.png';
import npcImage from '../assets/sprites/npc3.png';
import monsterImage from '../assets/sprites/monsters.png';

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
  },
  littleZombie: {
    backgroundImage: monsterImage,
    spriteCrop: ['0px 0px','-120px 0px','-80px 0px','-40px 0px']
  },
  regularZombie: {
    backgroundImage: monsterImage,
    spriteCrop: ['0px -40px','-120px -40px','-80px -40px','-40px -40px'],
  },
  bruteZombie: {
    backgroundImage: monsterImage,
    spriteCrop: ['0px -80px','-120px -80px','-80px -80px','-40px -80px'],
  },
  warriorZombie: {
    backgroundImage: monsterImage,
    spriteCrop: ['0px -200px','-120px -200px','-80px -200px','-40px -200px'],
  },
  redSkeleton: {
    backgroundImage: monsterImage,
    spriteCrop: ['0px -120px','-120px -120px','-80px -120px','-40px -120px'],
  },
  regularSkeleton: {
    backgroundImage: monsterImage,
    spriteCrop: ['0px -160px','-120px -160px','-80px -160px','-40px -160px'],
  },
  
}

export default characterConfigs;