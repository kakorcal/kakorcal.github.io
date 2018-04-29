window.onload = init;

function init() {
    console.log('Page Loaded');
    var body = document.getElementsByTagName('body')[0];
    var header = document.getElementsByClassName('card__header')[0];
    var elements = [body, header];

    var main = document.getElementsByClassName('main')[0];
    var backgroundCallBack = backgroundStyle(elements, "url('/img/pattern.svg')", "repeat", "0/20px");
    var handleBackgroundColor = changeBackgroundColor(main, backgroundCallBack, "53, 73, 93");
    main.onscroll = handleBackgroundColor;

    // var colorArr = [
    //     [196, 7, 19],
    //     [148, 212, 56],
    //     [254, 238, 53],
    //     [128, 18, 146],
    //     [15, 86, 240]  
    // ];
}

function backgroundStyle(elements, url, repeatStyle, positionAndSize) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function(color) {
        var rgba = "rgb(" + color + ")";
        var style = rgba + " " + args.join(" ");

        for(var i = 0; i < elements.length; i++) {
            var el = elements[i];
            if(el.tagName === 'BODY') {
                elements[i].style.background = style;       
            }else {
                elements[i].style.background = rgba;       
            }
        }
    }
}

function changeBackgroundColor(scrollContainer, backgroundCallBack, initialColor) {
    var current = initialColor;
    backgroundCallBack(current);
    
    /* 
        var max = 196;
        var min = 7;
        0. start with 196, 7, 7
        1. increase b value to 196
        2. decrease r value to 7
        3. increase g value to 196
        4. decrease b value to 7
        5. increase r value to 196
        6. decrease g value to 7
    */

    return function() {
        var position = scrollContainer.scrollTop;
        var color = current;
        
        for (var i = 0; i < scrollContainer.children.length; i++) {
            var child = scrollContainer.children[i];
            var nextChild = scrollContainer.children[i+1];

            if(nextChild) {
                if(position + 200 >= child.offsetTop && position + 200 < nextChild.offsetTop) {
                    color = child.dataset.color;
                    break;
                }
            }else {
                color = child.dataset.color;
            }
        }

        if(current !== color) {
            current = color;
            backgroundCallBack(current);
        }
    }
}