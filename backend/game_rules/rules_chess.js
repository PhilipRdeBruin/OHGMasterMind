//
// TEMPLATE RULESET
//
var chessJS = require('../common/common_chess.js');
//chessJS.functionName();
var gamestate;
exports.gameMove = function(globalGameState, room, move) {
    console.log(move);
    // GET current gamestate and active player
    gamestate = JSON.parse(globalGameState[room]["gamestate"]);
    if(gamestate == "init") {
        console.log("init")
        init();
        gamestate[0][0]["white"] = globalGameState[room]["users"][globalGameState[room]["active"]];
    } else {
        console.log("resuming")
    }
    console.log("gamestate: ");
    console.log(gamestate);
    var currentPLayer = globalGameState[room]["active"]; 
    

    //  CHECK win condition (Fills globalGameState[room]["result"] with an ARRAY, 
    //  first value of array after game end HAS to be "gameEnd", leave empty for no game end)
    // globalGameState[room]["result"] = winCon(gamestate, currentPLayer);

    // SUBMIT new gamestate
    gamestate = JSON.stringify(gamestate);
    globalGameState[room]["gamestate"] = gamestate;
    globalGameState[room]["count"]--;
    console.log(globalGameState[room]["gamestate"])
}

exports.gameInit = function(globalGameState, room) {
    var init = "";
    return init;
}

exports.gameEnd = function(socket, room, globalGameState, server) {
    globalGameState[room]["winner"] = "" // SET WINNER NAME HERE FOR DATABASE BACKUP
    // This gets executed when globalGameState[room]["result"][0] === "gameEnd", use this to send data to user, eg: winner, etc
}

function init() {
    gamestate = chessJS.sv_fillGameState();
}

function ruleSet(move, gamestate) {
    // You can use a function like this to check the game input against game rules, for exmaple
    // return 1 for valid input and 0 for invalid, and use this as an if(ruleSet){} around your game logic.
    // This can be used in any way though. 
}

function winCon(gamestate, user) {
    // Function should handle all game ending events, wins or stalemates. Return array with first value being "gameEnd"
}

delete require.cache[require.resolve('../common/common_chess.js')];