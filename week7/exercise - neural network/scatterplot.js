const nn = ml5.neuralNetwork({ task: 'regression', debug: true })
const canvas = document.getElementById('myChart')
let myChart

// documentatie 
// https://www.chartjs.org/docs/latest/charts/scatter.html

export function createChart(columns, labelx, labely){
    const config = {
        type: 'scatter',
        data: {
            datasets: [{
                label: `${labelx} vs ${labely}`,
                data: columns,
                backgroundColor: 'rgb(185, 185, 255)'
            }]
        },
        options: {
            scales: {
                x: {
                    title: {display: true, text: labelx}
                },
                y: {
                    title: {display: true, text: labely}
                }
            },
            layout: {
                padding: 30
            }
        }
    }

    myChart = new Chart(canvas, config)
}

// update an existing chart
// https://www.chartjs.org/docs/latest/developers/updates.html
export function updateChart(label, data){
    myChart.data.datasets.push({
        label,
        data,
        backgroundColor: 'rgb(255, 44, 44)'
    })
    myChart.update()
}

function loadData(){
    Papa.parse("./data/cars.csv", {
        download:true,
        header:true, 
        dynamicTyping:true,
        complete: results => checkData(results.data)
    })
}   loadData()

function checkData(data) {
    console.table(data);

    const chartdata = data.map(car => ({
        x: car.horsepower,
        y: car.mpg,
    }));

    createChart(chartdata, "Weight", "MPG");

    // shuffle
    data.sort(() => (Math.random() - 0.5))
    
    // een voor een de data toevoegen aan het neural network
    for (let car of data) {
        nn.addData({ horsepower: car.horsepower }, { mpg: car.mpg })
    }
    
    // normalize
    nn.normalizeData()
    
    function startTraining() {
        nn.train({ epochs: 40 }, () => finishedTraining()) 
    } startTraining();
    
    async function finishedTraining(){
        console.log("Finished training!")

        let predictions = []
        for (let hp = 40; hp < 250; hp += 2) {
            const pred = await nn.predict({horsepower: hp})
            predictions.push({x: hp, y: pred[0].mpg})
        }
        updateChart("Predictions", predictions)
    }

    document.getElementById("btn").addEventListener("click", makePrediction);

    async function makePrediction() {
        const field = document.getElementById("field");
        const horsepower = Number(field.value);
    
        const results = await nn.predict({ horsepower: horsepower });
        console.log(`Geschat verbruik: ${results[0].mpg}`);
    }
    makePrediction();
    
}
