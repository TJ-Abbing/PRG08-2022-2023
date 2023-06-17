const canvas = document.getElementById('myChart');
let myChart;

export function createChart(columns, labelx, labely) {
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
                    title: { display: true, text: labelx }
                },
                y: {
                    title: { display: true, text: labely }
                }
            },
            layout: {
                padding: 30
            }
        }
    }

    myChart = new Chart(canvas, config);
}

export function updateChart(label, data) {
    myChart.data.datasets.push({
        label,
        data,
        backgroundColor: 'rgb(255, 44, 44)'
    });
    myChart.update();
}

const data = [
    { horsepower: 130, mpg: 18 },
    { horsepower: 165, mpg: 15 },
    { horsepower: 225, mpg: 14 },
    { horsepower: 97, mpg: 18 },
    { horsepower: 88, mpg: 27 },
    { horsepower: 193, mpg: 9 },
    { horsepower: 80, mpg: 25 },
];

const chartdata = data.map(car => ({
    x: car.horsepower,
    y: car.mpg,
}));

createChart(chartdata, "Horsepower", "MPG");