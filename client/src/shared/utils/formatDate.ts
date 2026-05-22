type DateFormat = 'DD MMM YYYY, HH:MM' | 'DD MMM YYYY' | 'WWWW, MMM DD';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export function formatDate(
  date: Date | string,
  format: DateFormat = 'DD MMM YYYY, HH:MM'
) {
  const baseDate = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(baseDate.getTime())) {
    throw new Error('Invalid date');
  }

  const day = String(baseDate.getDate()).padStart(2, '0');
  const weekDay = weekDays[baseDate.getDay()];
  const month = months[baseDate.getMonth()];
  const year = baseDate.getFullYear();
  const hours = String(baseDate.getHours()).padStart(2, '0');
  const minutes = String(baseDate.getMinutes()).padStart(2, '0');

  switch (format) {
    case 'DD MMM YYYY, HH:MM':
      return `${day} ${month} ${year}, ${hours}:${minutes}`;
    case 'DD MMM YYYY':
      return `${day} ${month} ${year}`;
    case 'WWWW, MMM DD':
      return `${weekDay}, ${month} ${day}`;
    default:
      throw new Error('Unsupported date format');
  }
}
