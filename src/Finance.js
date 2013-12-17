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
    return this.requestInfos(fullUri);
};

Finance.prototype.requestInfos = function(uri) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", uri, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
};

Finance.prototype.getQuoteInfos = function(symbol) {
    fullUri = this.buildUrl(this.encodeQuery(this.buildQuoteQuery(symbol)));
    return this.requestInfos(fullUri);
};
