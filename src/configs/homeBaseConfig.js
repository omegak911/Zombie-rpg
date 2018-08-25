import backgroundImage from '../assets/maps/Base4.png';

const homeBaseConfigs = {
  signCoordinates: [[2,26],[3,9],[3,13],[6,28],[6,32],[9,5],[10,19],[12,3],[12,31]],
  backgroundImage: backgroundImage,
  buildings: {
    home: {
      1: {
        cost: 100,
        image: '',
      },
      2: {
        cost: 1000,
        image: '',
      },
    },
    merchantBase: {
      1: {
        cost: 50,
        housing: 1,
        image: '',
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
    armoryBase: {
      1: {
        cost: 50,
        housing: 1,
        image: '',
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
        image: '',
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
        image: '',
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