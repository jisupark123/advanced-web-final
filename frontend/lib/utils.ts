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
