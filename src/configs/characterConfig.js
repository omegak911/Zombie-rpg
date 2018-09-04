import playerImage from '../assets/sprites/hero3.png';
import npcImage from '../assets/sprites/npc3.png';
import monsterImage from '../assets/sprites/monsters.png';

const characterConfigs = {
  player: {
    backgroundImage: playerImage,
    spriteCrop: ['0px -80px','0px -120px','0px -40px','0px 0px'],
    startTop: 400, //base
    startLeft: 800,
    startRow: 10,
    startColumn: 20,
  },
  npcMan: {
    backgroundImage: npcImage,
    spriteCrop: ['0px 0px','-120px 0px','-80px 0px','-40px 0px'],
    stats: {},
  },
  npcWoman: {
    backgroundImage: npcImage,
    spriteCrop: ['0px -41px','-120px -41px','-80px -41px','-40px -41px'],
    stats: {},
  },
  npcGirl: {
    backgroundImage: npcImage,
    spriteCrop: ['0px -83px','-120px -83px','-80px -83px','-40px -83px'],
    stats: {},
  },
  npcBoy: {
      backgroundImage: npcImage,
      spriteCrop: ['0px -125px','-120px -125px','-80px -125px','-40px -125px'],
      stats: {},
  },
  'Lil Zom': { //lowest lvl: 1
    backgroundImage: monsterImage,
    spriteCrop: ['0px 0px','-120px 0px','-80px 0px','-40px 0px'],
    stats: {
      attack: 5,
      defense: 3,
      health: 20,
      exp: 1,
      loot: ['coin'],
    }
  },
  Zom: { //lowest lvl: 5
    backgroundImage: monsterImage,
    spriteCrop: ['0px -40px','-120px -40px','-80px -40px','-40px -40px'],
    stats: {
      attack: 10,
      defense: 5,
      health: 50,
      exp: 5,
      loot: ['coin'],
    }
  },
  'Red Eyes White Skull': { //lowest lvl: 10
    backgroundImage: monsterImage,
    spriteCrop: ['0px -120px','-120px -120px','-80px -120px','-40px -120px'],
    stats: {
      attack: 12,
      defense: 7,
      health: 60,
      exp: 7,
      loot: ['coin'],
    },
  },
  Skeleton: {//lowest lvl: 15
    backgroundImage: monsterImage,
    spriteCrop: ['0px -160px','-120px -160px','-80px -160px','-40px -160px'],
    stats: {
      attack: 12,
      defense: 7,
      health: 60,
      exp: 7,
      loot: ['coin'],
    },
  },
  'War Zom': { //lowest lvl: 20
    backgroundImage: monsterImage,
    spriteCrop: ['0px -200px','-120px -200px','-80px -200px','-40px -200px'],
    stats: {
      attack: 20,
      defense: 12,
      health: 100,
      exp: 20,
      loot: ['coin'],
    },
  },
  'Brute Zom': { //lowest lvl: 25
    backgroundImage: monsterImage,
    spriteCrop: ['0px -80px','-120px -80px','-80px -80px','-40px -80px'],
    stats: {
      attack: 30,
      defense: 20,
      health: 200,
      exp: 50,
      loot: ['coin'],
    },
  },
}

export default characterConfigs;