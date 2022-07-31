// Self executing function to avoid pollution of JavaScript's global namespace
(
    async () => {

        Chart.defaults.global.defaultColor = "rgba(255,0,0,1)";
        //  Configuration setting as global
        //  Chart.defaults.scale.ticks.beginAtZero = true;
        // Chart.defaults.global.legend.display = false;
        Chart.defaults.global.animation.duration = 2000;

        var apiData = await getApiData();
        const branches = apiData.map(o => o.branch); // Array of the values based on the property specified. 
        const revenues2020 = apiData.map(o => o.revenue2020);
        const revenues2019 = apiData.map(o => o.revenue2019);
        const revenues2018 = apiData.map(o => o.revenue2018);
        const colorPool = ["purple", "red", "green", "blue", "orange"]
        
        const refbutton = document.getElementById('refreshButton');
        refbutton.addEventListener("click", refreshFun);
        
        const ctx = document.getElementById('chart');
        // https://www.chartjs.org/docs/latest/charts
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: branches,
                datasets: [ // Added pattern for color blind people. 
                // For checking all available configurations check https://github.com/ashiguruma/patternomaly
                    {
                        backgroundColor: function(context) {
                            let index = context.dataIndex;
                            let value = context.dataset.data[index];
                            return value < 20000 ? "red" : "green";
                        },
                        label: "Revenues - 2018",
                        data: revenues2018
                    },                    {
                        backgroundColor: pattern.draw("circle","purple"),
                        label: "Revenues - 2019",
                        data: revenues2019
                    },
                    {
                        backgroundColor: pattern.draw("diamond","blue"),
                        label: "Revenues - 2020",
                        data: revenues2020
                    }
                ]
            },
            // Configuration for a chart
            // https://www.chartjs.org/docs/latest/configuration/
            options: {
                // responsive: false,
                maintainAspectRatio: false,
                onResize: function(chart, size){console.log(chart, size)},
                legend: {
                    display: false,
                    onclick: function() {

                    }
                },
                animation: {
                    duration: 5000, // 5 sec. And to disable animation, we can set this field to 0
                    onComplete: function() {
                        refbutton.disabled = false;
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        function refreshFun() {
            chart.data.datasets[2].data[2] = 50000;
            chart.update();
            console.log("Chart is updated!");
        }

        // An async function enables the use of await in the function
        async function getApiData() {
            const apiResult = await fetch("https://chartjsapi.azurewebsites.net/branch/revenues");
            const json = await apiResult.json();
            return json;
        }

    }
)(); 

// *************************** NOTES ***************************
/*
Chart.js is an open source JavaScript library that lets us draw data visualizations on <canvas>
*/

// Mini API
// https://chartjsapi.azurewebsites.net/branch/revenues