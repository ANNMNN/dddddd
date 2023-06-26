/*
// Получаем элементы DOM
const seasonRadio = d3.select("input[value='season']");
const yearRadio = d3.select("input[value='year']");
const countryRadio = d3.select("input[value='country']");
const maxGoldRadio = d3.select("input[value='maxgold']");
const maxSilverRadio = d3.select("input[value='maxsilver']");
const maxBronzeRadio = d3.select("input[value='maxbronze']");
const minSumRadio = d3.select("input[value='minsum']");
const createButton = d3.select("button");

// Функция для получения данных для графика
function getData() {
    const tableRows = d3.select("table")
        .select("tbody")
        .selectAll("tr");
    const data = [];
    const headers = ["№", "Сезон", "Год", "Страна", "Золото", "Серебро", "Бронза", "Сумма"];
    tableRows.each(function () {
        const cells = d3.select(this).selectAll("td");
        const rowData = {};
        cells.each(function (d, i) {
            rowData[headers[i]] = d3.select(this).text();
        });
        data.push(rowData);
    });
    return data;
}

// Функция для создания графика на SVG
function createPlot(data) {
    // Создаем svg элемент
    const svg = d3.select(".graph")
        .append("svg")
        .attr("width", 500)
        .attr("height", 500);

    // Определяем радиус окружности диаграммы
    const radius = 100;

    // Создаем объект анализа данных
    const pie = d3.pie()
        .value(d => +d.Золото + +d.Серебро + +d.Бронза)
        .sort(null);

    // Создаем объект генератора пути для диаграммы
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Создаем объект для группирования элементов
    const g = svg.append("g")
        .attr("transform", `translate(${250}, ${150})`);

    // Создаем элементы на основе данных и применяем к ним стили
    g.selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => d3.schemeCategory10[i]);
}


// Обработчик события клика на кнопку
createButton.on("click", function () {
    d3.select("svg").remove();
    const data = getData();
    createPlot(data);
});
function functionGraph() {
    // Исходные данные
    const data = [
        { x: 1, y: 3 },
        { x: 2, y: 5 },
        { x: 3, y: 4 },
        { x: 4, y: 2 },
        { x: 5, y: 6 }
    ];

    // Создаем SVG-элемент
    const svg = d3.select(".graph")
        .append("svg")
        .attr("width", 500)
        .attr("height", 300);

    // Определяем отступы и размеры осей
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Создаем объекты для масштабирования данных по оси x и y
    const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.x))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.y))
        .range([height, 0]);

    // Создаем объекты для создания осей на графике
    const xAxis = d3.scale(x)
        .ticks(5)
        .tickSizeInner(-height);
    const yAxis = d3.axisLeft()
        .scale(y)
        .ticks(5)
        .tickSizeInner(-width);

    // Настройка осей и их отображение
    svg.append("g")
        .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
        .call(xAxis);
    svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(yAxis);

    // Создаем функцию для линейной интерполяции
    const line = d3.line()
        .x(d => x(d.x) + margin.left)
        .y(d => y(d.y) + margin.top);

    // Отрисовываем линию на графике
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);
}

let width = 500;
let height = 500;
let marginX = 50;
let marginY = 50;

let svg = d3.select("div.graph")
 .append("svg")
 .attr("height", height)
 .attr("width", width)
 .style("border", "solid thin grey");

function functionGraph() {
   d3.selectAll("svg > *").remove();


let counterOp = 0;
let counterHOp = 0;
let counterCl = 0;
let arrGraphFull = [];

const openness = ['Зимняя', 'Летняя'];

   for (let i = 0; i < fillTable.length; i++) {
      if (fillTable[i].openness == 'Зимняя') {
         counterOp++;
      } else if (fillTable[i].openness == 'Полуоткрытый') {
         counterHOp++;
      } else {
         counterCl++;
      }
   }

arrGraphFull.push({'x': openness[0], 'f':counterOp});
arrGraphFull.push({'x': openness[1], 'f':counterHOp});
arrGraphFull.push({'x': openness[2], 'f':counterCl});

let minMaxFFull = d3.extent(arrGraphFull.map(d => d.f));
let min = 0;//minMaxFFull[0];
let max = minMaxFFull[1];
console.log(min);
console.log(max);


let xAxisLen = width - 2 * marginX;
let yAxisLen = height - 2 * marginY;

    // определяем шкалы для осей
    let scaleX = d3.scaleBand()
    .domain(arrGraphFull.map(function(d) {
        return d.x;
    })
    )
    .range([0, xAxisLen],1);

    let scaleY = d3.scaleLinear()
    .domain([min, max])
    .range([yAxisLen, 0]);
    console.log(scaleX);
    console.log(scaleY);
    // создаем оси
    let axisX = d3.axisBottom(scaleX); // горизонтальная

    let axisY = d3.axisLeft(scaleY);// вертикальная
    console.log(axisX);
    console.log(axisY);

    // отображаем ось OX, устанавливаем подписи оси ОX и угол их наклона
    svg.append("g")
    .attr("transform", `translate(${marginX}, ${height - marginY})`)
    .call(axisX)
    .attr("class", "x-axis")
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", function (d) {
    return "rotate(-45)";
    });

    // отображаем ось OY
    svg.append("g")
    .attr("transform", `translate(${marginX}, ${marginY})`)
    .attr("class", "y-axis")
    .call(axisY);


    // создаем набор вертикальных линий для сетки
    d3.selectAll("g.x-axis g.tick")
    .append("line") // добавляем линию
    .classed("grid-line", true) // добавляем класс
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", - (yAxisLen))

    // создаем горизонтальные линии сетки
    d3.selectAll("g.y-axis g.tick")
    .append("line")
    .classed("grid-line", true)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", xAxisLen)
    .attr("y2", 0);



let color = d3.scaleOrdinal(d3.schemeCategory10);
    //создание и отрисовка столбиков гистограммы
g =svg.append("g")
 .attr("transform", `translate(${ marginX}, ${ marginY})`)
 .selectAll(".rect")
 .data(arrGraphFull)
 .enter().append("rect")
 .attr("x", function(d) { return scaleX(d.x) ; })
 .attr("width", scaleX.bandwidth())
 .attr("y", function(d) { return scaleY(d.f); })
 .attr("height", function(d) { return yAxisLen - scaleY(d.f); })
 .attr("fill", function(d) { return color(d.x); });
} */



