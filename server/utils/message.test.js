const expect = require('expect');

var {genrateMessage} = require('./message');

describe("Genrate message", () => {
    it("Should genrate the correct message object", () => {
        var msg = genrateMessage ("Sundeep", "Testing");
        expect(msg.from).toBe("Sundeep");
        expect(msg.text).toBe("Testing");
        expect(msg.createdAt).toBe(new Date().getTime());
    });
});