/**
 * Created by Terry on 2017-01-04.
 */
var isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
}

module.exports = { isRealString };