"use strict";

window.addEventListener("load", function(){

let svgContainer = document.getElementById("svgContainer");
console.log(svgContainer);
let svgRoot=svgContainer.getSVGDocument()
console.log(svgRoot);;
let svgElements = svgRoot.childNodes[1].childNodes;
console.log(svgElements);
let svgPaths = new Array();
function addEl2Arr(node, arr){
    if(node.childElementCount !== undefined) {
        node.childNodes.forEach((item)=>addEl2Arr(item, arr));
    }
    //console.log(node);
   // else{
        if(node.nodeName=="path"){
//console.log(node);
            return arr.push(node);
     //   }
    }
}
var i;
for (i in svgElements){
    addEl2Arr(svgElements[i], svgPaths);
}

console.log(svgPaths);

let styles = new Array();
svgPaths.forEach((node)=>{
    var item = node.getAttribute("style");
    return styles.push(item.split(";").map(i=>{
        return i.split("=").map(a=>{return a.split(":");});
        
    }));
});
/*svgPaths.forEach((node)=>{
    return  styles.push(node.getAttribute("style"));});
    */
console.log(styles);

svgPaths.map(path=>{path.removeAttribute("style");})

var i;
function getStyles(style){
    if(typeof(style[0]) == Array){
        return getStyles(style);
    }
    else {
        return style;
    }
}

for(i in styles){
    styles[i].forEach(style=>{
        var list = getStyles(style);
        //console.log(list);
        try{
        svgPaths[i].setAttribute(list[0][0], list[0][1]);
    }
    catch(e){console.log(e);}
    })
}
let colors=svgPaths.map((path)=>{return path.getAttribute("fill")});
console.log(colors);

function randomizeColor(node){
    //this.setAttribute("fill", colors[Math.floor(Math.random()*(colors.length))]);
    //console.log(this.getAttribute("fill"));
    
    //" '{from {fill: '+this.getAttribute("fill")+';} to { fill:'+colors[Math.floor(Math.random()*(colors.length))]+';}}');
    
    var id = node.getAttribute("id");
    var animate = svgRoot.createElementNS("http://www.w3.org/2000/svg", "animate");
    animate.setAttribute("xlink:href", "#"+id);
    animate.setAttribute("attributeType","XML");
    animate.setAttribute("attributeName", "fill");
    animate.setAttribute("from", node.getAttribute("fill"));
    animate.setAttribute("to", colors[Math.floor(Math.random()*(colors.length))]);
    animate.setAttribute("dur", "1s");
    animate.setAttribute("repeatCount", "indefinite");
    animate.setAttribute("begin", "mouseout");
//animation.setAttribute("stop", "click");
    node.appendChild(animate);
    node.removeAttribute("fill");

}


svgPaths.forEach((path)=>{randomizeColor(path);});
//path.addEventListener("click",randomizeColor);});

});