function getArrGraph(arrObject, fieldX, fieldY) {
    let arr = getBarChartData();
    console.log(arr);

    for (let i = 0; i <= arr.length; i++) {
        let labelX = [];
        let labelY = [];
        //console.log(arr[i]["labelX"]);
        labelX.push(arr[i][labelX]);
        labelY.push(arr[i][labelX]);
        console.log(labelX[i], labelY[i]);
    }
    console.log(getBarChartData());


}

function drawGraph(data) {
    // формируем массив для построения диаграммы

    //let arrGraph = getArrGraph(fillTable, country, gold)

    let arr = getBarChartData();
    //console.log(arr);
    let labelX = [];
    let labelY = [];
    for (let i = 0; i < arr.length; i++) {
        //console.log(arr[i]["labelX"]);
        labelX.push(arr[i]["labelX"]);
        labelY.push(arr[i]["MaxGold"]);
        console.log(labelX[i], labelY[i]);
    }
    //console.log(getBarChartData());

    let arrGraph = [];
    arrGraph.push(labelX);
    arrGraph.push(labelY);
    let arrGraph2 = [];
    for (let i = 0; i < arrGraph[0].length; i++) {
        let toAdd = {};
        toAdd.lableX = arrGraph[0][i];
        toAdd.lableY = arrGraph[1][i];
        arrGraph2.push(toAdd);
    }
    console.log(arrGraph2);


    let marginX = 50;
    let marginY = 50;
    let height = 600;
    let width = 800;

    let svg = d3.select("svg")
        .attr("height", height)
        .attr("width", width);

    // очищаем svg перед построением
    svg.selectAll("*").remove();

    // определяем минимальное и максимальное значение по оси OY
    let min = d3.min(arrGraph2.map(d => d.lableY)) * 0.95;
    let max = d3.max(arrGraph2.map(d => d.lableY)) * 1.05;
    let xAxisLen = width - 2 * marginX;
    let yAxisLen = height - 2 * marginY;


    console.log(min, max);
    // определяем шкалы для осей
    let scaleX = d3.scaleBand()
        .domain(arrGraph2.map(function (d) {
            console.log(d);
            return d.lableX;
        })
        )
        .range([0, xAxisLen], 1);

    let scaleY = d3.scaleLinear()
        .domain([min, max])
        .range([yAxisLen, 0]);


    // создаем оси
    let axisX = d3.axisBottom(scaleX); // горизонтальная

    let axisY = d3.axisLeft(scaleY);// вертикальная

    // отображаем ось OX, устанавливаем подписи оси ОX и угол их наклона
    svg.append("g")
        .attr("transform", `translate(${marginX}, ${height - marginY})`)
        .call(axisX)
        .attr("class", "x-axis")
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function (d) {
            return "rotate(-45)";
        });

    // отображаем ось OY
    svg.append("g")
        .attr("transform", `translate(${marginX}, ${marginY})`)
        .attr("class", "y-axis")
        .call(axisY);

    // создаем набор вертикальных линий для сетки
    d3.selectAll("g.x-axis g.tick")
        .append("line") // добавляем линию
        .classed("grid-line", true) // добавляем класс
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", - (yAxisLen));

    // создаем горизонтальные линии сетки
    d3.selectAll("g.y-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", xAxisLen)
        .attr("y2", 0);



    if (Histogram.checked) {
        // отображаем данные в виде гистограммы
        //создание и отрисовка столбиков гистограммы
        svg.selectAll("rect")
            .attr("transform", `translate(${marginX}, ${marginY})`)
            .data(arrGraph2)
            .enter()
            .append("rect")
            .attr("x", function (d) { return scaleX(d.lableX); })
            .attr("y", function (d) { return scaleY(d.lableY); })
            .attr("transform", `translate(50,50)`)
            .attr("width", "10")
            .attr("height", function (d) { return yAxisLen - scaleY(d.lableY); })
            .attr("fill", "blue");
    }
    else if (Tochka.checked) {
        // отображаем данные в виде точечной диаграммы
        svg.selectAll(".dot")
            .data(arrGraph2)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("cx", function (d) { return scaleX(d.lableX); })
            .attr("cy", function (d) { return scaleY(d.lableY); })
            .attr("transform", `translate(${marginX + scaleX.bandwidth() / 2}, ${marginY})`)
            .style("fill", "blue");
    }


}
