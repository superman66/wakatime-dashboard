import Frame from '../components/Frame';
export default {
  onEnter: (nextState, replace) => {
    if(!localStorage.getItem('gistId')){
      replace('/login');
    }
  },
  component: Frame,
  childRoutes: [require('./dashboard')]
};
