window.onload = init;

function init() {
    console.log('Page Loaded');
    var body = document.getElementsByTagName('body')[0];
    var header = document.getElementsByClassName('card__header')[0];
    var ribbons = document.getElementsByClassName('card__ribbon');
    var elements = [body, header];

    var main = document.getElementsByClassName('main')[0];
    var backgroundCallBack = backgroundStyle(elements, "url('/img/pattern.svg')", "repeat", "0/20px");
    var handleBackgroundColor = changeBackgroundColor(main, backgroundCallBack, "53, 73, 93");
    var ribbonCallback = backgroundStyle(ribbons);

    initRibbons(ribbons);

    main.onscroll = function () {
        handleBackgroundColor();
        handleNavIconToggle();
    };

    // var colorArr = [
    //     [196, 7, 19],
    //     [148, 212, 56],
    //     [254, 238, 53],
    //     [128, 18, 146],
    //     [15, 86, 240]  
    // ];
}

function initRibbons(ribbons) {
    for(var i = 0; i < ribbons.length; i++) {
        var current = ribbons[i];
        // card class
        var parent = current.parentElement.parentElement;
        var color = parent.dataset.color;
        current.style.background = toRGBA(color);
    }
}

function toRGBA(color, backgroundConfig, applyConfigCallback) {
    var styles = "";
    var a = "0.8";
    if (backgroundConfig && applyConfigCallback()) {
        styles = "rgb(" + color + "," + a + ")" + " " + backgroundConfig.join(" ");
    }else {
        styles = "rgb(" + color + ")";
    }
    return styles;
}

function backgroundStyle(elements, url, repeatStyle, positionAndSize) {
    var args = Array.prototype.slice.call(arguments, 1);
    var a = "0.8";
    return function(color) {
        
        for(var i = 0; i < elements.length; i++) {
            var el = elements[i];
            var styles = toRGBA(color, args, function () { return el.tagName === 'BODY'; });
            elements[i].style.background = styles;       
        }
    }
}

function changeBackgroundColor(scrollContainer, backgroundCallBack, initialColor) {
    var current = initialColor;
    backgroundCallBack(current);
    
    return function() {
        var position = scrollContainer.scrollTop;
        var color = current;
        
        for (var i = 0; i < scrollContainer.children.length; i++) {
            var child = scrollContainer.children[i];
            var nextChild = scrollContainer.children[i+1];

            if(nextChild) {
                if(position + 200 >= child.offsetTop && position + 200 < nextChild.offsetTop) {
                    color = child.dataset.color;

                    // if (!child.classList.contains('active')) {
                    //     child.classList.add('active');
                    // }
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

function handleNavIconToggle() {

}