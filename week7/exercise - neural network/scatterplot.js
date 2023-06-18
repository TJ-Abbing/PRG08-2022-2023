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
        x: car.weight,
        y: car.mpg,
    }));

    createChart(chartdata, "Weight", "MPG");
}