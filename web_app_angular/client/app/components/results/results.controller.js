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
        this.setupPieCharts();
    }

    setupMainChart() {
        this.labelsMain = ['0 - 5.0', '5.0 - 10.0', '10.0 - 15.0', '15.0 - 20.0', 'preko 20.0'];
        this.seriesMain = ['Zdravi', 'Oboljeli'];
        this.dataMain = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
    }

    setupPieCharts() {
        this.dataPieHtn = [50, 50];
        this.labelsHtn = ['Hipertenzija', 'Zdravi'];
        this.dataPieAne = [50, 50];
        this.labelsAne = ['Anemija', 'Zdravi'];
    }

    loadData() {
        this.dataService.mainData().then((response) => {
            this.dataMain = response.data;
        }).catch((error) => {
            console.log(JSON.stringify(error));
        });
        this.dataService.hypertensionData().then((responseHtn) => {
            var num1 = responseHtn.data;
            var num2 = 100 - num1;
            this.dataPieHtn = [num1, num2.toFixed(2)];
        }).catch((error) => {
            console.log(JSON.stringify(error));
        });
        this.dataService.anemiaData().then((responseAne) => {
            var num1 = responseAne.data;
            var num2 = 100 - num1;
            this.dataPieAne = [num1, num2.toFixed(2)];
        }).catch((error) => {
            console.log(JSON.stringify(error));
        });
    }

}


export default ResultsController;
