let pot = 20;
let spot = 50;
let hpot = 200;

let pots = [hpot, spot, pot];
let hpMissing = 296;

let lossAt = new Array(1000).fill(1000);
lossAt[0] = 0;
let potionsAt = new Array(1000).fill(-1);

let table;

onHPChanged = function () {
    hpMissing = document.getElementById("why").value;

    hpMissing = hpMissing.replace(/\s/g, '');

    if (hpMissing === "") return;

    if (typeof (hpMissing) == "string") {
        hpMissing = parseInt(hpMissing);

        if (typeof (hpMissing) == "string") return;
    }

    newWay(pots, hpMissing);
    let amounts = getThemInOrder(pots);
    changeTable(amounts);
}

function changeTable(amounts) {
    if (!table) table = document.getElementById("tableboy");

    let rows = table.rows;

    rows[1].cells[1].innerText = amounts[2];
    rows[2].cells[1].innerText = amounts[1];
    rows[3].cells[1].innerText = amounts[0];
}

function newWay(pots, hpMissing) {

    for (let i = 1; i < hpMissing + 1; i++) {

        if (lossAt[i] != 1000) continue;

        for (let x = 0; x < pots.length; x++) {

            let pot = pots[x];
            let remaining = i - pot;
            let waste = -remaining;

            if (remaining <= 0 && waste < lossAt[i]) {
                // Because JavaScript?
                if (remaining == 0) waste = 0;

                lossAt[i] = waste;
                potionsAt[i] = x;
            }

            // Found a better potion
            else if (lossAt[remaining] < lossAt[i]) {
                lossAt[i] = lossAt[remaining];
                potionsAt[i] = x;
            }
        }
    }
}

getThemInOrder = function (pots) {

    potsByOrder = new Array(3).fill(0);

    let currentHP = hpMissing;

    while (currentHP > 0) {
        let pot = pots[potionsAt[currentHP]];
        // console.log(pot);
        potsByOrder[potionsAt[currentHP]]++;
        currentHP = currentHP - pot;
    }

    // console.table(array);
    // console.table(potsByOrder);

    return potsByOrder;
}