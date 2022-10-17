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

let aplha = ['A','B','C','D','E','F','G','H','I','J','K','L','M',"N",'O',"p",'Q','R','S','T','U','V','W','X','Y','Z']
let alphaHex = [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34];

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
        selectInp.innerHTML += `<option value="${val}">${val}</option>`
        selectInpConvt.innerHTML += `<option value="${val}">${val}</option>`
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

    selectInp.addEventListener('change',()=>{
        if(selectInp.value === 'Binary' ) {
            inp.setAttribute('max','1');
        }
        else if(selectInp.value === 'hexadecimal'){
            inp.setAttribute('type','text')
            inp.setAttribute('max','')
        }else{
            inp.setAttribute('max','')
            inp.setAttribute('type','number')
        }
        type.inpEntered = selectInp.value;
        convertion()
    })
    
    selectInpConvt.addEventListener('change',()=>{
        type.inpConvert = selectInpConvt.value;
        convertion()
    }) 


function convertion(){
    tbdecimal.innerHTML='';
    tb.innerHTML = '';
    steps.innerHTML= '';
    let res ;//res for result
//////////////////////////////////////////////
if(type.inpConvert === 'Decimal'){
    if(type.inpEntered === 'Decimal'){
        res = theConvertion(inpVla,10,'Decimal','any');
    }else if(type.inpEntered === 'Binary'){
        let cond = [];
       for(let i =0;i<inpVla.length;i++){
        if((inpVla[i] > 1 || inpVla[i]<-1)){cond.push('err');}
       }
      cond.length === 0 ? res = theConvertion(inpVla,2,'Binary','any') : res = "Enter Binary Number";
    }else if(type.inpEntered === 'octal'){
        res =theConvertion(inpVla,8,'octal','any');
    }else if(type.inpEntered === 'hexadecimal'){
        res = theConvertion(inpVla,16,'hexadecimal','any')
    }else{
        res = theConvertion(inpVla,type.inpEntered,type.inpEntered,'any')
    }
}else
//////////////////////////////////////////////
if(type.inpEntered === 'Decimal'){
    if(type.inpConvert === 'Decimal'){
        res = theConvertion(inpVla,10,'Decimal','decimal');
    }else if(type.inpConvert === 'Binary'){
        res = theConvertion(inpVla,2,'Binary','decimal')
    }else if(type.inpConvert === 'octal'){
        res = theConvertion(inpVla,8, 'octal','decimal');
    }else if(type.inpConvert === 'hexadecimal'){
        res = theConvertion(inpVla,16,'hexadecimal','decimal')
    }else{
        res = theConvertion(inpVla,type.inpConvert,type.inpConvert,'decimal')
    }
}else
//////////////////////////////////////////////
if(type.inpEntered === 'hexadecimal'){
  if(type.inpConvert === 'Binary'){
       let inpValPre = theConvertion(inpVla,16,'hexadecimal','any');
       res = theConvertion(inpValPre.toString(),2,'Binary','decimal');
    }else if(type.inpConvert === 'octal'){
        let inpValPre = theConvertion(inpVla,16,'hexadecimal','any')
        res =theConvertion(inpValPre.toString(),8,'octal','decimal');
    }else if(type.inpConvert === 'hexadecimal'){
        res = 'Conver to proper base'
    }else{
        let inpValPre = theConvertion(inpVla,16,'hexadecimal','any')
        res = theConvertion(inpValPre.toString(),type.inpConvert,type.inpConvert,'decimal')
    }
}else
//////////////////////////////////////////////
if(type.inpEntered === 'Binary'){
    if(type.inpConvert === 'Binary'){
        res = 'Conver to proper base'
      }else if(type.inpConvert === 'octal'){
          let inpValPre = theConvertion(inpVla,2,'Binary','any')
          res =theConvertion(inpValPre.toString(),8,'octal','decimal');
      }else if(type.inpConvert === 'hexadecimal'){
        let inpValPre = theConvertion(inpVla,2,'Binary','any');
        res = theConvertion(inpValPre.toString(),16,'hexadecimal','decimal');
      }else{
        let inpValPre = theConvertion(inpVla,2,'Binary','any');
        res = theConvertion(inpValPre.toString(),type.inpConvert,type.inpConvert,'decimal')
    }
  }else 
  //////////////////////////////////////////////
  if(type.inpEntered === 'octal'){
    if(type.inpConvert === 'Binary'){
        let inpValPre = theConvertion(inpVla,8,'octal','any')
        res =theConvertion(inpValPre.toString(),2,'Binary','decimal');
      }else if(type.inpConvert === 'octal'){
        res = 'Conver to proper base'
      }else if(type.inpConvert === 'hexadecimal'){
        let inpValPre = theConvertion(inpVla,8,'octal','any');
        res = theConvertion(inpValPre.toString(),16,'hexadecimal','decimal');
      }else{
        let inpValPre = theConvertion(inpVla,8,'octal','any');
        res = theConvertion(inpValPre.toString(),type.inpConvert,type.inpConvert,'decimal')
    }
  }else{
    if(type.inpConvert === 'Binary'){
        let inpValPre = theConvertion(inpVla,type.inpEntered,type.inpEntered,'any')
        res =theConvertion(inpValPre.toString(),2,'Binary','decimal');
      }else if(type.inpConvert === 'octal'){
        let inpValPre = theConvertion(inpVla,type.inpEntered,type.inpEntered,'any')
        res =theConvertion(inpValPre.toString(),8,'octal','decimal');
      }else if(type.inpConvert === 'hexadecimal'){
        let inpValPre = theConvertion(inpVla,type.inpEntered,type.inpEntered,'any')
        res = theConvertion(inpValPre.toString(),16,'hexadecimal','decimal');
      }else{
        let inpValPre = theConvertion(inpVla,type.inpEntered,type.inpEntered,'any')
        res = theConvertion(inpValPre.toString(),type.inpConvert,type.inpConvert,'decimal')
    }
  }
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