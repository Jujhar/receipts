/*
* R E C I E P T S
* = = = = = = = =
* Alpha 0.3
* written by Singh
* October 2017
*
*
*/

var prompt = require('prompt');
var fs = require('fs');
var preset_dat = require('./presets.json');
var data = [];
var output = 0;
var customerName = '';

console.log('');
console.log("Welcome");
console.log('-------');
console.log('#$!');
console.log('-------');

if (preset_dat.savetohistory == 1){
    console.log('');
    console.log('Please enter customers name');
    console.log('');

    prompt.start();
    prompt.get(['customername'], function (err, result) {
        if (result.customername != ''){
            customerName = result.customername;

            console.log('');
            console.log('Thanks');
            console.log('');

            chooseOutput();
        }

        else {
            chooseOutput();
        }
    });
}

function chooseOutput(){
console.log('');
console.log('Please enter output method');
console.log('0 - For Console');
console.log('1 - For .txt file');
console.log('');

prompt.get(['output'], function (err, result) {
    if (result.output == '1'){
        output = 1;
        System();
    }

    else {
        System();
    }
});
}

function System() {
    console.log('')
    console.log('Enter item name of first item')
    console.log('')

    newItem();
}

function newItem() {
    prompt.get(['itemname', 'quantity', 'value'], function (err, result) {
        if (result.itemname == '' || result.itemname == undefined) {
            done();
        }

        else if (isNaN(result.value)) {
            error('must be number');
            console.log('')
            console.log('Please enter item name again')
            console.log('')
            newItem()
        }

        else {
            console.log(+result.itemname + ' ' + result.quantity + ' ' + result.value);

            // Add item data as an an array item
            data.push([result.itemname, result.quantity, result.value]);

            console.log('');
            console.log('Enter next item or press enter 3 times to finish');
            newItem();
        }
    });
}

// Append to history
function addtohistory(total){
    if (preset_dat.savetohistory == 1){
        total = "\r\n" + customerName
            + " - " + total;
        fs.appendFile("./output/history.txt", total, function(err) {
            if(err) {
                return console.log(err);
            }
        });
    }
}

function done() {
    var total = 0;

    // Check output
    if (output == 1){

        text_data = '';

        text_data += recieptHeader();

        // Enter each item
        for (i = 0; i < data.length; i++) {
            text_data += (data[i][0] + "\t" // Name
                + data[i][1] + "\t" // Quantity
                + '$' + data[i][2] + "\n"); // Value

            // Calculate total
            total += data[i][2];
        }

        // Display total
        text_data += ('total' + "\t\t" + '$' + total)

        fs.writeFile("./output/receipt.txt", text_data, function(err) {
            if(err) {
                return console.log(err);
            }

            // Display total
            console.log("File saved." + '(total $' + total + ')');
        });

        if (preset_dat.savetohistory == 1) {
            addtohistory(total);
        }
    }

    else {
        console.log("\n");
        console.log(recieptHeader());
        // Enter each item
        for (i = 0; i < data.length; i++) {
            console.log(data[i][0] + "\t" // Name
                + data[i][1] + "\t" // Quantity
                + '$' + data[i][2]); // Value

            // Calculate total
            total += data[i][2];
        }

        // Display total
        console.log('total' + "\t\t" + '$' + total)

        // Save to history
        if (preset_dat.savetohistory == 1) {
            addtohistory(total);
        }

    }

    // Display the thank you message
    if (preset_dat.thankyoumessage != ''){
        console.log('')
        console.log(preset_dat.thankyoumessage)
        console.log('')
    }

    console.log('')
    console.log('done!')
}

function recieptHeader(){
    let reciept_data = '';
    reciept_data += preset_dat.companyname + '\n';
    reciept_data += preset_dat.companyaddress + "\n";
    reciept_data += preset_dat.companyemail + "\n";
    reciept_data += preset_dat.companywebsite + "\n\n";

    reciept_data += "Date:   XX/XX/XXXX XX:XX\n";
    reciept_data += "--------------------------------------------------\n";
    reciept_data += "    Qty   Product                    Total\n";
    reciept_data += "--------------------------------------------------\n";

    return(reciept_data);
}

// Display error
function error(errortext) {
console.log('')
console.log('error: ' + errortext)
}
