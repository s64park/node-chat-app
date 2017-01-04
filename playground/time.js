/**
 * Created by Terry on 2017-01-03.
 */
var moment = require('moment');
// Jan 1st 1970 00:00:00 am

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));