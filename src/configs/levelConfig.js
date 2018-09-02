import Trees from '../assets/buildings/Trees.png';
import Buildings from '../assets/buildings/LevelBuildings.png';
import backgroundImage from '../assets/maps/Level.png';

const levelConfigs = {
  backgroundImage,
  possibleBuildingLocations: [ //row, column
    [3,6],
    [13,3],
    [11,10],
    [11,14],
    [15,10],
    [15,14],
  ],
  possibleTreeLocations: [
    [3,9],
    [4,14],
    [9,3],
    [8,8],
    [8,13],
    [13,7],
    [17,8]
  ],
  treeImages: Trees,
  treeBackgroundPositions: [
    '0px 0px',
    '0px -40px',
    '-40px 0px',
    '-40px -40px',
  ],
  buildingImages: Buildings,
  buildingBackgroundPositions: [
    '0px 0px',
    '-120px 0px',
  ]

}

export default levelConfigs;