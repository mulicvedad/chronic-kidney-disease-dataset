import angular from 'angular';
import Home from './home/home.module';
import NavigationBar from './navigationBar/navigationBar.module';
import DatasetInfo from './datasetInfo/datasetInfo.module';
import DatasetInfoPage2 from './datasetInfoPage2/datasetInfoPage2.module';
import DatasetInfoPage3 from './datasetInfoPage3/datasetInfoPage3.module';
import Results from './results/results.module';

let Components = angular.module('app.components', [
  Home,
  NavigationBar,
  DatasetInfo,
  DatasetInfoPage2,
  DatasetInfoPage3,
  Results
  ])
.name;

export default Components;
