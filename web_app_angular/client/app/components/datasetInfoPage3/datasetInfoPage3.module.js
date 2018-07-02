import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularChart from 'angular-chart.js';
import datasetInfoPage3Component from './datasetInfoPage3.component';

let dataSetInfoPage3Module = angular.module('datasetInfoPage3', [
  uiRouter,
  angularChart
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('datasetInfoPage3', { 
      url: '/datasetInfoPage3',
      component: 'datasetInfoPage3'
    });
})
.component('datasetInfoPage3', datasetInfoPage3Component)  
.name;

export default dataSetInfoPage3Module;
