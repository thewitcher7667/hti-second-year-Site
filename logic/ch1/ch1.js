let inp = document.getElementById('enter');
let selectInp = document.getElementById('selectInp');
let selectInpConvt = document.getElementById('selectInpConvt');
let result = document.getElementById('result');
let steps = document.getElementById('step');
let tb = document.getElementById('tb');
let tbdecimal = document.getElementById('tbdecimal');
let addBase = document.getElementById('addBase');

let inpVla = '';
let type = {inpConvert:'Decimal' , inpEntered:'Decimal'} ;

let aplha = ['A','B','C','D','E','F','G','H','I','J','K','L','M',"N",'O',"P",'Q','R','S','T','U','V','W','X','Y','Z']
let alphaHex = [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];

document.getElementById('enterMob').addEventListener('click',()=>{
    inp.value = inp.value.toUpperCase();
     inpVla = inp.value.toUpperCase();
     convertion()
})

inp.addEventListener('keypress',(event)=>{
    if(event.code === 'Enter'){
    inp.value = inp.value.toUpperCase();
     inpVla = inp.value.toUpperCase();
     convertion()
    }
})

addBase.addEventListener('keypress',(event)=>{
    if(event.code === 'Enter'){
        let val = addBase.value;
        selectInp.innerHTML += `<option value="${val}" class="${val}"> ${val}</option>`
        selectInpConvt.innerHTML += `<option value="${val}" class="${val}">${val}</option>`
    }
    let options = document.querySelectorAll('#selectInp option');
    let options2 = document.querySelectorAll('#selectInpConvt option');
    for(let i =0;i<options.length;i++){
        for(let d =0;d<options.length;d++){
          if(options[i].innerText === options[d].innerText && i!==d){
            options[i].remove();
            options2[i].remove();
          }
        }
    }
})
    
let first1 = true;
    selectInp.addEventListener('change',()=>{
        let val = selectInp.selectedOptions[0] ;
        if(val.className === 'Binary' ) {
            inp.setAttribute('max','1');
        }
        else if(val.className === 'hexadecimal'){
            inp.setAttribute('type','text')
            inp.setAttribute('max','')
        }else{
            inp.setAttribute('max','')
            inp.setAttribute('type','number')
        }
        type.inpEntered = val; 
        if(first1) document.getElementById('select1').remove(); first1 = false; 
        convertion()
    })

    let first2 = true;
    selectInpConvt.addEventListener('change',()=>{
        if(first2) document.getElementById('select2').remove(); first2 = false; 
        type.inpConvert = selectInpConvt.selectedOptions[0];
        convertion()
    }) 
    

