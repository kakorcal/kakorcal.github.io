window.onload = init;

function init() {
    console.log('Page Loaded');
    var body = document.getElementsByTagName('body')[0];
    var header = document.getElementsByClassName('card__header')[0];
    var navIcons = document.getElementsByClassName('nav__icon');
    var footerIcons = document.getElementsByClassName('footer__icon');
    var colorElements = [body, header];

    var main = document.getElementsByClassName('main')[0];

    // TODO: set backgroundImgSize depending on css sbreakpoints
    var clientHeight = document.documentElement.clientHeight;
    var backgroundImgSize = "0/" + Math.floor(clientHeight / 2) + "px";
    console.log("Background image size", backgroundImgSize);
    var backgroundCallBack = backgroundStyle(colorElements, "url('/img/robos.svg')", "repeat", backgroundImgSize);
    var handleBackgroundColor = changeBackgroundColor(main, backgroundCallBack, "53, 73, 93");
    var handleNavIconToggle = navIconToggle(navIcons);
    var handleFooterIconToggle = footerIconToggle(footerIcons, "53, 73, 93");
    // var handleFooterIconRotation = footerIconRotation(footerIcons, main);

    // set inital data
    initRibbons();
    handleBackgroundColor();
    handleNavIconToggle();
    handleFooterIconToggle();
    // handleFooterIconRotation();

    main.onscroll = function () {
        handleBackgroundColor();
        handleNavIconToggle();
        handleFooterIconToggle();
        // handleFooterIconRotation();
    };
}

// add background color to all ribbons
function initRibbons() {
    var ribbons = document.getElementsByClassName('card__ribbon');
    for(var i = 0; i < ribbons.length; i++) {
        var current = ribbons[i];
        // card class
        var parent = current.parentElement.parentElement;
        var color = parent.dataset.color;
        current.style.background = toRGBA(color);
    }
}

// utility function returning style in rgba format
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

// apply / change background color to all specified elements
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

// detects if background color needs to be changed
// applys background changes if element is in view
function changeBackgroundColor(scrollContainer, backgroundCallBack, initialColor) {
    var current = initialColor;
    backgroundCallBack(current);
    
    return function() {
        var position = scrollContainer.scrollTop;
        var color = current;
        var paddingOffset = 20;
        var extraOffset = 150;
        
        // find child that is in view (ie getBoundingClientRect().top > 0 + paddingOffset)
        for(var i = 0; i < scrollContainer.children.length; i++) {
            var child = scrollContainer.children[i];
            var clientRect = child.getBoundingClientRect();
            var distanceRelativeToViewport = clientRect.bottom; 
            var childHeight = clientRect.height;
            
            // check if the child is in view
            if (distanceRelativeToViewport - paddingOffset - extraOffset > 0 && 
                distanceRelativeToViewport - paddingOffset - extraOffset < childHeight) {
                if(!child.classList.contains('active')) {
                    child.classList.add('active');
                }
                color = child.dataset.color;
            }else {
                if (child.classList.contains('active')) {
                    child.classList.remove('active');
                }
            } 
        }

        // change color if diffrent child is in view
        if (current !== color) {
            current = color;
            backgroundCallBack(current);
        }
    }
}

// toggle opacity of icon if card element is in view (ie. active)
function navIconToggle(navIcons) {
    return function() {
        var active = document.getElementsByClassName('active')[0];
        for(i = 0; i < navIcons.length; i++) {
            var icon = navIcons[i];
            if(icon.dataset.nav === active.dataset.nav) {
                icon.style.opacity = 1;
            }else {
                icon.style.opacity = 0;
            }
        }
    };
}

// change color of footer icons when active class changes
function footerIconToggle(footerIcons, initialColor) {
    var current = initialColor;
    return function() {
        var active = document.getElementsByClassName('active')[0];
        var activeColor = active.dataset.color;

        if (current !== activeColor) {
            current = activeColor;
            for (i = 0; i < footerIcons.length; i++) {
                var icon = footerIcons[i];
                icon.style.color = toRGBA(activeColor);
            }
        }
    };
}

// rotate footer icons on scroll
/* 
function footerIconRotation(footerIcons, scrollContainer) {
    return function() {
        var deg = scrollContainer.scrollTop;
        for (i = 0; i < footerIcons.length; i++) {
            var icon = footerIcons[i];
            icon.style.webkitTransform = 'rotate(' + deg + 'deg)';
            icon.style.mozTransform = 'rotate(' + deg + 'deg)';
            icon.style.msTransform = 'rotate(' + deg + 'deg)';
            icon.style.oTransform = 'rotate(' + deg + 'deg)';
            icon.style.transform = 'rotate(' + deg + 'deg)'; 
        }
    };
}
*/

/* 
    // var colorArr = [
    //     [196, 7, 19],
    //     [148, 212, 56],
    //     [254, 238, 53],
    //     [128, 18, 146],
    //     [15, 86, 240]
    // ];

        for (var i = 0; i < scrollContainer.children.length; i++) {
            var child = scrollContainer.children[i];
            var nextChild = scrollContainer.children[i+1];
            var childOffset = child.offsetTop;
            var nextChildOffset = nextChild ? nextChild.offsetTop : child.offsetTop + child.offsetHeight;

            var childBCR = child.getBoundingClientRect();
            var nextChildBCR = nextChild.getBoundingClientRect();
            console.log('position', position);

            console.log('child', childBCR);
            console.log('nextchild', nextChildBCR);


            if (position + 200 >= childOffset && position + 200 < nextChildOffset) {
                color = child.dataset.color;

                if (!child.classList.contains('active')) {
                    child.classList.add('active');
                }
                break;
            }else {
                if (child.classList.contains('active')) {
                    child.classList.remove('active');
                }
            }
        }

        if(current !== color) {
            current = color;
            backgroundCallBack(current);
        }
*/