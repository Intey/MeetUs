// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  Calendar,
} from './';

export default {
  path: '',
  name: 'Meeter',
  childRoutes: [
    { path: '', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: '/calendar', name: 'Calendar', component: Calendar },
  ],
};
