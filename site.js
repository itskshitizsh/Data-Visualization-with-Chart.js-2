// Self executing function to avoid pollution of JavaScript's global namespace
(
    () => {
        const ctx = document.getElementById('chart').getContext('2d');
        ctx.moveTo(0,0); // Upper left corner
        ctx.lineTo(200,100); 
        ctx.stroke(); // Move hand to corrdinate

    }
)(); 

// *************************** NOTES ***************************
/*
Chart.js is an open source JavaScript library that lets us draw data visualizations on <canvas>
*/