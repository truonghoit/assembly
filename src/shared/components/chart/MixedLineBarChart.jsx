import React, {PureComponent}             from 'react';
import 'chartjs-plugin-zoom';
import Chart                              from 'chart.js';
import {pluginDrawZeroLineForReportChart} from "../../utils/plugins";

let initialData = {
	labels  : [
		"7:30",
		"8:30",
		"9:30",
		"10:30",
		"11:30",
		"12:30",
		"13:30",
	],
	datasets: [
		{
			label          : "Line dataset",
			data           : [4, 4, 4, 4, 4, 4, 4],
			type           : 'line',
			borderColor: "#EBEDF1",
			fill: false,
			lineTension: 0,
		},
		{
			label          : "Bar dataset",
			backgroundColor: "#2880E9",
			data           : [2, 3, 5, 6, 3, 1, 2]
		},
	]
};

const options = {
	legend: {
		display : false,
		position: 'left',
		labels: {
			boxWidth: 60,
			fontSize: 20,
			fontColor: '#BEBEBE'
		}
	},
	scales: {
		xAxes: [
			{
				ticks: {
					fontColor: '#BEBEBE',
				},
			},
		],
		yAxes: [
			{
				gridLines: {
					color        : '#696F76',
					display      : true,
					drawBorder   : false,
					zeroLineColor: '#696F76',
				},
				ticks    : {
					beginAtZero: true,
					fontColor  : '#868D93',
				},
			},
		],
	},
};

const override = `
    position: absolute;
    display:block;
    left:45%;
    top: 30%;
    z-index: 100000;
`;

export default class MixedLineBarChart extends PureComponent {

	constructor(props) {
		super(props);

		this.canvas = null;

		this.state = {
			loading: true
		};
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log("componentDidUpdate");
		if (this.props !== prevProps) {
			console.log("componentDidUpdate: this.props !== prevProps");
			let {labels, data, customTooltips, showLegend, type} = this.props;
			if (labels && data && this.canvas) {
				console.log("94: ", data);
				// These don't work
				// this.myChart.data.labels = labels;
				// this.myChart.data.datasets = data;

				// These don't work either
				// this.myChart.config.data.labels = labels;
				// this.myChart.config.data.datasets = data;

				// This works
				// this.myChart.config.data = {
				//     labels: labels,
				//     datasets: data
				// };
				// This works too
				 /*this.myChart.data = {
					labels  : labels,
					datasets: data
				};*/

				this.myChart.options.legend.display = !!showLegend;
				this.myChart.type = "bar";
				if (type) {
					this.myChart.type = type;
				}
				this.myChart.update();
			}
		}
	}

	componentDidMount() {
		const ctx    = this.canvas.getContext('2d');
		let {type, chartInitialData, chartOption} = this.props;
		if (!type){
			type = 'bar';
		}
		let data = chartInitialData?chartInitialData:initialData;
		let options = chartOption?chartOption:options;
		this.myChart = new Chart(ctx, {
			type   : type,
			data   : data,
			options: options,
			plugins: pluginDrawZeroLineForReportChart,
		});

		this.myChart.update();
	}

	render() {
		let {style} = this.props;
		return (
			<div>
				<canvas style={style} ref={(element) => this.canvas = element}/>
			</div>
		);
	}
}
