import backgroundImage from '../assets/maps/Base4.png';
import homeLevelOne from '../assets/buildings/PlayerBase1.png';
import npcBuildingLevelOne from '../assets/buildings/npcBase1.png';

const homeBaseConfigs = {
  signCoordinates: [[2,26],[3,9],[3,13],[6,28],[6,32],[9,5],[10,19],[12,3],[12,31]],
  buildingCoordAndTopLeft: {
    0: [2,23,80,920],
    1: [3,6,120,240],
    2: [3,14,120,560],
    3: [6,25,240,1000],
    4: [6,33,240,1320],
    5: [6,3,240,120],
    6: [6,19,240,760],
    7: [13,3,520,120],
    8: [13,29,520,1160],
  },
  backgroundImage: backgroundImage,
  buildings: {
    home: {
      1: {
        cost: 100,
        image: homeLevelOne,
      },
      2: {
        cost: 1000,
        image: '',
      },
      3: {
        cost: 10000,
        image: '',
      },
      4: {
        cost: 100000,
        image: '',
      },
      5: {
        cost: 1000000,
        image: '',
      },
      6: {
        cost: 10000000,
        image: '',
      },
      7: {
        cost: 100000000,
        image: '',
      },
      8: {
        cost: 100000000,
        image: '',
      },
    },
    merchant: {
      1: {
        cost: 50,
        housing: 1,
        image: npcBuildingLevelOne,
      },
      2: {
        cost: 500,
        housing: 1,
        image: '',
      },
      3: {
        cost: 5000,
        housing: 1,
        image: ''
      },
    },
    armory: {
      1: {
        cost: 50,
        housing: 1,
        image: npcBuildingLevelOne,
      },
      2: {
        cost: 500,
        housing: 1,
        image: '',
      },
      3: {
        cost: 5000,
        housing: 1,
        image: ''
      },
    },
    bar: {
      1: {
        cost: 2000,
        housing: 0,
        image: npcBuildingLevelOne,
      },
      2: {
        cost: 20000,
        housing: 0,
        image: '',
      },
      3: {
        cost: 200000,
        housing: 0,
        image: ''
      },
    },
    house: {
      1: {
        cost: 50,
        housing: 1,
        image: npcBuildingLevelOne,
      },
      2: {
        cost: 500,
        housing: 2,
        image: '',
      },
      3: {
        cost: 5000,
        housing: 3,
        image: '',
      },
    },
  }
}


export default homeBaseConfigs;