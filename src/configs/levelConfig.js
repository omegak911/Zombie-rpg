import Trees from '../assets/buildings/Trees.png';
import backgroundImage from '../assets/maps/Level.png';

const levelConfigs = {
  backgroundImage,
  possibleBuildingLocations: [ //row, column, top, left
    [3,6,120,240],
    [13,3,520,120],
    [11,10,440,400],
    [11,14,440,560],
    [15,10,600,400],
    [15,14,600,560],
  ],
  possibleTreeLocations: [
    [3,9,40,360],
    [4,14,160,560],
    [9,3,360,120],
    [8,8,320,320],
    [8,13,320,520],
    [13,7,520,280],
    [17,8,680,320]
  ],
  treeImages: Trees,
  treeBackgroundPositions: [
    [0,0],
    [0,41],
    [41,0],
    [41,41],
  ],

}

export default levelConfigs;