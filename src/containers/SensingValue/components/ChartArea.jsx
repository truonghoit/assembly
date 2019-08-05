import {Component}       from "react";
import React             from "react";
import {Col}             from "reactstrap";
import MixedLineBarChart from "../../../shared/components/chart/MixedLineBarChart";

class ChartArea extends Component {
	constructor(props) {
		super(props);
	}

	drawChartItem = (dataItem, type = "temp") => {
		console.log("drawChartItem: ", dataItem);
		let result =  null;
		let bgColor = '';
		let chartType = 'line';

		switch (type) {
			case 'pressure':
				bgColor = '#260A64';
				chartType = 'line';
				break;
			case 'curing':
				bgColor = '#001E6B';
				chartType = 'bar';
				break;
			default:
				bgColor = '#4E0033';
				chartType = 'line';
				break;
		}

		if (type == 'temp'){
			let chartLabels =dataItem[0];
			let chartData = dataItem[2];

			let standardData1 = Array(chartData.length);
			if (dataItem[1] && dataItem[1][0]){
				standardData1.fill(dataItem[1][0]);
				//standardData1.fill(300);
			} else {
				standardData1.fill(0);
			}

			let standardData2 =  Array(chartData.length);
			if (dataItem[1] && dataItem[1][1]){
				standardData2.fill(dataItem[1][1]);
				//standardData2.fill(500);
			} else {
				standardData2.fill(0);
			}

			let initialData = {
				labels  : chartLabels,
				datasets: [
					{
						label          : "Line Standard 1",
						data           : standardData1,
						type           : 'line',
						borderColor: "#FFFFFF",
						pointRadius: 0,
						pointHoverRadius: 0,
						fill: false,
						lineTension: 0,
					},
					{
						label          : "Line Standard 2",
						data           : standardData2,
						type           : 'line',
						borderColor: "#FFFFFF",
						pointRadius: 0,
						pointHoverRadius: 0,
						fill: false,
						lineTension: 0,
					},
					{
						label          : "Bar dataset",
						data           : chartData,
						borderColor: "#FF71CF",
						fill: false,
						lineTension: 0,
						pointRadius: 0,
						pointHoverRadius: 0,
					},
				]
			};

			result = <Col md={2.5} lg={2.5} style={{backgroundColor: bgColor, marginRight: 10, marginBottom: 10, borderRadius: 5}}>
				<MixedLineBarChart chartInitialData={initialData} labels={chartLabels} type={chartType} />
			</Col>
		} else if (type == 'pressure'){
			let chartLabels =dataItem[0];
			let chartData = dataItem[2];

			let standardData1 = Array(chartData.length);
			if (dataItem[1] && dataItem[1][0]){
				standardData1.fill(dataItem[1][0]);
				//standardData1.fill(300);
			} else {
				standardData1.fill(0);
			}

			let standardData2 =  Array(chartData.length);
			if (dataItem[1] && dataItem[1][1]){
				standardData2.fill(dataItem[1][1]);
				//standardData2.fill(500);
			} else {
				standardData2.fill(0);
			}

			let initialData = {
				labels  : chartLabels,
				datasets: [
					{
						label          : "Line Standard 1",
						data           : standardData1,
						type           : 'line',
						borderColor: "#FFFFFF",
						pointRadius: 0,
						pointHoverRadius: 0,
						fill: false,
						lineTension: 0,
					},
					{
						label          : "Line Standard 2",
						data           : standardData2,
						type           : 'line',
						borderColor: "#FFFFFF",
						pointRadius: 0,
						pointHoverRadius: 0,
						fill: false,
						lineTension: 0,
					},
					{
						label          : "Bar dataset",
						data           : chartData,
						borderColor: "#8C67F6",
						fill: false,
						lineTension: 0,
						pointRadius: 0,
						pointHoverRadius: 0,
					},
				]
			};

			result = <Col md={2.5} lg={2.5} style={{backgroundColor: bgColor, marginRight: 10, marginBottom: 10, borderRadius: 5}}>
				<MixedLineBarChart chartInitialData={initialData} labels={chartLabels} type={chartType} />
			</Col>
		} else if (type == 'curing'){
			let chartLabels =dataItem[0];
			let chartData = dataItem[2];

			let standardData1 = Array(chartData.length);
			if (dataItem[1] && dataItem[1][0]){
				standardData1.fill(dataItem[1][0]);
				//standardData1.fill(300);
			} else {
				standardData1.fill(0);
			}

			let standardData2 =  Array(chartData.length);
			if (dataItem[1] && dataItem[1][1]){
				standardData2.fill(dataItem[1][1]);
				//standardData2.fill(500);
			} else {
				standardData2.fill(0);
			}

			let chartOption = {
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
							stacked: true,
							ticks: {
								fontColor: '#BEBEBE',
							},
						},
					],
					yAxes: [
						{
							stacked: true,
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

			let initialData = {
				labels  : chartLabels,
				datasets: [
					{
						label          : "Line Standard 1",
						data           : standardData1,
						type           : 'line',
						borderColor: "#FFFFFF",
						pointRadius: 0,
						pointHoverRadius: 0,
						fill: false,
						lineTension: 0,
					},
					{
						label          : "Line Standard 2",
						data           : standardData2,
						type           : 'line',
						borderColor: "#FFFFFF",
						pointRadius: 0,
						pointHoverRadius: 0,
						fill: false,
						lineTension: 0,
					},
					{
						label          : "preparing Time dataset",
						data           : chartData,
						backgroundColor: "#2880E9",
						fill: true,
						lineTension: 0,
						pointRadius: 0,
						pointHoverRadius: 0,
					},
					{
						label          : "Curing Time dataset",
						data           : chartData,
						backgroundColor: "#005FCE",
						fill: true,
						lineTension: 0,
						pointRadius: 0,
						pointHoverRadius: 0,
					}
				]
			};

			result = <Col md={2.5} lg={2.5} style={{backgroundColor: bgColor, marginRight: 10, marginBottom: 10, borderRadius: 5}}>
				<MixedLineBarChart chartOption={chartOption} chartInitialData={initialData} labels={chartLabels} type={chartType} />
			</Col>
		}
		return result;
	}

	fillChartContent = (chartData, type) => {
		console.log("fillChartContent");
		console.log("chartData: ", chartData);
		console.log("type: ", type);
		/*
		 (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
		 0:
		 graph_1: Array(3)
		 0: (12) ["07:30", "08:30", "09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "17:30", "18:30", "19:30"]
		 1: (12) [162, 332, 502, 673, 845, 14, 185, 356, 523, 846, 14, 25]
		 2: (2) [3, 5]
		 length: 3
		 __proto__: Array(0)
		 __proto__: Object
		 1: {graph_2: Array(3)}
		 */
		let chartArray = [];
		console.log("43: ", chartData);
		for (let i = 0; i < chartData.length; i++){
			let dataItem = chartData[i][`graph_${i+1}`];
			if (dataItem.length > 0){
				chartArray[i] = this.drawChartItem(dataItem, type);
			}

		}
		return <div className="d-flex flex-wrap" style={{marginLeft: -15}}>
					${chartArray}
				</div>
	}

	render(){
		let {chartData, type} = this.props;
		let chartContent = this.fillChartContent(chartData, type);
		return chartContent;
	}
}

export default ChartArea;
