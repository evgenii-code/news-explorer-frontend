export default function dateFormatter(dateString) {
  const options = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  const date = new Date(dateString).getDate();
  const month = new Date(dateString).getMonth();
  const year = new Date(dateString).getFullYear();
  const result = `${date} ${options[month]}, ${year}`;
  return result;
}
