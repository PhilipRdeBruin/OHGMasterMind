
<!doctype html>
<html>

    <?php
        session_start();

        // $server = "localhost";
        // $server = "192.168.2.6";  // De Knolle -- PC
        $server = "192.168.2.9";  // De Knolle -- laptop
        // $server = "192.168.2.12"; // De Ljurk  -- laptop
        // $server = "192.168.2.84";    // EmmaState -- laptop
        $pad = "MasterMind";
        $database = "OudHollandsGamen";
    ?>
    
    <head>
        <meta charset=utf-8>
        <title>MasterMind_OHG</title>
        <script src="https://code.jquery.com/jquery-3.1.1.js"></script>
        
        <?php
            echo '<script src="' . $pad . '/JS-MM_142.js"></script>';
            echo '<script src="' . $pad . '/JS-MMfuncties_042.js"></script>';
            echo '<script src="' . $pad . '/JQuery-MM_042.js"></script>';
            echo '<link rel="stylesheet" href="' . $pad . '/CSS-MM_042.css">';
            require_once "MasterMind/php-MMfuncties.php";
            require_once "MensErgerJeNiet/includes/mejn_php-functies.php";
        ?>
    </head>

    <body>
        <h1 id="turns">Wacht s.v.p. op uw beurt...</h1>
        <?php echo '<script src="http://' . $server . ':3000/socket.io/socket.io.js"></script>' ?>
        <!-- <script src="http://localhost:3000/socket.io/socket.io.js"></script> -->
        <!-- <button onclick="makeMove('testing moves')">Send test move</button> -->

<!-- *********************************************************************************************************** -->


        <?php
            if (isset($_POST["start_spel"])) {
                $gebr = detSpelerNaam($database, $_POST["speler"]);
                sessie_init($gebr);

                $actspelid = $_POST["act_spel"];
                $spelerid = $_POST["speler"];
                $rol = $_POST["rol"];
                // phpAlert("rol = $rol");

                $spelnaam = fetch_spel_alias($database, $actspelid);
                $spelerids = fetch_speler_ids($database, $actspelid);

                $nsplr = 2;
                for ($i = 1; $i <= $nsplr; $i++ ) {
                    $spelerx[$i] = detSpelerNaam($database, $spelerids[$i]);
                }
            }
        ?>

        <div id="server" style="display:none"><?php echo $server ?></div>
        <div id="kamer" style="display:none"><?php echo $actspelid ?></div>
        <div id="spelnaam" style="display:none"><?php echo $spelnaam ?></div>
        <div id="spelerid" style="display:none"><?php echo $spelerid ?></div>
        <div id="gebrvoornaam" style="display:none"><?php echo $gebr['voornaam'] ?></div>
        <div id="gebrnaam" style="display:none"><?php echo $gebr['naam'] ?></div>
        <div id="rol" style="display:none"><?php echo $rol ?></div>

        <?php
            for ($i = 1; $i<=$nsplr; $i++) {
                $idx = $spelerx[$i]['id'];
                $vnx = $spelerx[$i]['voornaam'];
                echo '<div id="spelerid' . $i . '" style="display:none">' . $idx . '</div>';
                echo '<div id="spelervn' . $i . '" style="display:none">' . $vnx . '</div>';
            }
        ?>

        <div id="spelbord">
            <div id="gaatjes1"><script>drawrondjes();</script></div>
            <div id="gaatjes2"><script>drawpinnetjes();</script></div>
            <div id="cover"></div>
            <div id="covertgl"></div>
        </div>
        <div id="knoppen"><script>drawbuttons();</script></div>
        <div id="doosjes">
            <div id="kleurenpalet"> <div id="hulppalet"><script>drawcolors();</script></div></div>
            <div id="pinnen"><script>drawblackwhite();</script></div>
        </div>

        <div id="nieuwspel">
            <p><input type="button" id="nwspelknop"value="Nog een spel" onClick="window.location.reload()"></p>
        </div>


