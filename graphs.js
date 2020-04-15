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
var prevHour = moment().subtract(100, 'hours').utc().valueOf();
fetch('http://localhost:8086/query?db=bbq&q='+encodeURIComponent('SELECT * FROM temperature WHERE time > ' + prevHour))
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		let cols = data.results[0].series[0].columns;
		let tIdx = -1;
		let p1Idx = -1;
		let p2Idx = -1;
		let p3Idx = -1;
		let p4Idx = -1;
		let p5Idx = -1;
		let p6Idx = -1;

		for (let i = 0; i < cols.length; i++) {
			switch (cols[i]) {
				case "time":
					tIdx = i;
					break;
				case "probe1":
					p1Idx = i;
					break;
				case "probe2":
					p2Idx = i;
					break;
				case "probe3":
					p3Idx = i;
					break;
				case "probe4":
					p4Idx = i;
					break;
				case "probe5":
					p5Idx = i;
					break;
				case "probe6":
					p6Idx = i;
					break;
			}
		}

		let vals = data.results[0].series[0].values;

		let from = 0 ? vals.length <= maxLen : vals.length - maxLen;
		for (let i = from; i < vals.length; i++) {
			
			let v = vals[i];
			let t = new Date(v[tIdx]);
			let p = [
				v[p1Idx],
				v[p2Idx],
				v[p3Idx],
				v[p4Idx],
				v[p5Idx],
				v[p6Idx]
			];

			for (let j = 0; j < p.length; j++) {
				if (p[j] === -32768) {
					continue;
				}

				chart.data.datasets[j].data.push({
					x: t,
					y: p[j]
				});
			}
		}
		chart.update();
		console.log(data);
	});

/*
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
*/
