import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularChart from 'angular-chart.js';
import datasetInfoComponent from './datasetInfo.component';

let dataSetInfoModule = angular.module('datasetInfo', [
  uiRouter,
  angularChart
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('datasetInfo', { 
      url: '/datasetInfo',
      component: 'datasetInfo'
    });
})
.component('datasetInfo', datasetInfoComponent)  
.name;

export default dataSetInfoModule;
