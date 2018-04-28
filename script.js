window.onload = init;

function init() {
    console.log('Page Loaded');
    var body = document.getElementsByTagName('body')[0];
    var main = document.getElementsByClassName('main')[0];
    var backgroundCallBack = backgroundStyle(body, "url('/img/pattern.svg')", "repeat", "0/10px");
    var handleBackgroundColor = changeBackgroundColor(main, backgroundCallBack, [196, 7, 19, 0.7]);
    main.onscroll = handleBackgroundColor;

    // var colorArr = [
    //     [196, 7, 19],
    //     [148, 212, 56],
    //     [254, 238, 53],
    //     [128, 18, 146],
    //     [15, 86, 240]  
    // ];
}

function backgroundStyle(body, url, repeatStyle, positionAndSize) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function(colorArr) {
        var rgba = colorArr.join(" ").trim().replace(/ /g, ",");
        var color = "rgb(" + rgba + ")";
        var style = color + " " + args.join(" ");
        body.style.background = style;
    }
}

function changeBackgroundColor(container, backgroundCallBack, initialColor) {
    var max = 196;
    var min = 7;
    var current = initialColor;
    var r = current[0];
    var g = current[1];
    var b = current[2];
    var a = current[3];

    backgroundCallBack(current);
    
    /* 
        0. start with 196, 7, 7
        1. increase b value to 196
        2. decrease r value to 7
        3. increase g value to 196
        4. decrease b value to 7
        5. increase r value to 196
        6. decrease g value to 7
    */

    return function() {
        var position = container.scrollTop;
        console.log(position);
        

        current = [r,g,b,a];
        backgroundCallBack(current);
    }
}