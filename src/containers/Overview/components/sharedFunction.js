import {Col}             from "reactstrap";
import MixedLineBarChart from "../../../shared/components/chart/MixedLineBarChart";
import React             from "react";

export const countPrep = (data) => {
	let result = 0;
	if (data[2] && data[2].length > 0) {
		result = data[2].reduce((accumulator, currentValue) => (accumulator + currentValue), 0);
	}
	return result;
}

export const drawChartItem = (dataItem) => {
	//[["08:38"],[300,421],[1569],[1089],[2658],[10],["Packpart Molding"]]
	if (dataItem.length > 0){
		let chartLabels = dataItem[0];
		let chartData1 =  dataItem[2];
		let chartData2 =  dataItem[3];

		let standardData1 = Array(chartData1.length);
		if (dataItem[1] && dataItem[1][0]){
			standardData1.fill(dataItem[1][0]);
		} else {
			standardData1.fill(0);
		}

		let standardData2 =  Array(chartData1.length);
		if (dataItem[1] && dataItem[1][1]){
			standardData2.fill(dataItem[1][1]);
		} else {
			standardData2.fill(0);
		}

		let chartOptions = {
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
					borderWidth: 1,
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
					borderWidth: 1,
				},
				{
					label          : "preparing Time dataset",
					data           : chartData1,
					backgroundColor: "#2880E9",
					fill: true,
					lineTension: 0,
					pointRadius: 0,
					pointHoverRadius: 0,
				},
				{
					label          : "Curing Time dataset",
					data           : chartData2,
					backgroundColor: "#005FCE",
					fill: true,
					lineTension: 0,
					pointRadius: 0,
					pointHoverRadius: 0,
				}
			]
		};

		return <Col md={2.5} lg={2.5} style={{marginRight: 10, marginBottom: 10, borderRadius: 5}}>
			<MixedLineBarChart chartOptions={chartOptions} chartInitialData={initialData} labels={chartLabels}/>
		</Col>
	} else {
		return <MixedLineBarChart />
	}
}

export const countCuring = (data) => {
	let result = 0;
	if (data[3] && data[3].length > 0) {
		result = data[3].reduce((accumulator, currentValue) => (accumulator + currentValue), 0);
	}
	return result;
}
