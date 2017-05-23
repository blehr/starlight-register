import moment from 'moment';

export function getCashTotals(arr) {
  const cash = [];
  arr.forEach(o => {
    if (!o.credit) {
      cash.push(o.total);
    } 
  });

  return cash.reduce((a, b) => a + b, 0);
}

export function getCreditTotals(arr) {
  const credit = [];
  arr.forEach(o => {
    if (o.credit) {
      credit.push(o.total);
    } 
  });

  return credit.reduce((a, b) => a + b, 0);
}

export function getTotal(arr) {
  const total = [];
  arr.forEach(o => {
    total.push(o.total);
  });

  return total.reduce((a, b) => a + b, 0);
}

export function getNumberOfPickups(arr) {
  let counter = 0;
  arr.forEach(o => {
    if (o.delivery == 0) {
      counter++
    }
  });
  return counter;
}

export function getNumberOfDeliveries(arr) {
  let counter = 0;
  arr.forEach(o => {
    if (o.delivery != 0) {
      counter++
    }
  });
  return counter;
}

export function getNumberOfOrders(arr) {
  return arr.length;
}

export function getTodayDate() {
  return moment().date();
}

export function createDateObjects(n) {
  const dateArray = [];
  for (let i = 0; i < n; i++) {
    dateArray.push([]);
  }
  return dateArray;
}

export function sortByDays(arr) {
  const todayDate = getTodayDate();
  const dateArray = createDateObjects(todayDate);
  
  arr.forEach(o => {
    const date = moment(o.createdAt).date() - 1;
    dateArray[date].push(o);
  });
  return dateArray;
}

