class ResultsController {
    static $inject = ['dataService'];

    constructor(dataService) {
        this.dataService = dataService;
        this.setupCharts();
        this.loadData();
    }

    setupCharts() {
        this.options = { 
            legend: { 
                display: true,
                position: 'top',
                fullWidth: true 
            } 
        };
        this.setupMainChart();
    }

    setupMainChart() {
        this.labelsMain = ['0 - 5.0', '5.0 - 10.0', '10.0 - 15.0', '15.0 - 20.0', 'preko 20.0'];
        this.seriesMain = ['Zdravi', 'Oboljeli'];
        this.dataMain = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
    }

    loadData() {
        this.dataService.mainData().then((response) => {
            this.dataMain = response.data;
        }).catch((error) => {
            console.log(JSON.stringify(error));
        })
    }

}


export default ResultsController;
