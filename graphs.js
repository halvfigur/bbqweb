var canvas = document.getElementById("myCanvas");

var chart = Chart.Line(canvas,{
	data:{
		datasets: [
			{
				label: "Probe1", 
				data: [],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
				],
				borderColor: [
					'rgba(255,99,132,1)',
				],

				borderWidth: 1
			}
		]
	},
	options:{
		scales: {
			yAxes:[{
				gridLines: {
					display:true,
					color:"rgba(255,99,132,0.2)"
				}
			}],
			xAxes:[{
				type: 'time',
				time: {
					unit: 'minute'
				},
				gridLines: {
					display:true,
					color:"rgba(255,99,132,0.2)"
				}
			}]
		}
	}
});

var maxLen = 10;
var y = 0;
setInterval(function() {
	if (chart.data.datasets[0].data.length > maxLen) {
		chart.data.datasets[0].data.shift();
	}

	chart.data.datasets[0].data.push({
		x: new Date(),
		y: y++
	});
	chart.update();
}, 1000);
