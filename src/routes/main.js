import Frame from '../components/Frame';
export default {
  onEnter: (nextState, replace) => {
  },
  component: Frame,
  childRoutes: [require('./dashboard'), require('./error')]
};
