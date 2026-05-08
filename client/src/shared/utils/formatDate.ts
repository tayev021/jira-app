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

export function formatDate(date: Date | string) {
  const baseDate = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(baseDate.getTime())) {
    throw new Error('Invalid date');
  }

  const day = String(baseDate.getDate()).padStart(2, '0');
  const month = months[baseDate.getMonth()];
  const year = baseDate.getFullYear();
  const hours = String(baseDate.getHours()).padStart(2, '0');
  const minutes = String(baseDate.getMinutes()).padStart(2, '0');

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}
