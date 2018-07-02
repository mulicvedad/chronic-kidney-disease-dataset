class DatasetInfoPage2Controller {
    static $inject = ['dataService', 'swalService'];

    constructor(dataService, swalService) {
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
        
        this.setupChartByAges();
        this.setupChartByCreatinineConcentration();
    }

    setupChartByAges() {
        this.labelsAges = ['1 - 10', '11 - 20', '21 - 30', '31 - 40', '41 - 50', '51 - 60', '61 - 70', '71 - 80', '81 - 90', '91 - 100'];        
        this.dataDiabetesProbability = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ];
    }
    setupChartByCreatinineConcentration() {
        this.labelsConcentration = ['0.00 - 0.99', '1.00 - 1.99', '2.00 - 2.99', '3.00 - 3.99', '4.00 - 4.99', '5.00 - 5.99', '6.00 - 6.99', '7.00 - 7.99', '8.00 - 8.99', '> 9.00']
        this.dataAppetiteProbability = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ];
    }

    loadData() {
        this.dataService.diabetesIllProbabilityByAge().then((response) => {
            this.dataDiabetesProbability = response.data;
        }).catch((error) => {
            console.log(JSON.stringify(error));
        });
        this.dataService.appetiteProbabilityByCreatinineConc().then((response) => {
            this.dataAppetiteProbability = response.data;
        }).catch((error) => {
            console.log(JSON.stringify(error));
        });

    }
    showInfo(chart_num) {
        if(chart_num == 1) {
            this.swalService.displayInfo("Dijagram", "Jedan od glavnih uzroka pojave hronične bubrežne insuficijencije (HBI) "+
                                                     "kod čovjeka jeste šećerna bolest, tj. dijabetes. "+ 
                                                     "Na ovom dijagramu je ilustrovana ta povezanost, odnosno "+
                                                     "gotovo svi oboljeli učesnici (bez obzira na starosnu dob)"+ 
                                                     "ujedno su oboljeli i od dijabetesa.");
        }
        else {
            this.swalService.displayInfo("Dijagram", "Na ovom dijagramu ilustrovana je povezanost"+
                                                     " postojanja zdravog apetita kod učesnika u zavisnosti od " +
                                                    "koncentracije kreatinina u krvi. Povećanjem koncentracije dolazi do "+
                                                "opadanja apetita. Naime, istraživanja HBI-a pokazala su da je trećina oboljelih"+
                                            "anoreksična i da imaju problema s unosom potrebnih hranjivih tvari u organizam. Anomalija "+
                                            "na ovom dijagramu predstavlja nagli uspon za ispitanike s koncentracijom kreatinina preko 6 g/dl." +
                                            "Može se objasnti malim testnim skupom jer u ovu kategorije spada tek 4 od ukupno 400 učesnika.");
        }
    }
}


export default DatasetInfoPage2Controller;
