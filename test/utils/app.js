var app = require('../../src/utils/app.js');
var assert = require('assert');

describe('app', function() {

    describe('#view engine', function () {
        
        it('should return html', function () {
            assert.equal('html', app.get('view engine'));
        });
    });

    describe('#layout', function () {
        
        it('should return layout', function () {
            assert.equal('layout', app.get('layout'));
        });
    });

    describe('#views', function () {
        
        it('should end in src/views', function () {
            var views = app.get('views');
            var viewPath = 'src/views';
            assert.equal(viewPath, views.substr(views.length - viewPath.length));
        });
    });
});