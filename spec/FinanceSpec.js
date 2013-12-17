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
});
