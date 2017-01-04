/**
 * Created by Terry on 2017-01-03.
 */
var expect = require('expect');

var { generateMessage } = require('./message');

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