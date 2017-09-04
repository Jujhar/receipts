// Written by Singh 2017

var prompt = require('prompt');
var preset_dat = require('./presets.json');
var data = []

console.log('')
console.log("Welcome")
console.log('-------')
console.log('#$!')
console.log('-------')

console.log('')
console.log('Enter item name of first item')
console.log('')

prompt.start();
newItem();

function newItem() {
    prompt.get(['itemname', 'quantity', 'value'], function (err, result) {
        if (result.itemname == '' || result.itemname == undefined){
            done();
        }

        else if (isNaN(result.value)){
            error('must be number');
            console.log('')
            console.log('Please enter item name again')
            console.log('')
            newItem()
        }

        else {
            console.log(+ result.itemname + ' ' + result.quantity + ' ' + result.value);

            // Add item data as an an array item
            data.push([result.itemname, result.quantity, result.value]);

            console.log('');
            console.log('Enter next item or press enter to finish');
            newItem();
        }
    });
}

function done() {
    var total = 0;

    // Enter each item
    for(i=0; i < data.length; i++) {
        console.log(data[i][0] + "\t" // Name
        + data[i][1] + "\t" // Quantity
        + '$' + data[i][2]); // Value

        // Calculate total
        total += data[i][2];
    }

    // Display total
    console.log('total' + "\t\t" + '$' + total)

    // Display the thank you message
    if (preset_dat.thankyoumessage != ''){
        console.log('')
        console.log(preset_dat.thankyoumessage)
        console.log('')
    }

    console.log('')
    console.log('done!')

}

// Display error
function error(errortext) {
console.log('')
console.log('error: ' + errortext)
}
