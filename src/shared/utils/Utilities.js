import moment from "moment";

export const changeDateToUnix = (inputDate) => {
	let result = moment(inputDate).unix();
	return result;
}
