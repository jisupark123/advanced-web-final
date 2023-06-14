export function cls(...classnames: string[]) {
  return classnames.join(' ');
}

export function getDDate(dateString: string): number {
  const currentDate = new Date();
  const compareDate = new Date(dateString);

  // 현재 날짜의 년, 월, 일만 사용하고 시간은 00:00:00으로 설정
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const currentTime = new Date(currentYear, currentMonth, currentDay);

  // 비교 날짜의 년, 월, 일만 사용하고 시간은 00:00:00으로 설정
  const compareYear = compareDate.getFullYear();
  const compareMonth = compareDate.getMonth();
  const compareDay = compareDate.getDate();
  const compareTime = new Date(compareYear, compareMonth, compareDay);

  // 오늘과 비교 날짜의 차이를 계산하여 반환
  const differenceInTime = compareTime.getTime() - currentTime.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  return -differenceInDays;
}

// new Date() -> 2023.06.14
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

// 2023-06-30 -> 2023-06-30T06:00:00
export function setTimezoneTo6AM(dateString: string): string {
  const date = new Date(dateString);
  date.setUTCHours(6, 0, 0, 0); // 시간을 6시로 설정

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const formattedDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  return formattedDateString;
}

// "2023-07-28 15:00:00.000" -> input type date의 기본값에 들어갈 수 있는 형식 2023-07-28 으로 변환
export function extractDateFromString(dateTimeString: string): string {
  const dateOnly = dateTimeString.split(' ')[0];
  return dateOnly;
}
