const columnNames = ["№", "Сезон", "Год ", "Страна", "Золото", "Серебро", "Бронза", "Сумма"];
let columnValues = ['number', 'season', 'year', 'country', 'gold', 'silver', 'bronze', 'sum'];

//заполнение первой строки таблице моим columnNames
d3.select("table")
    .select("thead")
    .append("tr")
    .selectAll("th")
    .data(columnNames)
    .enter()
    .append('th');

d3.select("table")
    .select("thead")
    .selectAll("th")
    .data(columnNames)
    .html((d) => `<th>${d}</th>`)
    .style("display", "");

d3.select("table")
    .select("tbody")
    .selectAll("tr")
    .data(fillTable)
    .enter()
    .append('tr');

d3.select("table")
    .select("tbody")
    .selectAll("tr")
    .data(fillTable)
    .html(d => `<td>${d.number}</td><td>${d.season}</td><td>${d.year}</td><td>${d.country}</td>
     <td>${d.gold}</td><td>${d.silver}</td><td>${d.bronze}</td><td>${d.sum}</td>`)
    .style("display", "");


let a = ["season", "country", "year"];

function filterTable() {
    let selectFilter = d3.select('#selectFilter').node().value; // выбранный столбец для фильтрации
    let filterText = d3.select('#filterText').node().value.toLowerCase(); // введенный текст для фильтрации

    // все строки делаем видимыми
    d3.select("table")
        .select("tbody")
        .selectAll("tr")
        .style("display", "");

    //делаем невидимыми все строки, кроме нужных
    if (filterText != '') {
        d3.select("table")
            .select("tbody")
            .selectAll("tr")
            .filter(function (d) {
                console.log(d)
                if (isNumberSort[selectFilter] == true) {
                    //console.log("Чекаюю");
                    return parseInt(d[selectFilter]) === parseInt(filterText) ? null : 'none';
                }
                else {
                    console.log(selectFilter);
                    return !(d[selectFilter].toLowerCase().startsWith(filterText.toLowerCase()))
                }
            })
            .style("display", "none");
    }
}

d3.select('input[name="filterText"]')
    .on('keyup', function () {
        filterTable();
    });

d3.select('select[id="toFilter"]')
    .on('change', function () {
        filterTable();
    });



let CompareData = function (a, b, sortByArr, ascOrDes) {
    console.log('sort ' + sortByArr);
    let sorted = 0;
    for (let i = 0; i < sortByArr.length; i++) {
        let sortBy = sortByArr[i];
        if (ascOrDes == 'descending') {
            let c = a;
            a = b;
            b = c;
        }

        if (!isNumberSort[sortBy]) {
            if (a[sortBy] < b[sortBy]) {
                sorted = -1;
                break;
            }
            if (a[sortBy] > b[sortBy]) {
                sorted = 1;
                break;
            }
        } else {
            if (Number(a[sortBy]) < Number(b[sortBy])) {
                sorted = -1;
                break;
            }
            if (Number(a[sortBy]) > Number(b[sortBy])) {
                sorted = 1;
                break;
            }
        }
    }
    return sorted;
};
/*if (a[sortBy] < b[sortBy]) return -1;
if (a[sortBy] > b[sortBy]) return 1;
} else {
if (Number(a[sortBy]) < Number(b[sortBy])) return -1;
if (Number(a[sortBy]) > Number(b[sortBy])) return 1;
}

if (!isNumberSort[sortBy2]) {
return (a[sortBy2] > b[sortBy2]) ? -1 : 1
} else {
return (Number(a[sortBy2]) > Number(b[sortBy2])) ? 1 : -1
}*/


let superSort = function () {
    name1 = d3.select('#selectFirst').node().value
    name2 = d3.select('#selectSecond').node().value
    name3 = d3.select('input[name="quest_1"]:checked').node().value

    let sortByArr = [name1, name2];
    //alert('sorting ' + name1 + ' ' + name2 + ' ' + name3);

    d3.select("table")
        .select("tbody")
        .selectAll("tr")
        .sort(function (a, b) { return CompareData(a, b, sortByArr, name3); })
    //.style('background-color', function(d, i) { return i%2==0 ? "#EEE" : "#FFF"; });
};

function resetTable() {
    let table = d3.select('table');
    let tbody = table.select('tbody');
    tbody.selectAll('tr').remove();
    d3.select("table")
        .select("tbody")
        .selectAll("tr")
        .data(fillTable)
        .enter()
        .append('tr');

    d3.select("table")
        .select("tbody")
        .selectAll("tr")
        .data(fillTable)
        .html(d => `<td>${d.number}</td><td>${d.season}</td><td>${d.year}</td><td>${d.country}</td>
     <td>${d.gold}</td><td>${d.silver}</td><td>${d.bronze}</td><td>${d.sum}</td>`)
        .style("display", "");
};
