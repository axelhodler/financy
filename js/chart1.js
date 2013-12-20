function getFormValues() {
    symbol = document.getElementById('symbol').value;
    startDate = document.getElementById('startDate').value;
    endDate = document.getElementById('endDate').value;
}

function getDataAndDrawChart() {

    getFormValues();

    finance = new Finance();

    DatePrices = finance.getHistoricalInfos(symbol, startDate, endDate);

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

    // prevents the page from reloading after the submit
    return false;
};