function convertion(){
    tbdecimal.innerHTML='';//to print the decimal steps table 
    tb.innerHTML = '';//to print the real no steps table
    steps.innerHTML= '';//to print any to decimal
    let res ;//res for result
    document.getElementById('copied').innerText = '';
//////////////////////////////////////////////
if(type.inpConvert.className && type.inpEntered.className){
if(type.inpConvert.className == type.inpEntered.className) return result.innerText = "Please Select A different base";
if(type.inpEntered.className !== 'hexadecimal'){
    for(let i =0;i<inpVla.length;i++){
        if(aplha.includes(inpVla[i])){
           return result.innerText = "Enter a Number";
        }if(type.inpEntered.className === 'Binary'){
            if((inpVla[i] > 1 || inpVla[i]<-1)){
                return result.innerText = "Enter Binary Number";
             }
        }
    }
}
}else{
    return result.innerText = "Please Select A base";
}
//////////////////////////////////////////////
if(type.inpConvert.className === 'Decimal'){
   res = theConvertion(inpVla,parseInt(type.inpEntered.value),type.inpEntered.className,'any')
}else
//////////////////////////////////////////////
if(type.inpEntered.className === 'Decimal'){
    res = theConvertion(inpVla,parseInt(type.inpConvert.value),type.inpConvert.className,'decimal')

}else{
    let inpValPre = theConvertion(inpVla,parseInt(type.inpEntered.value),type.inpEntered.className,'any');
    res = theConvertion(inpValPre.toString(),parseInt(type.inpConvert.value),type.inpConvert.className,'decimal');
}
//////////////////////////////////////////////
//////copy result to clip//
document.getElementById('copy').addEventListener('click',()=>{
  navigator.clipboard.writeText(res);
  document.getElementById('copied').innerText = "copied to clipboard"
})
//////////////////////////////////////////////
result.innerText = "Result is : "+ res;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//tr for true or false
function theConvertion(number,ty,tr,convertionType){
    let realNo ;
    let decimalNo;
   let match = number.match(/\./g) ? true :false;
   if(match){
    let numberSplit = number.split('.')
    realNo = numberSplit[0].split('');
    decimalNo = numberSplit[1].split('');
    //decimal(decimalNo,ty,tr,convertionType)
   return real(realNo,ty,tr,convertionType) + decimal(decimalNo,ty,tr,convertionType);
   }else{
    realNo = number.split('');
    //real(realNo,ty,tr,convertionType)
    return real(realNo,ty,tr,convertionType) ;
   }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ty for type
function real(number,ty,tr,convertionType){
    ///////////////////////////////////////
    if(convertionType === 'any'){
        let i = number.length-1;
        let final = 0;
        if(tr !== 'hexadecimal'){
            number.forEach(el => {
                el = parseInt(el);
                final += el*Math.pow(ty,i);
                steps.innerHTML += `${el}x${ty}<sup>${i}</sup> + `
                i--  
            });
        }else{
            final = hexad(number,ty,i,'any')
        }
        return final;
    //////////////////////////////////////
    }else if(convertionType === 'decimal'){
        if(tr === 'Binary'){
            let decimalInt =[];
            let numeruTrunc = number.join('');
            while(Math.trunc(numeruTrunc) !== 0){
                let numero = numeruTrunc / ty;
                if(numero.toString().match(/\./g)){
                    decimalInt.push('1');
                }else{
                    decimalInt.push('0');
                }
                tb.innerHTML += `<tr><td>${numeruTrunc} / ${ty}</td> <td>${numero}</td> <td>${decimalInt[decimalInt.length-1]}</td></tr>`;
                numeruTrunc = Math.trunc(numero);
            }
            return decimalInt.reverse().join('');
        }else{
            let decimalInt =[];
            let reminder = [];
            let numeruTrunc = number.join('');
            while(Math.trunc(numeruTrunc) !== 0){
                let numero = numeruTrunc / ty;
                reminder.push(numeruTrunc%ty);
                tb.innerHTML += `<tr><td>${numeruTrunc} / ${ty}</td> <td>${numero}</td> <td>${reminder[reminder.length-1]}</td></tr>`;
                  numeruTrunc = Math.trunc(numero);
                 decimalInt.push(numeruTrunc);
            }
            if(tr === 'hexadecimal'){
             let hexed = '' ;
             for(let d=0;d<reminder.length;d++){
                if(alphaHex.includes(reminder[d])){
                    hexed +=  aplha[alphaHex.indexOf(reminder[d])]
                }else{
                    hexed +=reminder[d];
                }
             }
             return hexed.split('').reverse().join('');
            }else{
                return reminder.reverse().join('');
            }
        }
    }
   
    /////////////////////////////////////////
    
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function decimal(number,ty,tr,convertionType){
    ///////////////////////////////////////////
    if(convertionType === 'any'){
        let i = (number.length-number.length+1)*-1;
        let final = 0;
        if(tr !== 'hexadecimal'){
            number.forEach(el => {
                el = parseInt(el);
               final += el*Math.pow(ty,i);
               steps.innerHTML += `${el} x ${ty}<sup>${i}</sup> + `
                i--
            });
        }else{
            final = hexad(number,ty,i,'any')
        }
        return final;
    ///////////////////////////////////////////
    }else if(convertionType === 'decimal'){
        if(tr === 'Binary'){
            let inc = 0;
            let decimalInt =['.'];
            let numeruTrunc = (number.join(''))/(number.length*Math.pow(10,number.length)/number.length);
            let cond = true;
            while(cond){
                let numero = numeruTrunc * ty;
                if(Math.trunc(numero) != 0){
                    decimalInt.push(1);
                }else{
                    decimalInt.push(0);
                }
                tbdecimal.innerHTML += `<tr><td>${numeruTrunc} x ${ty}</td> <td>${numero}</td> <td>${decimalInt[decimalInt.length-1]}</td></tr>`;
                let arr = numero.toString().match(/\./g);
                if(arr != null){
                    numeruTrunc = numero.toString().split('.')[1].split('');
                    numeruTrunc = (parseInt(numeruTrunc.join('')))/(numeruTrunc.length*Math.pow(10,numeruTrunc.length)/numeruTrunc.length);
                }else{
                    cond = false;
                }
                inc++;
                if(inc>20){
                    break;
                }
            }
            return decimalInt.join('');
        }else{
            let inc = 0;
            let decimalInt =['.'];
            let numeruTrunc = (number.join(''))/(number.length*Math.pow(10,number.length)/number.length);
            let cond = true;
            while(cond){
                let numero = numeruTrunc * ty;
                decimalInt.push(Math.trunc(numero));
                tbdecimal.innerHTML += `<tr><td>${numeruTrunc} x ${ty}</td> <td>${numero}</td> <td>${decimalInt[decimalInt.length-1]}</td></tr>`;
                let arr = numero.toString().match(/\./g);
                if(arr != null){
                    numeruTrunc = numero.toString().split('.')[1].split('');
                    numeruTrunc = (parseInt(numeruTrunc.join('')))/(numeruTrunc.length*Math.pow(10,numeruTrunc.length)/numeruTrunc.length);
                }else{
                    cond = false;
                }
                inc++;
                if(inc>20){
                    break;
                }
            }
            if(tr == 'hexadecimal'){
             let hexed = '' ;
             for(let d=0;d<decimalInt.length;d++){
                if(alphaHex.includes(decimalInt[d])){
                    hexed +=  aplha[alphaHex.indexOf(decimalInt[d])]
                }else{
                    hexed +=decimalInt[d];
                }
             }
             return hexed
            }else{
                return decimalInt.join('');
            }
        }
    }
    
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function hexad(number,ty,i,convertionType,real){
    let num = 0;
    let hexAlpha;
    ///////////////////////////////////////////
    if(convertionType === 'any'){
        for(let c =0; c<number.length;c++,i--){
            if(aplha.includes(number[c])){
              hexAlpha = alphaHex[aplha.indexOf(number[c])]
              num += hexAlpha*Math.pow(ty,i);
            }else{
                num += number[c]*Math.pow(ty,i);
            }
            steps.innerHTML += `${number[c]}x${ty}<sup>${i}</sup> + `
        }
    ///////////////////////////////////////////
    }
return num;
}