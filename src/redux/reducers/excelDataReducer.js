import {
	STORE_DEFECT_STATUS_DATA,
	STORE_DEFECT_SUMMARY_DATA
} from '../actions/excelDataActions';

const initialState = {
	defectStatusData: null,
	defectSummaryData: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case STORE_DEFECT_STATUS_DATA:
			return {
				...state,
				defectStatusData: action.defectStatusData
			}
		case STORE_DEFECT_SUMMARY_DATA:
			return {
				...state,
				defectSummaryData: action.defectSummaryData
			}
		default:
			return state;
	}
}
