import angular from 'angular';
import Home from './home/home.module';
import NavigationBar from './navigationBar/navigationBar.module';
import DatasetInfo from './datasetInfo/datasetInfo.module';
import Results from './results/results.module';

let Components = angular.module('app.components', [
  Home,
  NavigationBar,
  DatasetInfo,
  Results
  ])
.name;

export default Components;
