casper.test.begin('Stockform can be submitted', 1, function(test) {

    casper.start('file:///home/xorrr/devel/financy/index.html', function() {
        this.fill('form#addstock', {'symbol':'yhoo', 'startDate':'2012-01-03',
                               'endDate':'2012-01-07'}, true);
    });

    casper.then(function() {
        canvas = this.evaluate(function() {
            return __utils__.findOne('#stock1');
        });
        test.assertEquals(canvas.className, 'drawn', "stockchart was drawn");
    });

    casper.run(function() {
        test.done();
    });
});
