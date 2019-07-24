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
			label          : "Bar dataset",
			backgroundColor: "#2880E9",
			data           : [1, 2, 3, 4, 5, 6, 7]
		},
		{
			label          : "Line dataset",
			data           : [5, 2, 3, 4, 5, 6, 7],
			type           : 'line',
			backgroundColor: "#FFFFFF"
		}
	]
};

const options = {
	legend: {
		display : true,
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
		if (this.props !== prevProps) {
			let {labels, data, customTooltips, showLegend} = this.props;
			if (labels && data && this.canvas) {
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
				this.myChart.data = {
					labels  : labels,
					datasets: data
				};

				this.myChart.options.legend.display = !!showLegend;

				if (customTooltips) {
					this.myChart.options.tooltips = customTooltips;
				}

				this.myChart.update();
				this.setState({loading: false});
			}
		}
	}

	componentDidMount() {
		const ctx    = this.canvas.getContext('2d');
		this.myChart = new Chart(ctx, {
			type   : 'bar',
			data   : initialData,
			options: options,
			plugins: pluginDrawZeroLineForReportChart,
		});
	}

	render() {
		return (
			<div style={{padding: 20, paddingLeft: 200}}>
				<canvas width={1000} height={500} ref={(element) => this.canvas = element}/>
			</div>
		);
	}
}
