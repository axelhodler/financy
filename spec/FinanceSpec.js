describe("Finance", function() {
    var finance;

    beforeEach(function() {
        finance = new Finance();
    });

    describe("when accessing the Yahoo Finance API", function() {
        it("should use an url encoded query", function() {
            var query = 'select * from yahoo.finance.stocks ' +
                    'where symbol="yhoo"';
            var encodedQuery = 'select%20*%20from%20yahoo.finance.stocks' +
                    '%20where%20symbol%3D%22yhoo%22';
            expect(finance.encodeQuery(query)).toEqual(encodedQuery);
        });
    });

    describe("when looking for the Sector of the Yahoo stock", function() {
        it("should be 'Technology'", function() {
            stockAsJson = finance.getStockInfos("YHOO");
            var parsedStock = JSON.parse(stockAsJson);
            expect(parsedStock.query.results.stock.Sector)
                .toEqual("Technology");
        });
    });

    describe("when looking for the trade price of the Yahoo stock", function() {
        it("should contain the name of the company", function() {
            quoteAsJson = finance.getQuoteInfos("YHOO");
            var parsedQuote = JSON.parse(quoteAsJson);
            expect(parsedQuote.query.results.quote.Name).toEqual("Yahoo Inc.");
        });
    });
});
