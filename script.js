window.onload = init;

/* 
    colors
    "53,73,93"
    "39,174,96"
    "15,86,240"
    "200,10,52"
    "128,18,146"
    "142,94,52"
*/

function init() {
    console.log('Page Loaded');
    var colors = ["53,73,93", "39,174,96", "15,86,240", "200,10,52", "128,18,146"];
    var shuffled = shuffle(colors.slice());

    initColorElements(shuffled);

    // keep reference to all dom elements that will change
    // use them later in the callbacks
    var robos = document.getElementsByClassName('robos-background')[0];
    var header = document.getElementsByClassName('nav__header')[0];
    var navIcons = document.getElementsByClassName('nav__list__icon');
    var footerIcons = document.getElementsByClassName('nav__footer__icon');
    var main = document.getElementsByClassName('main')[0];

    var backgroundCallBack = backgroundStyle([robos, header]);
    var handleBackgroundColor = changeBackgroundColor(main, backgroundCallBack, shuffled[0]);
    var handleNavIconToggle = navIconToggle(navIcons);
    var handleFooterIconToggle = footerIconToggle(footerIcons, shuffled[0]);
    var animateBackgroundPosition = changeBackgroundPosition(robos, "center", 0);

    // set inital data
    initRibbons();
    handleBackgroundColor();
    handleNavIconToggle();
    handleFooterIconToggle();
    window.requestAnimationFrame(animateBackgroundPosition);

    main.onscroll = function () {
        handleBackgroundColor();
        handleNavIconToggle();
        handleFooterIconToggle();
    };
}

// shuffle colors and assign to each color element
function initColorElements(colors) {
    var colorElements = document.getElementsByClassName('colorElement');

    for(var i = 0; i < colorElements.length; i++) {
        colorElements[i].setAttribute("data-color", colors[i]);
    }
}

// fisher-yates shuffle function
function shuffle(array) {
    var i = 0;
    var j = 0;
    var temp = null;

    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
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
function toRGBA(color, a) {
    var styles = "";
    if (a) {
        styles = "rgb(" + color + "," + a + ")";
    }else {
        styles = "rgb(" + color + ")";
    }
    return styles;
}

// apply / change background color to all specified elements
function backgroundStyle(elements) {
    return function(color) {
        for(var i = 0; i < elements.length; i++) {
            var el = elements[i];
            var styles = toRGBA(color);
            // var styles = el.classList.contains('robos-background') ? 
            //     toRGBA(color, 0.7) : toRGBA(color);
            elements[i].style.backgroundColor = styles;       
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
        if(active) {
            for(i = 0; i < navIcons.length; i++) {
                var icon = navIcons[i];
                if(icon.dataset.nav === active.dataset.nav) {
                    icon.style.opacity = 1;
                }else {
                    icon.style.opacity = 0;
                }
            }
        }
    };
}

// change color of footer icons when active class changes
function footerIconToggle(footerIcons, initialColor) {
    var current = initialColor;
    for (i = 0; i < footerIcons.length; i++) {
        var icon = footerIcons[i];
        icon.style.color = toRGBA(current);
    }

    return function() {
        var active = document.getElementsByClassName('active')[0];
        if(active) {
            var activeColor = active.dataset.color;
    
            if (current !== activeColor) {
                current = activeColor;
                for (i = 0; i < footerIcons.length; i++) {
                    var icon = footerIcons[i];
                    icon.style.color = toRGBA(activeColor);
                }
            }
        }
    };
}

// visual effect of background moving upward
function changeBackgroundPosition(element, x, y) {
    var position = y;
    // fps = 250
    var fps = 33.333333333333333;
    var now;
    var then = Date.now();
    var interval = Math.round(1000 / fps);
    var delta;
    
    return function increment() {
        window.requestAnimationFrame(increment);
        
        now = Date.now();
        delta = now - then;
        if (delta > interval) {
            then = now - (delta % interval);
            element.style.backgroundPosition = x + " " + position + "px";
            // position -= 0.5
            position -= 1;
        }
    };
}