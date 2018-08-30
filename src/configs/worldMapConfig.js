import backgroundImage from '../assets/maps/WorldMap.png';
import soldierImage from '../assets/sprites/Soldier.png';

const worldMapConfig = {
  backgroundImage,
  soldierImage,
  backgroundHeightWidth: [680, 840],
  levelsAndPositions: [
    {
      level: 0, //base
      top: 560,
      left: 600,
    },
    {
      level: 1,
      top: 440,
      left: 520,
    },
    {
      level: 2,
      top: 520,
      left: 360,
    },
    {
      level: 3,
      top: 360,
      left: 320,
    },
    {
      level: 4,
      top: 360,
      left: 480,
    },
    {
      level: 5,
      top: 320,
      left: 640,
    },
    {
      level: 6,
      top: 360,
      left: 720,
    },
    {
      level: 7,
      top: 200,
      left: 680,
    },
    {
      level: 8,
      top: 80,
      left: 720,
    },
    {
      level: 9,
      top: 160,
      left: 560,
    },
    {
      level: 10,
      top: 240,
      left: 440,
    },
    {
      level: 11,
      top: 160,
      left: 360,
    },
    {
      level: 12,
      top: 160,
      left: 240,
    },
  ]
}

export default worldMapConfig;