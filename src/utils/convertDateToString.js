import moment from 'moment';

export function convertDateToString(date) {
  return moment(date).format('HH:mm     DD.MM.YYYY');
}
