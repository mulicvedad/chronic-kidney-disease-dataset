class DatasetInfoPage3Controller {
    static $inject = ['dataService', 'swalService'];

    constructor(dataService,swalService) {
        this.dataService = dataService;
        this.swalService = swalService;
        this.setupCharts();
        this.loadData();
    }

    setupCharts() {
        this.options = {
            scales: {
              yAxes: [
                {
                    ticks: {
                        beginAtZero:true
                    },
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }
              ]
            }
        };
        
        this.setupChartByHemoglobinConcentration();
    }

    setupChartByHemoglobinConcentration() {
        this.labelsConcentration = ['0.00 - 1.99', '2.00 - 3.99', '4.00 - 5.99', '6.00 - 7.99', '8.00 - 9.99', '10.00 - 11.99', '12.00 - 13.99', '14.00 - 15.99', '16.00 - 18.99', '> 19.00' ]
        this.dataIllProbability = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ];
    }

    loadData() {
        this.dataService.illProbabilityByHemoglobinConc().then((response) => {
            this.dataIllProbability = response.data;
        }).catch((error) => {
            console.log(JSON.stringify(error));
        });

    }
    showInfo(chart_num) {
        if(chart_num == 1) {
            this.swalService.displayInfo("Dijagram", "Posljedica oboljevanja od hronične bubrežne insuficijencije (HBI) "+
                                                     "najčešće uključuje pojavu anemije, tj. manjka hemogolobina u krvi. "+ 
                                                     "Prosječna  koncentracija hemoglobina u zdravoj odrasloj osobi varira "+
                                                     "između 13-18 g/dl. Ispitivanje provedeno nad učesnicima potvrđuje "+ 
                                                     "povezanost anemije i HBI-a, jer gotovo svi ispitani koji su oboljeli od HBI "+
                                                    "imaju manjak hemogolobina (< 12 g/dl) u krvi.");
        }
    }

}


export default DatasetInfoPage3Controller;
