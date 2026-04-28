export function getFormattedDate() {
  const date = new Date();
  const weekDay = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
  }).format(new Date());
  const month = new Intl.DateTimeFormat('en-GB', {
    month: 'long',
  }).format(new Date());

  return `${weekDay}, ${month} ${date.getDate()}`;
}
