class ResultsController {
    static $inject = ['dataService', 'swalService'];

    constructor(dataService, swalService) {
        this.dataService = dataService;
        this.swalService = swalService;
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
        this.labelsMain = ['0 - 1.0', '1.01 - 1.5', '1.51 - 2.0', 'preko 2.0'];
        this.seriesMain = ['Zdravi', 'Oboljeli'];
        this.dataMain = [
            [0, 0, 0, 0 ],
            [0, 0, 0, 0]
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

    showInfo(chart_num) {
        if(chart_num == 1) {
            this.swalService.displayInfo("Dijagram", "HBI je sindrom koji nastaje kao posljedica postepenog, progresivnog i ireverzibilnog "+
                                                     "smanjenja glomerulske filtracije bubrega do konačnog stadijuma uremije. "+ 
                                                     "HBI se u početnom stadiju javlja bez specifičnih simpotoma, te je često jedina naznaka bolesti "+
                                                     "povišena koncentracija seruma kreatinina u krvi. "+ 
                                                     "Ovaj dijagram to potvrđuje, gdje porast kreatinina u krvi, drastično povećava šansu oboljevanja osobe od HBI."+
                                                    "Iz ovih podataka može se izvesti zaključak da ukoliko krvi osobe postoji koncentracija kreatinina preko 1.5 mg/dl, sa velikom sigurnošću"+
                                                " može se uspostaviti dijagnoza sindroma hronične bubrežne insuficijencije.");
        }
        else if(chart_num == 2) {
            this.swalService.displayInfo("Dijagram", "Posljedica oboljevanja od HBI je i hipertenzija, odnosno visok krvni pritisak. "+
                                                     " Od 250 učesnika koji su dijagnosticirani s HBI, 58% imaju problema s visokim krvnim pritiskom. To se dešava zbog "+
                                                     "prekomjernog lučenja fluida i vazoaktivnih hormona od strane bubrega."
                                            );
        }
        else {
            this.swalService.displayInfo("Dijagram", "Na jednom od dijagrama koji su opisivali dataset, pokazano je da gotovo svi oboljeli učesnici od HBI"+ 
                                                    "imaju relativno nisku koncentraciju hemoglobina u krvi. Ovaj dijagram to potvrđuje," +
                                                    "gdje je ustanovljeno da 24% ispitanih učesnika pati od anemije. "+ 
                                                    "Manjak hemoglobina u krvi je posljedica umanjene sinteze eritroproteina (protein koji se luči u bubrezima i "+
                                                    "koji stimulira proizvodnju crvenih krvnih zrnaca)."
                                        );
        }
    }

}


export default ResultsController;
