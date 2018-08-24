var sheetTitle = document.getElementsByClassName('sheet-title')[0];

var growth= setTimeout(growing, 100);
var shrink = setTimeout(shrinking, 1100);

function growing(){
    sheetTitle.style.transform = "scale(1.4)";    
}

function shrinking() {
    sheetTitle.style.transform = "scale(1)";
}
