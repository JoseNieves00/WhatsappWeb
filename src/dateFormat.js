function getHourFormat(timestamp) {
  let seconds = timestamp.seconds;
  let date = new Date(seconds * 1000);

  let year = date.getFullYear();
  let month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth();
  let day =
    date.getDay() + 1 < 10 ? '0' + (date.getDay() + 1) : date.getDay() + 1;
  let hour = date.getHours();
  let minute =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

  let dateNow = new Date();
  dateNow.setHours(0);
  dateNow.setMinutes(0);
  dateNow.setSeconds(0);
  let isOld = date < dateNow;

  if (isOld) {
    return `${day}/${month}/${year}`;
  } else {
    let zone = hour >= 12 ? 'p.m' : 'a.m';
    let hourReal = hour > 12 ? hour - 12 : hour;
    hourReal = hourReal < 10 ? '0' + hourReal : hourReal;
    return `${hourReal}:${minute} ${zone}`;
  }
}

export default getHourFormat;
