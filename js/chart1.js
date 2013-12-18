finance = new Finance();

DatePrices = finance.getHistoricalInfos("YHOO", "2012-01-03","2012-01-07");

Dates = DatePrices[0];
Prices = DatePrices[1];

var stockData = {
    labels : Dates,
    datasets : [
        {
            fillColor : "rgba(255,0,0,0.5)",
            strokeColor : "#00ff00",
            pointColor : "#fff",
            pointStrokeColor : "#0000ff",
            data : Prices
        }
    ]
};

var stock1 = document.getElementById('stock1').getContext('2d');

new Chart(stock1).Line(stockData);
