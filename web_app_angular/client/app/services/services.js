import angular from 'angular';
import swalService from './swalService';
import dataService from './dataService';

let servicesModule = angular.module('app.services', [])
.service({
    swalService,
    dataService
})
.name;

export default servicesModule;