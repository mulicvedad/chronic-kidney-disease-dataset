import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularChart from 'angular-chart.js';
import components from './components/components';
import appComponent from './app.component';
import env from './env';
import services from './services/services';

angular.module('app', [
    uiRouter,
    angularChart,
    components,
    services
])
.constant('ENV', env)
.config(($locationProvider, $httpProvider, $qProvider) => {
    'ngInject';
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $qProvider.errorOnUnhandledRejections(false);
    $locationProvider.html5Mode(true).hashPrefix('!');
})
.component('app', appComponent)
.run(() => {});
