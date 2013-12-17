function Finance() {
    this.baseUri = "http://query.yahooapis.com/v1/public/yql?q=";
    this.suffix = "&format=json&env=store://datatables.org/alltableswithkeys";
}

Finance.prototype.encodeQuery = function(query) {
    return encodeURIComponent(query);
};

Finance.prototype.buildStockQuery = function(symbol) {
    return 'select * from yahoo.finance.stocks where symbol="'
        + symbol + '"';
};

Finance.prototype.buildQuoteQuery = function(symbol) {
    return 'select * from yahoo.finance.quote where symbol="'
        + symbol + '"';
};

Finance.prototype.buildHistoricalQuery = function(symbol, startDate, endDate) {
    return 'select * from yahoo.finance.historicaldata where symbol = "'
        + symbol + '" and startDate = "' + startDate + '" and endDate = "'
        + endDate + '"';
};

Finance.prototype.buildUrl = function(encodedQuery) {
    return this.baseUri + encodedQuery + this.suffix;
};

Finance.prototype.requestInfos = function(uri) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", uri, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
};

Finance.prototype.getStockObject = function(responseText) {
    var parsedStock = JSON.parse(responseText);
    return parsedStock.query.results.stock;
};

Finance.prototype.getQuoteObject = function(responseText) {
    var parsedQuote = JSON.parse(responseText);
    return parsedQuote.query.results.quote;
};

Finance.prototype.getStockInfos = function(symbol) {
    fullUri = this.buildUrl(this.encodeQuery(this.buildStockQuery(symbol)));
    var responseText = this.requestInfos(fullUri);
    return this.getStockObject(responseText);
};

Finance.prototype.getQuoteInfos = function(symbol) {
    fullUri = this.buildUrl(this.encodeQuery(this.buildQuoteQuery(symbol)));
    var responseText = this.requestInfos(fullUri);
    return this.getQuoteObject(responseText);
};

Finance.prototype.getHistorical = function(symbol, startDate, endDate) {
    fullUri = this.buildUrl(this.encodeQuery(this.buildHistoricalQuery(symbol,
                                                                       startDate
                                                                       , endDate
                                                                      )));
    var responseText = this.requestInfos(fullUri);
    return this.getHistoricalPrices(responseText);
};

Finance.prototype.getHistoricalQuoteArray = function(responseText) {
    var parsedResponse = JSON.parse(responseText);
    return parsedResponse.query.results.quote;
};

Finance.prototype.getHistoricalPrices = function(responseText) {
    ClosingPrices = new Array();
    console.log("bla");
    var parsedHistoricalQuoteArray = this.getHistoricalQuoteArray(responseText);
    console.log(parsedHistoricalQuoteArray.length);

    for (var i=parsedHistoricalQuoteArray.length; i>0;i--) {
        var obj = parsedHistoricalQuoteArray[i-1];
        for (var key in obj) {
            console.log(key);
            if (key === "Close") {
                console.log(obj[key]);
                ClosingPrices.push(parseFloat(obj[key]));
            }
        }
    }
    return ClosingPrices;
};
