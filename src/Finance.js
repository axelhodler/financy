function Finance() {
    this.baseUri = "http://query.yahooapis.com/v1/public/yql?q=";
    this.suffix = "&format=json&env=store://datatables.org/alltableswithkeys";
}

Finance.prototype.encodeQuery = function(query) {
    return encodeURIComponent(query);
};

Finance.prototype.buildQuery = function(symbol) {
    return 'select * from yahoo.finance.stocks where symbol="'
        + symbol + '"';
};

Finance.prototype.getStockInfos = function(symbol) {
    fullUri = this.baseUri + this.encodeQuery(this.buildQuery(symbol)) +
        this.suffix;
    return this.requestInfos(fullUri);
};

Finance.prototype.requestInfos = function(uri) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", uri, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
};
