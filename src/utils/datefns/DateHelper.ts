import { addDays ,format, getUnixTime} from 'date-fns';

const handleAddDays = (date: Date, days: number) => {
  const newDate = addDays(date, days);
  return newDate
};

const handleFormatDate = (date:Date,DATE_FORMAT:string) => format(date,DATE_FORMAT)

const handleGetUnixTime = (date:Date) => getUnixTime(date)

export default {handleAddDays,handleFormatDate,handleGetUnixTime}