export const dateFormatter = (date: string) => {
      // делаем вывод времени создания заказа
  const orderCreatedDate = new Date(date);
  // везде ниже делаем плавающий ноль
  const todayDate = new Date().getDate().toString().padStart(2, "0");
  const orderCreateDayDate = orderCreatedDate.getDate().toString().padStart(2, "0");
  const orderCreateDayMonth = orderCreatedDate.getMonth().toString().padStart(2, "0");
  const orderCreateDayYear = orderCreatedDate.getFullYear();
  const hours = orderCreatedDate.getHours().toString().padStart(2, "0");
  const minutes = orderCreatedDate.getMinutes().toString().padStart(2, "0");
  // Форматируем часы и минуты с ведущим нулем
  const orderCreatedTime = `${hours}:${minutes}`;
  const formattedDateStr = todayDate < orderCreateDayDate ? `Сегодня, ${orderCreatedTime}` : `${orderCreateDayDate}.${orderCreateDayMonth}.${orderCreateDayYear}, ${orderCreatedTime}`;
  return formattedDateStr;
}