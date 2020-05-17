export default function convertToDate(date: string): Date {
  const [day, month, year] = date.split('/');
  const convertedDate: Date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
  );

  return convertedDate;
}
