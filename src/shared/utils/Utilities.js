import moment from "moment";

//flag: start => get 12:00 am of input date
//flag: end  => get 23:59 of the input date
export const changeDateToUnix = (inputDate, flag = "start") => {
	let result = moment(inputDate).startOf("date").unix();
	if (flag == "end"){
		result = moment(inputDate).endOf("date").unix();
	}
	return result;
}
