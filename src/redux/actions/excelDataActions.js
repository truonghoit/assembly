export const STORE_DEFECT_STATUS_DATA = 'STORE_DEFECT_STATUS_DATA';
export const STORE_DEFECT_SUMMARY_DATA = 'STORE_DEFECT_SUMMARY_DATA';

export function storeDefectStatusData(defectStatusData) {
	return {
		type: STORE_DEFECT_STATUS_DATA,
		defectStatusData: defectStatusData,
	};
}


export function storeDefectSummaryData(defectSummaryData) {
	return {
		type: STORE_DEFECT_SUMMARY_DATA,
		defectSummaryData: defectSummaryData,
	};
}