<!-- *********************************************************************************************************** -->

        <script>
            // alert ("Hallo");
            x = document.getElementById("pinnen");
            x.style.visibility = "hidden";
            x.style.opacity = 0;

            server = document.getElementById("server").innerHTML;
            room = document.getElementById("kamer").innerHTML;
            game = document.getElementById("spelnaam").innerHTML;
            user = document.getElementById("spelerid").innerHTML;
            voornaam = document.getElementById("gebrvoornaam").innerHTML;
            naam = document.getElementById("gebrnaam").innerHTML;
            rol = document.getElementById("rol").innerHTML;
            user += "%" + rol;      

            document.getElementById("turns").innerHTML = "Welkom " + voornaam + ",<br/>wacht s.v.p. op uw beurt...";
            // document.getElementById("turns").innerHTML = "Welkom " + "Philip" + ",<br/>Wacht s.v.p. op uw beurt...";
            document.getElementById("turns").style = "height:36px";

            // alert ("room, game, user, rol: " + room + ", " + game + ", " + user + ", " + rol);        
            // alert ("server = " + server);

            var socket = io('http://' + server + ':3000/game');
            var gameData = {room: room, game: game, user: user};
            socket.emit('join room', gameData);

            socket.on('game init', function(init){
                console.log(init);
            });

            socket.on('game state', function(gamestate){
                console.log(gamestate);
                console.log("nu in gamestate...");

                npos = 5;
                l = gamestate.length - 1;
                ygsi = splitGamestate(gamestate, l);

                if (brt == 0 && rol == "codekraker") {
                    verwijderrij(npos, brt);
                    for (j = 1; j <= npos; j++) {
                        ij = (brt == 0) ? "0" + j : 10 * brt + j;
                        xkl = ygsi[j+1];
                        if (xkl > 0) {
                            knopje = document.getElementById("dragid" + xkl);
                            dropje = document.getElementById("dropid" + ij);
                            knopkloon = knopje.cloneNode(true);
                            dropje.appendChild(knopkloon);                               
                        }
                    }
                } else {

                }


                // console.log("ijdel = " + ijdel);

                // for (j=1; j<=npos; j++) {
                //     ij = 10 * brt + j; 

                //     xkl = gamestate[l][j+1];
                //     if (xkl > 0) {
                //         knopje = document.getElementById("dragid" + xkl);
                //         ouderfromtp = knopje.parentNode.id.substr(0, 6);
                //         ouderfrom = knopje.parentNode.id.replace("dropid", "");
                //         dropje = document.getElementById("dropid" + ij);
                //         knopkloon = knopje.cloneNode(true);
                //         console.log("j, ouderfrom = " + j + ", " + ouderfrom);
                //         deleterondje (ij);
                //         dropje.appendChild(knopkloon);
                //         if (ouderfrom[0] > 0 && ouderfrom[1] != j) {
                //             deleterondje (ouderfrom);
                //         }
                //     }
                //     if (ijdel > 0) {
                //         deleterondje(ijdel);
                //     }
                // }
            
            });

            socket.on('game turn', function(turn){
                if(turn == 1){
                    document.getElementById("turns").innerHTML = voornaam + ", u bent aan zet..."
                } else if (turn == 0) {
                    document.getElementById("turns").innerHTML = voornaam + ", wacht s.v.p. op uw beurt..."
                } else if (turn == 2) {
                    document.getElementById("turns").innerHTML = "Einde spel."
                }
                document.getElementById("turns").style = "height:36px";
            });

            function makeMove(moveData) {
                socket.emit('game move', moveData)
            };
        </script>
        
    </body>
</html>

<script>
    function splitGamestate(gamestate, l) {
        var ygs = new Array;

        ygs['type'] = gamestate[l][0];
        ygs['beurt'] = gamestate[l][1];
        ygs['pos1'] = gamestate[l][2];
        ygs['pos2'] = gamestate[l][3];
        ygs['pos3'] = gamestate[l][4];
        ygs['pos4'] = gamestate[l][5];
        ygs['pos5'] = gamestate[l][6];
        ygs['pos6'] = gamestate[l][7];
        ygs['nzw'] = gamestate[l][8];
        ygs['nwi'] = gamestate[l][9];
        ygs['delstat'] = gamestate[l][10];

        return ygs;
    }

    function verwijderrij(ni, i) {
        for (j = 1; j <= ni; j++) {
            verwijderrondje(i, j);
        }
    }

    function verwijderrondje(i, j) {
        if (i == 0) {
            $("#dropid0" + j).empty();
            xgis[j] = 0;
        } else {
            ii = 10 * i + j;
            $("#dropid" + ii).empty();
            ygis[j] = 0;
        }
        delstat = ii;
    }
</script>