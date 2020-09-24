import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage.vue';
import RobotBuilder from '../build/RobotBuilder.vue';
import PartInfo from '../parts/PartInfo.vue';
import BrowseParts from '../parts/BrowseParts.vue';

import RobotArms from '../parts/RobotArms.vue';
import RobotBases from '../parts/RobotBases.vue';
import RobotHeads from '../parts/RobotHeads.vue';
import RobotTorsos from '../parts/RobotTorsos.vue';

import SidebarBuild from '../sidebars/SidebarBuild.vue';
import SidebarStandard from '../sidebars/SidebarStandard.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: HomePage,
        sidebar: SidebarStandard,
      },
    },
    {
      path: '/build',
      name: 'Build',
      components: {
        default: RobotBuilder,
        sidebar: SidebarBuild,
      },
    },
    {
      path: '/parts/browse',
      name: 'BrowseParts',
      component: BrowseParts,
      children: [
        { path: 'BrowseArms', name: 'arms', component: RobotArms },
        { path: 'BrowseBases', name: 'bases', component: RobotBases },
        { path: 'BrowseHeads', name: 'heads', component: RobotHeads },
        { path: 'BrowseTorsos', name: 'torsos', component: RobotTorsos },
      ],
    },
    {
      path: '/parts/:partType/:id',
      name: 'Parts',
      component: PartInfo,
      props: true,
    },
  ],
});
