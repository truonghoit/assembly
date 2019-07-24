export const modelArticleTableColumns = [
	{title: "Model Code", field: "model_cd", visible: false},
	{
		title       : "MODEL",
		field       : "model_nm",
		width       : '49%',
		align       : "center",
		headerFilter: "input"
	},
	{title: "Article", field: "article_no", visible: false},
	{
		title       : "ARTICLE",
		field       : "article_nm",
		width       : '50%',
		align       : "center",
		headerFilter: "input"
	}
];

export const defaultModelArticleTableData = [
	{
		model_cd  : "",
		model_nm  : "",
		article_no: "",
		article_nm: ""
	},
];

let formatStandard = (cell) => {
	cell.getElement().style.color = "#03CF65";
};

let formatYellow = (cell) => {
	cell.getElement().style.color = "#FFD44F";
};

let formatRed = (cell) => {
	cell.getElement().style.color = "#F84E4E";
};

export const alarmSensorTableColumns = [
	{title: "MODEL CODE", field: "model_cd", visible: false},
	{
		title       : "MODEL",
		field       : "model_nm",
		width       : '10%',
		align       : "center",
		headerFilter: "input"
	},
	{title: "ARTICLE NO", field: "article_no", visible: false},
	{
		title       : "ARTICLE",
		field       : "article_nm",
		width       : '9%',
		align       : "center",
		headerFilter: "input"
	},
	{title: "PROCESS CODE", field: "process_cd", visible: false},
	{
		title       : "PROCESS",
		field       : "process_nm",
		width       : '10%',
		align       : "center",
		headerFilter: "input"
	},

	{
		title  : "TEMPERATURE",
		columns: [
			{
				title          : "<span style='color:#03CF65; font-size: large'>●</span>",
				field          : "temp_standard",
				width          : '8%',
				align          : "center",
				formatterParams: formatStandard
			},
			{
				title          : "<span style='color:#FFD44F; font-size: large'>●</span>",
				field          : "temp_yellow",
				width          : '8%',
				align          : "center",
				formatterParams: formatYellow
			},
			{
				title          : "<span style='color:#F84E4E; font-size: large'>●</span>",
				field          : "temp_red",
				width          : '8%',
				align          : "center",
				formatterParams: formatRed
			},
		],
	},
	{
		title  : "PRESSURE",
		columns: [
			{
				title          : "<span style='color:#03CF65; font-size: large'>●</span>",
				field          : "pres_standard",
				width          : '8%',
				align          : "center",
				formatterParams: formatStandard
			},
			{
				title          : "<span style='color:#FFD44F; font-size: large'>●</span>",
				field          : "pres_yellow",
				width          : '8%',
				align          : "center",
				formatterParams: formatYellow
			},
			{
				title          : "<span style='color:#F84E4E; font-size: large'>●</span>",
				field          : "pres_red",
				width          : '8%',
				align          : "center",
				formatterParams: formatRed
			},
		],
	},
	{
		title  : "CURING TIME",
		columns: [
			{
				title          : "<span style='color:#03CF65; font-size: large'>●</span>",
				field          : "cur_standard",
				width          : '8%',
				align          : "center",
				formatterParams: formatStandard
			},
			{
				title          : "<span style='color:#FFD44F; font-size: large'>●</span>",
				field          : "cur_yellow",
				width          : '8%',
				align          : "center",
				formatterParams: formatYellow
			},
			{
				title          : "<span style='color:#F84E4E; font-size: large'>●</span>",
				field          : "cur_red",
				width          : '8%',
				align          : "center",
				formatterParams: formatRed
			},
		],
	},
	{
		columns: [
			{field: "temp_standard_from", visible: false},
			{field: "temp_standard_to", visible: false},
			{field: "temp_yellow_first", visible: false},
			{field: "temp_yellow_last", visible: false},
			{field: "temp_red_first", visible: false},
			{field: "temp_red_last", visible: false},

			{field: "pres_standard_from", visible: false},
			{field: "pres_standard_to", visible: false},
			{field: "pres_yellow_first", visible: false},
			{field: "pres_yellow_last", visible: false},
			{field: "pres_red_first", visible: false},
			{field: "pres_red_last", visible: false},

			{field: "cur_standard_from", visible: false},
			{field: "cur_standard_to", visible: false},
			{field: "cur_yellow_first", visible: false},
			{field: "cur_yellow_last", visible: false},
			{field: "cur_red_first", visible: false},
			{field: "cur_red_last", visible: false},

			{field: "definition_value", visible: false},
		],
	}
];

export const defaultAlarmSensorTableData = [
	{
		model_cd  : '0',
		model_nm  : '0',
		article_no: '0',
		article_nm: '0',
		process_cd: '0',
		process_nm: '0',

		temp_standard: '0-0',
		temp_yellow  : '0-0',
		temp_red     : '0-0',
		pres_standard: '0-0',
		pres_yellow  : '0-0',
		pres_red     : '0-0',
		cur_standard : '0-0',
		cur_yellow   : '0-0',
		cur_red      : '0-0',

		temp_standard_from: '0',
		temp_standard_to  : '0',
		temp_yellow_first : '0',
		temp_yellow_last  : '0',
		temp_red_first    : '0',
		temp_red_last     : '0',
		pres_standard_from: '0',
		pres_standard_to  : '0',
		pres_yellow_first : '0',
		pres_yellow_last  : '0',
		pres_red_first    : '0',
		pres_red_last     : '0',
		cur_standard_from : '0',
		cur_standard_to   : '0',
		cur_yellow_first  : '0',
		cur_yellow_last   : '0',
		cur_red_first     : '0',
		cur_red_last      : '0',
		definition_value  : '0',
	}
];
