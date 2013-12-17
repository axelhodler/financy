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

Finance.prototype.buildUrl = function(encodedQuery) {
    return this.baseUri + encodedQuery + this.suffix;
};

Finance.prototype.getStockInfos = function(symbol) {
    fullUri = this.buildUrl(this.encodeQuery(this.buildStockQuery(symbol)));
    var responseText = this.requestInfos(fullUri);
    return this.getStockObject(responseText);
};

Finance.prototype.getQuoteObject = function(responseText) {
    var parsedQuote = JSON.parse(responseText);
    return parsedQuote.query.results.quote;
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

Finance.prototype.getQuoteInfos = function(symbol) {
    fullUri = this.buildUrl(this.encodeQuery(this.buildQuoteQuery(symbol)));
    var responseText = this.requestInfos(fullUri);
    return this.getQuoteObject(responseText);
};
