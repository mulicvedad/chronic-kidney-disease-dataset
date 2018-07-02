import BaseService from './baseService';

export default class DataService extends BaseService {
    participantsByAge() {
        return super.get('percentage-by-ages');
    }
    mainData() {
        return super.get('main');
    }
    creatinineByAge() {
        return super.get('creatinine-by-ages')
    }
    hemoglobinByAge() {
        return super.get('hemoglobin-by-ages')
    }

    diabetesIllProbabilityByAge() {
        return super.get('diabetes-and-ill')
    }
    appetiteProbabilityByCreatinineConc() {
        return super.get('appetite-and-creatinine')
    }
    illProbabilityByHemoglobinConc() {
        return super.get('ill-and-hemoglobin')
    }
    hypertensionData() {
        return super.get('hypertension');
    }
    anemiaData() {
        return super.get('anemia');
    }

}