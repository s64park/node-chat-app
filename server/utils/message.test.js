/**
 * Created by Terry on 2017-01-03.
 */
var expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Danny';
        var text = 'some text';
        var msg = generateMessage(from, text);
        expect(msg).toInclude({
            from, text
        });
        expect(msg.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Danny';
        var lat = 1;
        var lng = 1;
        var url = 'https://www.google.com/maps?q=1,1'
        var locationMsg = generateLocationMessage(from, lat, lng)
        expect(locationMsg).toInclude({
            from, url
        });
    });
});