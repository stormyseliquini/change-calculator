$(document).ready(function() {

    $("button").on("click", changeCalculator);

    function changeCalculator() {

        // for reading purposes, ignore the 1000's  and just assume ((x*1000)-(y*1000))/1000 to be : x-y.. this was done to avoid floating point number issues

        var price = $("#price").val();

        var paid = $("#paid").val();

        // use parseFloat and toFixed to get the total to 2 floating points without rounding up and effecting later accuracy

        var change = (((paid * 1000) - (price * 1000)) / 1000);

        var prePTotal = parseFloat(change);

        var total = prePTotal.toFixed(2);

        // we can assume dollars to be the same as total without any floating points, so we use parseInt instead of parseFloat

        var dollars = parseInt(change);

        // get the remainder after the dollars are taken out of the total for later uses

        var remainderDollars = (((change * 1000) - (dollars * 1000)) / 1000);

        // find out how many quarters exsist within the change and parse to get a whole number, then like before.. get the remainder for later purposes

        var quarters = parseInt(remainderDollars / .25);

        var remainderQuarters = ((remainderDollars * 1000) - ((quarters * .25) * 1000)) / 1000;

        // find out how many dimes exsist within the change and parse to get a whole number, then like before.. get the remainder for later purposes

        var dimes = parseInt(remainderQuarters / .10);

        var remainderDimes = ((remainderQuarters * 1000) - (((dimes * .10) * 1000))) / 1000;

        // find out how many nickels exsist within the change and parse to get a whole number, then like before.. the remainder / .01 will be pennies

        var nickels = parseInt((remainderDimes * 1000) / (.05 * 1000));

        var remainderNickels = ((remainderDimes * 1000) - (((nickels * .05) * 1000))) / 1000;

        // round 

        var pennies = Math.round((remainderNickels * 1000) / (.01 * 1000));

        // make exception variables to declare

        var validate = "Oops! It looks like you didn't pay enough, try again!";
        var negativeAmount = "Please enter a valid amount";

        //log the original inputs for checking the calculations are correct (as the boxes will be automatically reset)

        console.log("amount paid: " + paid, "price : " + price)
            // write the output

        if (price <= 0 || paid <= 0) {
            $("#total").text(negativeAmount);
        } else if (paid >= price) {
            $("#total").text(total);
            $("#dollars").text(dollars);
            $("#quarters").text(quarters)
            $("#dimes").text(dimes);
            $("#nickels").text(nickels);
            $("#pennies").text(pennies);
        } else {
            $("#total").text(validate);
        }
    }
    $("button").on("click", reset);

    function reset() {
        $("#paid").val("");
        $("#price").val("");

    }
});
