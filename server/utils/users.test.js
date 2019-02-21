const expect = require('expect');

const {Users} = require('./users');

describe("Users", () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: "Sundeep",
            room: "NODER"
        },{
            id: 2,
            name: "Muskan",
            room: "NODER"
        },{
            id: 3,
            name: "Rahul",
            room: "NODER"
        },{
            id: 3,
            name: "Hero",
            room: "CODER"
        }];
    });

    it("Should add new user", () => {
        var users = new Users();
        var user = {
            id: 123,
            name: "Sundeep",
            room: "Room"
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);

    });

    it("Should remove a user", () => {
        var userId = 3;
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it("Should not remove a user", () => {
        var userId = 7;
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(4);
    });

    it("Should find a user", () => {
        var userId = 2;
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it("Should not find a user", () => {
        var userId = 8;
        var user = users.getUser(userId);

        expect(user).toNotExist();
    });

    it("Should return names for NODER Room", () => {
        var userList = users.getUserList('NODER');

        expect(userList).toEqual(['Sundeep', 'Muskan', 'Rahul']);
    });

    it("Should return names for CODER Room", () => {
        var userList = users.getUserList('CODER');

        expect(userList).toEqual(['Hero']);
    });
});