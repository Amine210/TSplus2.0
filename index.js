/*------------------- Useful Functions ---------------------------*/ 

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }

  function componentFromStr(numStr, percent) {
    var num = Math.max(0, parseInt(numStr, 10));
    return percent ?
        Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
}

  function rgbToHex(rgb) {
    var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
    var result, r, g, b, hex = "";
    if ( (result = rgbRegex.exec(rgb)) ) {
        r = componentFromStr(result[1], result[2]);
        g = componentFromStr(result[3], result[4]);
        b = componentFromStr(result[5], result[6]);

        hex = "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    
    return hex;
}

/* computeLuminence : Calculate luminence Of a given Color */ 
function computeLuminence(backgroundcolor) {
    var colors = hexToRgb(backgroundcolor);
    var components = ['r', 'g', 'b'];
    for (var i in components) {
        var c = components[i];
        
        colors[c] = colors[c] / 255.0;
  
        if (colors[c] <= 0.03928) { 
            colors[c] = colors[c]/12.92;
        } else { 
            colors[c] = Math.pow (((colors[c] + 0.055) / 1.055), 2.4);
        }
    }
    
    var luminence = 0.2126 * colors.r + 0.7152 * colors.g + 0.0722 * colors.b;
    return luminence;
  }


  /* shouldTextBeBlack Check if Color is Light -> return true */
function shouldTextBeBlack (backgroundcolor) {
    return computeLuminence(backgroundcolor) > 0.5;
  }
  

/*-------------------dynamic underLine linear-gradient ---------------------------*/ 
const rootStyles = getComputedStyle(document.documentElement);
const mainColor = rootStyles.getPropertyValue('--primary-color');
/* When mainColor is light : Add 0.2 to the opacity of all secondary Color */
let delta = 0 ; 
if(shouldTextBeBlack(mainColor)){
    delta = 0.2 ; 
    document.documentElement.style.setProperty('--input-opacity', 0.8);
}

function addAlpha(color, opacity) {
    var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
}
let c1 = addAlpha(mainColor, 0.45+delta) ;
let c2 = addAlpha(mainColor, 0.20+delta) ;
let C ="linear-gradient(90deg, " +c1+" 0%,"+c2+" 100%)" 



document.documentElement.style.setProperty('--underLine-color', C);
/*---------------------------------Panel transparency ------------------------------*/ 



const panelColor = rootStyles.getPropertyValue('--panel-color');
const panelTransparency = rootStyles.getPropertyValue('--panel-transparency');
let color = addAlpha(panelColor, panelTransparency) ; 
document.documentElement.style.setProperty('--panel-color', color);



/*-------------------dynamic color calculator for secondary button ---------------------------*/ 

var r = document.querySelector(':root');
const lightGreyBtn = document.querySelectorAll(".secondary-button") 
const primaryBtn = document.querySelectorAll(".primary-button") 
const arrow = document.querySelector("#arrow path")

lightGreyBtn.forEach(btn => {
   

    let myDivObjBgColor = window.getComputedStyle(btn).backgroundColor
    if(shouldTextBeBlack(rgbToHex(myDivObjBgColor))){
      r.style.setProperty('--secondary-button-text', '#4a4a4a');
      arrow.style.stroke='#4a4a4a';
   
     
    }
    else {
        r.style.setProperty('--secondary-button-text', 'white');
        arrow.style.stroke="white"
      
    }
  
   
})

let logOff = document.querySelectorAll("#logOff path")
logOff=Array.from(logOff)
console.log(logOff)
primaryBtn.forEach(btn => {
   
    let myDivObjBgColor = window.getComputedStyle(btn).backgroundColor
    
    var r = document.querySelector(':root');
    if(shouldTextBeBlack(rgbToHex(myDivObjBgColor))){
      r.style.setProperty('--primary-button-text','#4a4a4a');
      logOff.forEach(e => {
        e.style.stroke='#4a4a4a'
      })
     
      
    }
    else {
        r.style.setProperty('--primary-button-text', 'white');
       
    }
  
   
})


/*------------------- Password type toggle   ---------------------------*/ 

const password = document.querySelector('.password');
togglePassword.addEventListener('click', function (e) {
// toggle the type attribute
const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
password.setAttribute('type', type);
});


/*------------------- PopUp toggle   ---------------------------*/ 

const popup1 = document.querySelector('#cd-popup1');
const popup2 = document.querySelector('#cd-popup-form') ;  

const popupConfirmation = document.querySelector('.cd-popup');
const popupform = document.querySelector('#cd-popup-form'); 


const submitBtn = document.querySelector('.submiBtn');
const htm5lBtn = document.querySelector('.htm5lBtn');
let crossBtn = document.querySelectorAll('.cd-popup-close');

crossBtn = Array.from(crossBtn)

function hidePopUp (popUp){
        
    popUp.style.opacity="0"
    popUp.style.visibility="hidden"

}

function showPopUp (popUp){

popUp.style.opacity="1"
popUp.style.visibility="visible"
popUp.style.transform = "scale(1)";
}


submitBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    showPopUp(popup1)
})

