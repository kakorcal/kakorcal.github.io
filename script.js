window.onload = init;

function init() {
    console.log('Page Loaded');
    var body = document.getElementsByTagName('body')[0];
    var svgStyle = backgroundStyle(body, "url('/img/pattern.svg')", "repeat", "0/20px");
    // var colorArr = [
    //     [196, 7, 19],
    //     [148, 212, 56],
    //     [254, 238, 53],
    //     [128, 18, 146],
    //     [15, 86, 240]  
    // ];
    // var counter = 0;
    /* 
        0. start with 196, 7, 7
        1. increase g value to 196
        2. decrease r value to 7
        3. increase b value to 196
        4. decrease g value to 7
        5. increase r value to 196
        6. decrease b value to 7
    */

    // var timerId = setInterval(function () {
    //     svgStyle(colorRGBA(colorArr[counter++]));
        
    //     if(counter >= colorArr.length) {
    //         counter = 0;
    //     }
    // }, 1000);
}

function backgroundStyle(body, url, repeatStyle, positionAndSize) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function(color) {
        var style = color + " " + args.join(" ");
        body.style.background = style;
    }
}

function colorRGBA(arr) {
    var color = arr.join(" ").trim().replace(/ /g, ",");
    return "rgb(" + color + ")";
}