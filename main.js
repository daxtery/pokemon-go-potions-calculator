let pot = 20;
let spot = 50;
let hpot = 200;

let pots = [hpot, spot, pot];
let hpMissing = 296;

let result = new Array(1000).fill(-1);

let table;

onHPChanged = function () {
    hpMissing = document.getElementById("why").value;

    hpMissing = hpMissing.replace(/\s/g, '');

    if (hpMissing === "") return;

    if (typeof (hpMissing) == "string") {
        hpMissing = parseInt(hpMissing);

        if (typeof (hpMissing) == "string") return;
    }

    // if (result && hpMissing > result.length) {
    //     console.table(result);
    //     let temp = new Array(hpMissing - result.length).fill(-1);
    //     console.table(temp);
    //     result = result.concat(temp);
    //     console.table(result);
    // }
    usePots(pots, hpMissing, result);
    // console.log("Res:");
    // console.table(result);
    let amounts = getThemInOrder(pots, result);
    changeTable(amounts);
    // console.table(amounts);
}

function changeTable(amounts) {
    if (!table) table = document.getElementById("tableboy");

    let rows = table.rows;

    rows[1].cells[1].innerText = amounts[2];
    rows[2].cells[1].innerText = amounts[1];
    rows[3].cells[1].innerText = amounts[0];
}

usePots = function (pots, hpMissing, soFar) {

    if (hpMissing <= 0) {
        return 0;
    }

    let bestIndex = 0;
    let best = pots[0];

    while (hpMissing >= 0 && soFar[hpMissing] != -1) {
        // console.log("soFar[%d] := %d", hpMissing, soFar[hpMissing]);
        // console.table(soFar);
        hpMissing = hpMissing - pots[soFar[hpMissing]];
    }

    for (let index = 0; index < pots.length; index++) {

        let e = pots[index];
        let wasted;
        let restOfHpNeeded;

        if (e > hpMissing) {
            wasted = e - hpMissing;
            restOfHpNeeded = 0;
        }
        else {
            restOfHpNeeded = hpMissing - e;
            wasted = 0;
        }

        // console.log("");
        // console.log("\nChoosing[%d] := %d && HpMissing(Before) := %d && HpAfterChoiceIs := %d, Wasted := %d", index, e, hpMissing, restOfHpNeeded, wasted);
        // console.log("wasted := %d", wasted);
        // console.log("<--NEW CALL : HpMissing: %d -->", restOfHpNeeded);

        let lessWasted = wasted + usePots(pots, restOfHpNeeded, soFar);

        // console.log("<--END OF CALL-->");
        // console.log("HpMissing(Before) := %d && lessWasted := %d", hpMissing, lessWasted);

        if (lessWasted < best) {
            bestIndex = index;
            best = lessWasted;
            soFar[hpMissing] = bestIndex;
        }
    }

    // console.log("   BestIndex := %d", bestIndex);
    // console.table(soFar);
    return best;
}

getThemInOrder = function (pots, array) {

    potsByOrder = new Array(3).fill(0);

    let currentHP = hpMissing;

    while (currentHP > 0) {
        let pot = pots[array[currentHP]];
        // console.log(pot);
        potsByOrder[array[currentHP]]++;
        currentHP = currentHP - pot;
    }

    // console.table(array);
    // console.table(potsByOrder);

    return potsByOrder;
}