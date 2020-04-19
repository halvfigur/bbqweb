var canvas = document.getElementById("myCanvas");

var chart = Chart.Line(canvas,{
	data:{
		datasets: [
			{
				label: "Probe1", 
				fill: false,
				data: [],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
				],

				borderWidth: 1
			},
			{
				label: "Probe2", 
				fill: false,
				data: [],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
				],

				borderWidth: 1
			},
			{
				label: "Probe3", 
				fill: false,
				data: [],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
				],

				borderWidth: 1
			},
			{
				label: "Probe4", 
				fill: false,
				data: [],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
				],

				borderWidth: 1
			},
			{
				label: "Probe5", 
				fill: false,
				data: [],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
				],

				borderWidth: 1
			},
			{
				label: "Probe6", 
				fill: false,
				data: [],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
				],

				borderWidth: 1
			}
		],
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
	let ds = chart.data.datasets;

	for (let i = 0; i < temps.length; i++) {
		let temp = temps[i];

		// -32768 is the smallest unsigned 16 bit integer and means
		// there's no data available for this probe at this time.
		if (temp === -32768) {
			continue;
		}

		console.log('ds[i].length = maxLen', ds[i].data.length, ' == ', maxLen);
		if (ds[i].data.length == maxLen) {
			ds[i].data.shift();
		}

		ds[i].data.push({
			x: t,
			y: temp
		});

		chart.update();
	}
}

ws.onerror = function(evt) {
	console.log("ERROR: " + evt.data);
}
