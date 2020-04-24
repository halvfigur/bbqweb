var minuteCanvas = document.getElementById("minutes");
var hourCanvas = document.getElementById("minutes");

var chartOptions = {
	scales: {
		yAxes:[{
			gridLines: {
				display:true,
				color:"rgba(255,99,132,0.2)"
			}
		}],
		xAxes:[{
			type: 'time',
			/*
			time: {
				unit: 'minute'
			},
			*/
			gridLines: {
				display:true,
				color:"rgba(255,99,132,0.2)"
			}
		}]
	}
};

var minuteChart = new Chart.Line(minuteCanvas,{
	options: chartOptions
});

var hourChart = new Chart.Line(hourCanvas,{
	options: chartOptions
});

minuteChart.options.scales.xAxes[0].time.unit = 'minute';
hourChart.options.scales.xAxes[0].time.unit = 'hour';

var charts = [
	minuteChart,
	hourChart
];

var colors = [
	{
		background: 'rgba(152, 114, 132, 0.2)',
		border: 'rgba(152, 114, 132, 1)',
	},
	{
		background: 'rgba(117, 185, 190, 0.2)',
		border: 'rgba(117, 185, 190, 1)',
	},
	{
		background: 'rgba(208, 214, 181, 0.2)',
		border: 'rgba(208, 214, 181, 1)',
	},
	{
		background: 'rgba(249, 181, 172, 0.2)',
		border: 'rgba(249, 181, 172, 1)',
	},
	{
		background: 'rgba(238, 118, 116, 0.2)',
		border: 'rgba(238, 118, 116, 1)',
	},
	{
		background: 'rgba(77, 83, 130, 0.2)',
		border: 'rgba(77, 83, 130, 1:)',
	},
];

var maxLen = 10;
var measurements = 0;

var ws = new WebSocket("ws://localhost:9000");

ws.onopen = function(evt) {
	console.log("OPEN");
}

ws.onclose = function(evt) {
	console.log("CLOSE");
	ws = null;
}

ws.onmessage = function(evt) {
	console.log("RESPONSE: " + evt.data);

	let payload = JSON.parse(evt.data);
	let temps = payload.Temperatures;
	let t = payload.T;

	for (let c in charts) {
		let chart = charts[c];

		for (let i = 0; i < temps.length; i++) {
			let temp = temps[i];

			let label = 'Probe' + (i + 1);
			let dsi = chart.data.datasets.findIndex((x) => x.label == label);
			let ds = null;

			if (dsi != -1) {
				ds = chart.data.datasets[dsi];
			} else {
				let color = colors[i];

				ds = {
					label: label, 
					fill: false,
					data: [],
					backgroundColor: [
						color.background,
					],
					borderColor: [
						color.border,
					],

					borderWidth: 1
				}

				chart.data.datasets.push(ds);
			}

			if (ds.data.length == maxLen) {
				ds.data.shift();
			}

			if (temp == -32768) {
				continue;
			}

			ds.data.push({
				x: t,
				y: temp
			});
		}

		chart.update();
	}
}

ws.onerror = function(evt) {
	console.log("ERROR: " + evt.data);
}
