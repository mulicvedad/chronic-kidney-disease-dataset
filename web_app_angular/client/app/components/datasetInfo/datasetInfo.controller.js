class DatasetInfoController {
    static $inject = ['dataService'];

    constructor(dataService) {
        this.dataService = dataService;
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
    }

    setupChartByAges() {
        this.labelsAges = ['1 - 10', '11 - 20', '21 - 30', '31 - 40', '41 - 50', '51 - 60', '61 - 70', '71 - 80', '81 - 90', '91 - 100'];        
        this.dataAges = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ];
    }

    loadData() {
        this.dataService.participantsByAge().then((response) => {
            this.dataAges = response.data;
        }).catch((error) => {
            console.log(JSON.stringify(error));
        });
    }

}


export default DatasetInfoController;