htm5lBtn.addEventListener("click",()=>{
    showPopUp(popup2)
})


crossBtn.forEach(element => {
    element.addEventListener("click",()=>{
        popup1.style.opacity="0"
        popup1.style.visibility="hidden"

        popup2.style.opacity="0"
        popup2.style.visibility="hidden"
        popup2.s
    })
});  






function isvisible(popUp){
    if(popUp.style.opacity =="1")  return true 
    else return false 
}

popup1.addEventListener("click",(e)=>{
    
    if( popup1.style.opacity=="1" ){
        if(e.target ==  popup1 ) {
            hidePopUp(popup1)
        }
        
    }
})  

popup2.addEventListener("click",(e)=>{
    if( popup2.style.opacity=="1" ){
        if(e.target ==  popup2  ) {
            hidePopUp(popup2)
        }
        
    }
})  


/* -------------- popup-2fa -------------------- */ 

function isShrinked(element){
    if(element.style.height=="0px") return true 
    else return false 
  }
        
  const popUp2fa =  document.querySelector(".popup-f2a")
  const extandedDiv1 = document.querySelector(".popup-f2a__container__content #extand-div1")
  const btn1 = document.querySelector(".popup-f2a__container__content #button1")
  const extandedDiv2 = document.querySelector(".popup-f2a__container__content #extand-div2")
  const btn2 = document.querySelector(".popup-f2a__container__content #button2")
  const crossBtn_2fa = document.querySelector("#cd-popup-close--2fa")


  btn1.addEventListener("click",(e)=>{
        
    let extand ="250px" ; 

    if (window.matchMedia("(min-width:1001px) and (max-width:1370px)").matches ) {
        extand = "240px" ;
      } else if (window.matchMedia("(max-width:700px)").matches ) {
        extand  = "240px"
      }
    
    e.preventDefault()
    if(!isShrinked(extandedDiv1)){
        extandedDiv1.style.height="0px"
        
        
    }
    else {
        extandedDiv1.style.height=extand
        
        if(!isShrinked(extandedDiv2)) {
            extandedDiv2.style.height="0px"
        }
    }
  })


  btn2.addEventListener("click",()=>{

    let extand ="150px" ; 

     if (window.matchMedia("(max-width:700px)").matches ) {
        extand  = "150px"
      }

    if(isShrinked(extandedDiv2)){
        extandedDiv2.style.height= extand
        if(!isShrinked(extandedDiv1)) {
            extandedDiv1.style.height="0px"
        }
    }
    else {
        extandedDiv2.style.height="0px"
    }
  })

  crossBtn_2fa.addEventListener("click",()=>{
        hidePopUp(popUp2fa)
  })
  

  
  popUp2fa.addEventListener("click",(e)=>{
    
        if(e.target ==  popUp2fa ) {
            hidePopUp(popUp2fa)
        }
        
})  


/* -------------- tooltips -------------------- */ 

const infoIncons = document.querySelectorAll(".info-icon")

const x1 = infoIncons[0].getBoundingClientRect().left 
const y1 = infoIncons[0].getBoundingClientRect().top 

const x2 = infoIncons[1].getBoundingClientRect().left 
const y2 = infoIncons[1].getBoundingClientRect().top 

const x3 = infoIncons[2].getBoundingClientRect().left 
const y3 = infoIncons[2].getBoundingClientRect().top 



/*
document.querySelector(`#tf1`).style.left=`${x1}px`
document.querySelector(`#tf1`).style.top=`${y1}px`
    
document.querySelector(`#tf2`).style.left=`${x2}px`
document.querySelector(`#tf2`).style.top=`${y2}px`
*/  



infoIncons.forEach( (item , index)=> {
    item.addEventListener("mouseover",()=>{
        document.querySelector(`#tf${index+1}`).style.opacity="1"
        document.querySelector(`#tf${index+1}`).style.display="flex" 
      
    })
    item.addEventListener("mouseleave",()=>{
        document.querySelector(`#tf${index+1}`).style.opacity="0"
        document.querySelector(`#tf${index+1}`).style.display="none" 

    })
})

document.addEventListener("mousemove", function(event) {
  

} )


/*------------------------ "Log on" Button ----------------------------------------*/
let logOnBtn = document.querySelector(".submiBtn")
let selectWrapper = document.querySelector(".select-wrapper")

if(selectWrapper.id =="hidden-item"){
    logOnBtn.setAttribute('id', 'submiBtn-extanded');
}




  

