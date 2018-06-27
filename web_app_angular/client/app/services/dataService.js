import BaseService from './baseService';

export default class DataService extends BaseService {
    participantsByAge() {
        return super.get('percentage-by-ages');
    }
    mainData() {
        return super.get('main');
    }
}