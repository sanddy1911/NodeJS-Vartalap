const moment = require('moment');

var genrateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};

var genrateLocationMessage = (from, lat, lon) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${lon}`,
        createdAt: moment().valueOf()
    };
};

module.exports = {genrateMessage, genrateLocationMessage};