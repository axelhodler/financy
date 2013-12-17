function Finance() {
    this.baseUri = "http://query.yahooapis.com/v1/public/yql?q=";
    this.suffix = "&format=json&env=store://datatables.org/alltableswithkeys";
}

Finance.prototype.encodeQuery = function(query) {
    return encodeURIComponent(query);
};

Finance.prototype.buildQuery = function(stockCode) {
    return 'select * from yahoo.finance.stocks where symbol="'
        + stockCode + '"';
};

Finance.prototype.getStockInfos = function(stockCode) {
    fullUri = this.baseUri + this.encodeQuery(this.buildQuery(stockCode)) +
        this.suffix;
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", fullUri, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
};
