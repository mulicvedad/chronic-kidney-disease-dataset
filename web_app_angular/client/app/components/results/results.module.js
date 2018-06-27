import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularChart from 'angular-chart.js';
import resultsComponent from './results.component';

let resultsModule = angular.module('results', [
  uiRouter,
  angularChart
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('results', { 
      url: '/results',
      component: 'results'
    });
})
.component('results', resultsComponent)  
.name;

export default resultsModule;
