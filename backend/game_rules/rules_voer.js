//
// BOTER, KAAS EN EIEREN RULESET
//

exports.gameMove = function(globalGameState, room, move) {
    console.log(move);
    var player;
    var gamestate = JSON.parse(globalGameState[room]["gamestate"]);
    if (globalGameState[room]["active"] == 0) {
        player = "yellow"
    } else {
        player = "red"
    }
    if (ruleSet(move, gamestate)) {
        gamestate[move].push(player);

    } else {
        globalGameState[room]["count"]--
    }
    globalGameState[room]["result"] = winCon(gamestate, player, move);
    gamestate = JSON.stringify(gamestate);
    globalGameState[room]["gamestate"] = gamestate;
}

exports.gameInit = function(globalGameState, room) {
    var init = "";
    return init;
}

exports.gameEnd = function(socket, room, globalGameState, server) {
    globalGameState[room]["winner"] = socket.username;
    if(globalGameState[room]["active"] === -1) {
        server.in(room).emit('game result', globalGameState[room]["result"]);

        
    } else {
        socket.to(room).emit('game loss', globalGameState[room]["result"]);


        socket.emit('game win', globalGameState[room]["result"]);
    }
}

function ruleSet(move, gamestate) {
    if(gamestate[move].length<6) {
        return true;
    } else {
        return false
    }
}

function winCon(gamestate, user, x) {
    var breaches = [];
    // Win condition

    var row = gamestate[x].length-1;
    var count = 0;
    var col = x;
    while(gamestate[col] && gamestate[col][row] == user){
        count++;
        col++;
    }
    col = x-1;
    while(gamestate[col] && gamestate[col][row] == user){
        count++;
        col--;
    }
    if(count>=4){
        breaches.unshift("gameEnd");
        return breaches
    }

    // Y
    count = 0;
    col = x;
    row = gamestate[x].length-1;
    while(gamestate[col][row] && gamestate[col][row] == user){
        count++;
        row--;
    }
    if(count>=4){
        breaches.unshift("gameEnd");
        return breaches
    }

    // DIAG LR
    row = gamestate[x].length-1;
    count = 0;
    col = x;
    while(gamestate[col] && gamestate[col][row] && gamestate[col][row] == user){
        count++;
        col++;
        row++;
    }
    col = x-1;
    row = gamestate[x].length-2;
    while(gamestate[col] && gamestate[col][row] && gamestate[col][row] == user){
        count++;
        col--;
        row--;
    }
    if(count>=4){
        breaches.unshift("gameEnd");
        return breaches
    }

    // DIAG RL
    row = gamestate[x].length-1;
    count = 0;
    col = x;
    while(gamestate[col] && gamestate[col][row] && gamestate[col][row] == user){
        count++;
        col++;
        row--;
    }
    col = x-1;
    row = gamestate[x].length;
    while(gamestate[col] && gamestate[col][row] && gamestate[col][row] == user){
        count++;
        col--;
        row++;
    }
    if(count>=4){
        breaches.unshift("gameEnd");
        return breaches
    }
    return breaches;
}