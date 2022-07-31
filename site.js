// Self executing function to avoid pollution of JavaScript's global namespace
(
    async () => {
        var apiData = await getApiData();
        const branches = apiData.map(o => o.branch); // Array of the values based on the property specified. 
        const revenues2020 = apiData.map(o => o.revenue2020);
        const revenues2019 = apiData.map(o => o.revenue2019);
        const revenues2018 = apiData.map(o => o.revenue2018);
        
        const ctx = document.getElementById('chart');
        new Chart(ctx, {
            type: 'horizontalBar', // 'bar',
            data: {
                labels: branches,
                datasets: [
                    {
                        backgroundColor: "green",
                        label: "Revenues - 2018",
                        data: revenues2018
                    },                    {
                        backgroundColor: "red",
                        label: "Revenues - 2019",
                        data: revenues2019
                    },
                    {
                        backgroundColor: "purple",
                        label: "Revenues - 2020",
                        data: revenues2019
                    }
                ]
            }
        });

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