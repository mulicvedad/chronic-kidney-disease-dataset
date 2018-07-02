class DatasetInfoController {
    static $inject = ['dataService', 'swalService'];

    constructor(dataService, swalService) {
        this.dataService = dataService;
        this.swalService = swalService;
        this.setupCharts();
        this.loadData();
    }

    setupCharts() {
        this.series = ['Creatinine', 'Hemoglobin'];
        this.datasetOverride = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}];          
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
        this.options2 = {
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
                  },
                  {
                    ticks: {
                        beginAtZero:true
                    },
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    position: 'right'
                  }
                ]
              }        };
        
        this.setupChartByAges();
    }

    setupChartByAges() {
        this.labelsAges = ['1 - 10', '11 - 20', '21 - 30', '31 - 40', '41 - 50', '51 - 60', '61 - 70', '71 - 80', '81 - 90', '91 - 100'];        
        this.dataAges = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ];
        this.dataSecondChart = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0,0, 0, 0, 0, 0]];
    }

    loadData() {
        this.dataSecondChart = [[],[]];
        this.dataService.participantsByAge().then((response) => {
            this.dataAges = response.data;
        }).catch((error) => {
            console.log(JSON.stringify(error));
        });
        this.dataService.creatinineByAge().then((response) => {
            this.dataSecondChart[0] = response.data;
        }).catch((error) => {
            console.log(JSON.stringify(error));
        });
        this.dataService.hemoglobinByAge().then((response) => {
            this.dataSecondChart[1] = response.data;
        }).catch((error) => {
            console.log(JSON.stringify(error));
        });

    }

    showInfo(chart_num) {
        if(chart_num == 1) {
            this.swalService.displayInfo("Dijagram", "Na ispitivanju sudjelovalo je ukupno 400 učesnika, "+
                                                     "koji su na ovom dijagramu podjeljeni u starosne grupe. "+ 
                                                     "Najviše ispitanika je izmedju 40 i 70 godina, a najmanje je"+
                                                     "maloljetnika i osoba u poznim godinama.");
        }
        else {
            this.swalService.displayInfo("Dijagram", "Dijagram ilustruje promjenu koncentracije kreatinina i"+
                                                     " hemoglobina nastalu tokom životne dob ispitanika. " +
                                                    "Može se uočiti da koncentracija hemoglobina (grami po decilitru) se "+
                                                "znatno povećava u pubertetu, te kako čovjek stari postepeno se smanjuje. "+
                                            "Koncentracija kreatinina (miligrami po decilitru) se u tijelu korisnika kroz životnu dob povećava "+
                                            "a nagli pad za učesnike između 80-100 godina može se objasniti dosta manjim testnim skupom učesnika iz te grupe.");
        }
    }
}


export default DatasetInfoController;
