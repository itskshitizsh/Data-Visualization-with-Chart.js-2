// Self executing function to avoid pollution of JavaScript's global namespace
(
    () => {
        const ctx = document.getElementById('chart');
        new Chart(ctx, {
            type: 'bar',
            data: {

                labels: ["Seattle", "Portland", "Monterey", "San Francisco", "San Diego"],
                datasets: [
                    {
                        backgroundColor: "red",
                        label: "Revenues per branch",
                        data: [47100, 67742, 50320, 67993, 50532]
                    },
                    {
                        backgroundColor: "purple",
                        label: "Revenues per branch",
                        data: [43223, 64332, 53322, 67743, 51132]
                    }
                ]
            }
        });
    }
)(); 

// *************************** NOTES ***************************
/*
Chart.js is an open source JavaScript library that lets us draw data visualizations on <canvas>
*/