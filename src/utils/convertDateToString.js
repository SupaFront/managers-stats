import moment from 'moment';

export function convertDateToString(date) {
  return moment(date).format('DD.MM.YYYY  HH:mm');
}
