//
// BOTER, KAAS EN EIEREN RULESET
//

exports.gameMove = function(globalGameState, room, move) {
    var player = globalGameState[room]["init"][globalGameState[room]["users"][globalGameState[room]["active"]]];
    var gamestate = JSON.parse(globalGameState[room]["gamestate"]);
    if (ruleSet(move, gamestate)) {
        gamestate[move[0]][move[1]] = player;

    } else {
        globalGameState[room]["count"]--
    }
    globalGameState[room]["result"] = winCon(gamestate, globalGameState[room]["active"]);
    gamestate = JSON.stringify(gamestate);
    globalGameState[room]["gamestate"] = gamestate;
}

exports.gameInit = function(globalGameState, room) {
    var users = {}
    var user0 = globalGameState[room]["users"][0];
    var user1 = globalGameState[room]["users"][1];
    userC = user0.split("%");
    if(userC[1] == "codecracker") {
        users[user0] = "X"
        users[user1] = "O"
        globalGameState[room]["active"] = 0;
    } else {
        users[user0] = "O"
        users[user1] = "X"
        globalGameState[room]["active"] = 1;
    }
    return users;
}

exports.gameEnd = function(socket, room, globalGameState, server) {
    globalGameState[room]["winner"] = socket.username;
    if(globalGameState[room]["active"] === -1) {
        server.in(room).emit('game result', globalGameState[room]["result"][2]);
        server.in(room).emit('game result', globalGameState[room]["result"][3]);
        server.in(room).emit('game result', globalGameState[room]["result"][4]);
        
    } else {
        socket.to(room).emit('game loss', globalGameState[room]["result"][2]);
        socket.to(room).emit('game loss', globalGameState[room]["result"][3]);
        socket.to(room).emit('game loss', globalGameState[room]["result"][4]);

        socket.emit('game win', globalGameState[room]["result"][2]);
        socket.emit('game win', globalGameState[room]["result"][3]);
        socket.emit('game win', globalGameState[room]["result"][4]);
    }
}

function ruleSet(move, gamestate) {
    // RULE: Can't overwrite used space
    if (gamestate[move[0]][move[1]] === 0) {
        return 1
    } else {
        return 0
    }
}

function winCon(gamestate, user) {
    var breaches = [];
    // Win condition
    if (gamestate[0][0] == gamestate[0][1] && gamestate[0][1] == gamestate[0][2] && gamestate[0][0] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("00")
        breaches.push("01")
        breaches.push("02")
    } else if (gamestate[1][0] == gamestate[1][1] && gamestate[1][1] == gamestate[1][2] && gamestate[1][0] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("10")
        breaches.push("11")
        breaches.push("12")
    } else if (gamestate[2][0] == gamestate[2][1] && gamestate[2][1] == gamestate[2][2] && gamestate[2][0] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("20")
        breaches.push("21")
        breaches.push("22")
    } else if (gamestate[0][0] == gamestate[1][0] && gamestate[1][0] == gamestate[2][0] && gamestate[2][0] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("00")
        breaches.push("10")
        breaches.push("20")
    } else if (gamestate[0][1] == gamestate[1][1] && gamestate[1][1] == gamestate[2][1] && gamestate[0][1] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("01")
        breaches.push("11")
        breaches.push("21")
    } else if (gamestate[0][2] == gamestate[1][2] && gamestate[1][2] == gamestate[2][2] && gamestate[2][2] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("02")
        breaches.push("12")
        breaches.push("22")
    } else if (gamestate[0][0] == gamestate[1][1] && gamestate[1][1] == gamestate[2][2] && gamestate[0][0] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("00")
        breaches.push("11")
        breaches.push("22")
    } else if (gamestate[0][2] == gamestate[1][1] && gamestate[1][1] == gamestate[2][0] && gamestate[2][0] != 0) {
        breaches.push("gameEnd");
        breaches.push("winner = " + user)
        breaches.push("02")
        breaches.push("11")
        breaches.push("20")
    }
    // Game full: End condition
    if (gamestate[0].indexOf(0) >= 0 || gamestate[1].indexOf(0) >= 0 || gamestate[2].indexOf(0) >= 0) {

    } else {
        breaches.push("gameFull");
    }
    return breaches;
}