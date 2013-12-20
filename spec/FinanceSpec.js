describe("Finance", function() {
    var finance;

    beforeEach(function() {
        finance = new Finance();
    });

    describe("when looking for the Sector of the Yahoo stock", function() {
        it("should be 'Technology'", function() {
            stockObj = finance.getStockInfos("YHOO");
            expect(stockObj.Sector).toEqual("Technology");
        });
    });

    describe("when looking for the trade price of the Yahoo stock", function() {
        it("should contain the name of the company", function() {
            quoteObj = finance.getQuoteInfos("YHOO");
            expect(quoteObj.Name).toEqual("Yahoo Inc.");
        });
    });

    describe("when looking for the trade price of the Yahoo" +
             " stock in a timeframe", function() {
        it("should contain the Date and ClosingPrices of these days",
           function() {
            DatePrices = finance.getHistoricalInfos("YHOO", "2012-01-03",
                                                    "2012-01-07");

            Price = DatePrices[1];

            expect(Price[0]).toEqual(16.29);
            expect(Price[1]).toEqual(15.78);
            expect(Price[2]).toEqual(15.64);
            expect(Price[3]).toEqual(15.52);

            Dates = DatePrices[0];

            expect(Dates[0]).toEqual("2012-01-03");
            expect(Dates[1]).toEqual("2012-01-04");
            expect(Dates[2]).toEqual("2012-01-05");
            expect(Dates[3]).toEqual("2012-01-06");
        });
    });
});
