function Finance() {
    this.baseUri = "http://query.yahooapis.com/v1/public/yql?q=";
    this.suffix = "&format=json&env=store://datatables.org/alltableswithkeys";
}

Finance.prototype.encodeQuery = function(query) {
    return encodeURIComponent(query);
};

function buildStockQuery(symbol) {
    return 'select * from yahoo.finance.stocks where symbol="'
        + symbol + '"';
};

function buildQuoteQuery(symbol) {
    return 'select * from yahoo.finance.quote where symbol="'
        + symbol + '"';
};

function buildHistoricalQuery(symbol, startDate, endDate) {
    return 'select * from yahoo.finance.historicaldata where symbol = "'
        + symbol + '" and startDate = "' + startDate + '" and endDate = "'
        + endDate + '"';
};

Finance.prototype.buildUrl = function(encodedQuery) {
    return this.baseUri + encodedQuery + this.suffix;
};

function requestInfos(uri) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", uri, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
};

function getStockObject(responseText) {
    var parsedStock = JSON.parse(responseText);
    return parsedStock.query.results.stock;
};

function getQuoteObject(responseText) {
    var parsedQuote = JSON.parse(responseText);
    return parsedQuote.query.results.quote;
};

Finance.prototype.getStockInfos = function(symbol) {
    fullUri = this.buildUrl(this.encodeQuery(buildStockQuery(symbol)));
    var responseText = requestInfos(fullUri);
    return getStockObject(responseText);
};

Finance.prototype.getQuoteInfos = function(symbol) {
    fullUri = this.buildUrl(this.encodeQuery(buildQuoteQuery(symbol)));
    var responseText = requestInfos(fullUri);
    return getQuoteObject(responseText);
};

Finance.prototype.getHistorical = function(symbol, startDate, endDate) {
    fullUri = this.buildUrl(this.encodeQuery(buildHistoricalQuery(symbol,
                                                                       startDate
                                                                       , endDate
                                                                      )));
    var responseText = requestInfos(fullUri);
    return getHistoricalPrices(responseText);
};

function getHistoricalQuoteArray(responseText) {
    var parsedResponse = JSON.parse(responseText);
    return parsedResponse.query.results.quote;
};

function addClosingPriceToArray(obj, key) {
    if (key === "Close") {
        ClosingPrices.push(parseFloat(obj[key]));
    }
}

function iterateTheKeysInQuote(obj) {
    for (var key in obj) {
        addClosingPriceToArray(obj, key);
    }
}

function iterateTheQuoteArray(parsedHistoricalQuoteArray) {
    for (var i=parsedHistoricalQuoteArray.length; i>0;i--) {
        var obj = parsedHistoricalQuoteArray[i-1];
        iterateTheKeysInQuote(obj);
    }
}

function getHistoricalPrices(responseText) {
    ClosingPrices = new Array();
    var parsedHistoricalQuoteArray = getHistoricalQuoteArray(responseText);

    iterateTheQuoteArray(parsedHistoricalQuoteArray);
    return ClosingPrices;
};
