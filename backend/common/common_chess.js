console.log('_____________ chessJS _____________');
var white = 1;
var black = 0;
class chessPiece {
    constructor(obj, type, xPos, yPos, color){
        if (obj != null){
            obj && Object.assign(this, obj);
        } else {
            this.type = type;
            this.color = color;
            this.xPos = xPos;
            this.yPos = yPos;
        }
    };
    getType(){
        switch(this.type) {
            case "pawn":
                return new pawn(this);
            case "rook":
                return new rook(this);
            case "bishop":
                return new bishop(this);
            case "knight":
                return new knight(this);
            case "king":
                return new king(this);
            case "queen":
                return new queen(this);
            default:
                console.log("oopsie");
        }
    }
    boardBoundaries(moves){
        var valid = [];
        for(i=0;i<moves.length;i++) {
            if(moves[i].x >= 0 && moves[i].x <= 7 && moves[i].y >= 0 && moves[i].y <= 7){
                valid.push(moves[i]);
            } 
        }
        return valid;
    }
    pieceCollision(moves){
        var valid = [];
        for(i=0;i<moves.length;i++){
            console.log()
            if(!localGameState[moves[i].y+1][moves[i].x]) {
            valid.push(moves[i])
            }
        }
        return valid
    }
}
class pawn extends chessPiece {
    constructor(obj, type, xPos, yPos, color){
        super(obj, type, xPos, yPos, color)
        this.unicode = 0x2659;
    }
    move(){
        var moves = [];
        if(this.color) {
            moves.push({y:this.yPos - 1, x: this.xPos});
            if(this.yPos == 6) {
                moves.push({y:this.yPos - 2, x: this.xPos});
            }
        } else {
            moves.push({y:this.yPos + 1, x: this.xPos});
            if(this.yPos == 1) {
                moves.push({y:this.yPos + 2, x: this.xPos});
            }
        }
        moves = this.boardBoundaries(moves);
        moves = this.pieceCollision(moves);
        return moves;
    }
}
class rook extends chessPiece {
    constructor(obj, type, xPos, yPos, color){
        super(obj, type, xPos, yPos, color)
        this.unicode = 0x2656;
    }
    move(){
        var moves = [];
        for(i=this.xPos-7; i<=this.xPos+7;i++){
            if(i!=this.xPos){
                moves.push({y:this.yPos, x: i});
            }
        }
        for(i=this.yPos-7; i<=this.yPos+7;i++){
            if(i!=this.yPos){
                moves.push({y:i, x: this.xPos});
            }
        }
        moves = this.boardBoundaries(moves);
        return moves;
    }
}
class knight extends chessPiece {
    constructor(obj, type, xPos, yPos, color){
        super(obj, type, xPos, yPos, color)
        this.unicode = 0x2658;
    }
    move(){
        var moves = [];
        for(i=0;i<5;i++){
            for(j=0;j<5;j++){
                if((i+j)%2==1 && i!=2 && j!=2){
                    moves.push({y:this.yPos+(j-2), x: this.xPos+(i-2)});
                }
            } 
        }
        
        moves = this.boardBoundaries(moves);
        return moves;
    }
}
class bishop extends chessPiece {
    constructor(obj, type, xPos, yPos, color){
        super(obj, type, xPos, yPos, color)
        this.unicode = 0x2657;
    }
    move(){
        var moves = [];
        for(i=this.xPos-7, j=this.yPos-7; i<=this.xPos+7;i++, j++){
            if(i!=this.xPos){
                moves.push({y:j, x: i});
                moves.push({y:j, x: this.xPos+(this.xPos-i)});
            }
        }
        moves = this.boardBoundaries(moves);
        return moves;
    }
}
class king extends chessPiece {
    constructor(obj, type, xPos, yPos, color){
        super(obj, type, xPos, yPos, color)
        this.unicode = 0x2654;
    }
    move(){
        var moves = [];
        for(i=this.xPos-1;i<=this.xPos+1;i++) {
            for(j=this.yPos-1;j<=this.yPos+1;j++) {
                if(!(i==this.xPos && j==this.yPos)){
                    moves.push({y:j, x: i});
                }
            }
        }
        
        moves = this.boardBoundaries(moves);
        return moves;
    }
}
class queen extends chessPiece {
    constructor(obj, type, xPos, yPos, color){
        super(obj, type, xPos, yPos, color)
        this.unicode = 0x2655;
    }
    move(){
        var moves = [];
        for(i=this.xPos-7, j=this.yPos-7; i<=this.xPos+7;i++, j++){
            if(i!=this.xPos){
                moves.push({y:j, x: i});
                moves.push({y:j, x: this.xPos+(this.xPos-i)});
            }
        }
        for(i=this.xPos-7; i<=this.xPos+7;i++){
            if(i!=this.xPos){
                moves.push({y:this.yPos, x: i});
            }
        }
        for(i=this.yPos-7; i<=this.yPos+7;i++){
            if(i!=this.yPos){
                moves.push({y:i, x: this.xPos});
            }
        }
        moves = this.boardBoundaries(moves);
        for(i=0;i<moves.length;i++){
            console.log(moves[i])
            var b = moves[i].x - this.xPos;
            if (b>0) {
                b = Math.ceil(b/10);
            } else if (b<0){
                b = Math.floor(b/10);
            }

            console.log("x dif: " + b);
            var t = moves[i].y - this.yPos
            if (t>0) {
                t = Math.ceil(t/10);
            } else if (t<0){
                t = Math.floor(t/10);
            }
            console.log("y dif: " + t);
        }
        return moves;
    }
}
exports.sv_fillGameState = function(){
    return fillGameState();
}

function fillGameState() {
    var gs = [
        [{white: "player"}],
        [new rook(null, "rook", 0, 0, black), new knight(null, "knight", 1, 0, black), new bishop(null, "bishop", 2, 0, black), new queen(null, "queen", 3, 0, black), new king(null, "king", 4, 0, black), new bishop(null, "bishop", 5, 0, black), new knight(null, "knight", 6, 0, black), new rook(null, "rook", 7, 0, black)],
        [new pawn(null, "pawn", 0, 1, black), null, new pawn(null, "pawn", 2, 1, black), new pawn(null, "pawn", 3, 1, black), new pawn(null, "pawn", 4, 1, black), new pawn(null, "pawn", 5, 1, black), new pawn(null, "pawn", 6, 1, black), new pawn(null, "pawn", 7, 1, black)],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, new pawn(null, "pawn", 1, 6, black), null, null, null, null, null, null],
        [new pawn(null, "pawn", 0, 6, white), new pawn(null, "pawn", 1, 6, white), new pawn(null, "pawn", 2, 6, white), new pawn(null, "pawn", 3, 6, white), new pawn(null, "pawn", 4, 6, white), new pawn(null, "pawn", 5, 6, white), new pawn(null, "pawn", 6, 6, white), new pawn(null, "pawn", 7, 6, white)],
        [new rook(null, "rook", 0, 7, white), new knight(null, "knight", 1, 7, white), new bishop(null, "bishop", 2, 7, white), new queen(null, "queen", 3, 7, white), new king(null, "king", 4, 7, white), new bishop(null, "bishop", 5, 7, white), new knight(null, "knight", 6, 7, white), new rook(null, "rook", 7, 7, white)]
    ];
    return gs;
}