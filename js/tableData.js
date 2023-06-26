const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const season = ["Зимняя", "Зимняя", "Зимняя", "Зимняя", "Зимняя", "Зимняя", "Зимняя", "Зимняя", "Зимняя", "Зимняя", "Летняя", "Летняя", "Летняя", "Летняя", "Летняя", "Летняя", "Летняя", "Летняя", "Летняя", "Летняя"];
const year = [2014, 2013, 2014, 2014, 2014, 2014, 2014, 2014, 2014, 2014, 2016, 2016, 2016, 2016, 2016, 2016, 2016, 2016, 2016, 2016];
const country = ["Россия", "Россия", "Канада", "США", "Голландия", "Германия", "Швейцария", "Белоруссия", "Австрия", "Франция", "Словения", "США", "Великобритания", "Китай", "Казахстан", "Латвия", "Лихтенштейн", "США", "Великобритания", "Россия"];
const gold = [13, 11, 10, 9, 8, 8, 6, 5, 4, 46, 27, 26, 19, 17, 12, 9, 8, 8, 8, 8];
const silver = [11, 5, 10, 7, 7, 6, 3, 0, 8, 4, 37, 23, 18, 18, 10, 8, 18, 3, 12, 6];
const bronze = [9, 10, 5, 12, 9, 5, 2, 1, 5, 7, 1, 0, 2, 2, 1, 38, 17, 26, 19, 15];
const sum = [33, 26, 25, 28, 24, 19, 11, 6, 17, 15, 121, 67, 70, 56, 42, 41, 42, 21, 28, 19];

let isNumberSort = {
  number: true,
  season: false,
  year: true,
  country: false,
  gold: true,
  silver: true,
  bronze: true,
  sum: true,
}

const columnFilter = ["Сезон", "Год ", "Страна"];
const valueFilter = ["season", "year ", "country"];

let fillTable = [];
for (let i = 0; i < number.length; i++) {
  let toAdd = {};
  toAdd.number = number[i];
  toAdd.season = season[i];
  toAdd.year = year[i];
  toAdd.country = country[i];
  toAdd.gold = gold[i];
  toAdd.silver = silver[i];
  toAdd.bronze = bronze[i];
  toAdd.sum = sum[i];
  fillTable.push(toAdd);
}

function getBarChartData() {
  let data = [];
  let uniqueCountries = [...new Set(country)];

  uniqueCountries.forEach(function (item) {
    let obj = {
      "labelX": item,
      "MaxGold": 0,
      "MaxSilver": 0,
      "MaxBronze": 0,
      "MaxTotal": 0
    };

    for (let i = 0; i < country.length; i++) {
      if (country[i] === item) {
        if (gold[i] > obj.MaxGold) {
          obj.MaxGold = gold[i];
        }
        if (silver[i] > obj.MaxSilver) {
          obj.MaxSilver = silver[i];
        }
        if (bronze[i] > obj.MaxBronze) {
          obj.MaxBronze = bronze[i];
        }
        if (sum[i] > obj.MaxTotal) {
          obj.MaxTotal = sum[i];
        }
      }
    }
    data.push(obj);
  });
  return data;
}
