export function initialize(application) {
  application.inject('component', 'app', 'route:application');
}

export default {
  name: 'app-route-component',
  initialize: initialize
};
