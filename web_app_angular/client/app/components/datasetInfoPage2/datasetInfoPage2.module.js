import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularChart from 'angular-chart.js';
import datasetInfoPage2Component from './datasetInfoPage2.component';

let dataSetInfoPage2Module = angular.module('datasetInfoPage2', [
  uiRouter,
  angularChart
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('datasetInfoPage2', { 
      url: '/datasetInfoPage2',
      component: 'datasetInfoPage2'
    });
})
.component('datasetInfoPage2', datasetInfoPage2Component)  
.name;

export default dataSetInfoPage2Module;
