
//	JQuery-functies 

$("document").ready(function() {
	var i0;

	beurt = 0;
	// speltype = "auto"; /* auto, handmatig */
	speltype = "handmatig"; /* auto, handmatig */

	for(j=1; j<=6; j++) {
		xgis[j] = 0;
		ygis[j] = 0;
	}
	
	if (speltype == "auto") {
		genereercode ();
		beurt = 1;
		i0 = 2;
		}
	else {
		i0 = 1;
	}

	for (i=i0; i<=10; i++) {
		$("#knop" + i).css("visibility", "hidden");
	}

	if (speltype == "handmatig") {
		dum = 1;
		$("#cover").css("visibility", "hidden"); }
	else {
		$("#knop0").css("visibility", "hidden");
	}

	$("#nwspelknop").css("visibility", "hidden");
});

$(function() {
	$("#covertgl").click(function() {
		if (dum == 1) {
			dum = 0;
			$("#cover").css("visibility", "visible"); }
		else {
			dum = 1;
			var antw = confirm ("Are you sure that you want to reveal the code?");
			if (antw == true) {
				$("#cover").css("visibility", "hidden");
//				$("#knop" + beurt).css("visibility", "hidden");
//				$("#nwspelknop").css("visibility", "visible"); 
			}
			else {
				dum = 0;
			}
		}
	});
});

$(function() {
	$("#knop0, #knop1, #knop2, #knop3, #knop4, #knop5, #knop6, #knop7, #knop8, #knop9, #knop10").click(function() {

		var ii = this.id.replace("knop", "") * 1 + 1;
		var nzw = 0;

		$(this).css("visibility", "hidden");

		if (beurt == 0) {
			dum = 0;
			$("#cover").css("visibility", "visible"); }
		else {
			if (speltype == "auto") {
				nzw = plaatspins (beurt);

				for(j=1; j<=6; j++) {
					ygis[j] = 0;
				}
			}
		}
		if (ii <= 10 && nzw < 5) {
			$("#knop" + ii).css("visibility", "visible");
		}


		// updStatus(2, 0, 1, beurt, 0, 0);
		statusArr2[beurt] = updStatusArr(2, beurt, 0, 0);
		console.log(statusArr2);
		makeMove(statusArr2);

		beurt++;
//		alert ("beurt is nu: " + beurt);
	});
});

$(function() {
	$("#dropid11, #dropid21, #dropid31, #dropid41, #dropid51, #dropid61, #dropid71, #dropid81, #dropid91, #dropid101").dblclick(function() {
		var ii = this.id.replace("dropid", "") * 1;
		deleterondje (ii);
		updSockDel(ii);
	});
});

$(function() {
	$("#dropid12, #dropid22, #dropid32, #dropid42, #dropid52, #dropid62, #dropid72, #dropid82, #dropid92, #dropid102").dblclick(function() {
		var ii = this.id.replace("dropid", "") * 1;
		deleterondje (ii);
		updSockDel(ii);
	});
});

$(function() {
	$("#dropid13, #dropid23, #dropid33, #dropid43, #dropid53, #dropid63, #dropid73, #dropid83, #dropid93, #dropid103").dblclick(function() {
		var ii = this.id.replace("dropid", "") * 1;
		deleterondje (ii);
		updSockDel(ii);
	});
});

$(function() {
	$("#dropid14, #dropid24, #dropid34, #dropid44, #dropid54, #dropid64, #dropid74, #dropid84, #dropid94, #dropid104").dblclick(function() {
		var ii = this.id.replace("dropid", "") * 1;
		deleterondje (ii);
		updSockDel(ii);
	});
});

$(function() {
	$("#dropid15, #dropid25, #dropid35, #dropid45, #dropid55, #dropid65, #dropid75, #dropid85, #dropid95, #dropid105").dblclick(function() {
		var ii = this.id.replace("dropid", "") * 1;
		deleterondje (ii);
		updSockDel(ii);
	});
});

// ***********************************************************************************

function deleterondje(ii) {
	alert("Hallo delete rondje...");
	var j = ii % 10;
	var i = (ii - j) / 10;
	delstat = ii;
	alert("i, beurt = " + i + ", " + beurt);
	if (i == beurt) {
		if (i == 0) {
			$("#dropid0" + j).empty();
			xgis[j] = 0;
		} else {
			$("#dropid" + ii).empty();
			ygis[j] = 0;
		}
	}
}

function updSockDel(ii) {
	// updStatus("speler", 0, 0, beurt, 0, 0, ii);
	statusArr2[beurt] = updStatusArr(1, beurt, 0, 0);
	console.log(statusArr2);
	makeMove(statusArr2);
}
