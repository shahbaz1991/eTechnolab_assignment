//Getting the Input element with its respective id's
const n=document.getElementById('name');
var e=document.getElementById('email');
const m=document.getElementById('mobile');
var ad=document.getElementById('address');
var mg=document.getElementById('message');
var r=document.querySelectorAll("input[type='radio']");

// Adding Focus event corresponding to click_funt and passing the required element
n.addEventListener("focus",()=>click_funt(n));
e.addEventListener("focus",()=>click_funt(e));
m.addEventListener("focus",()=>click_funt(m));
ad.addEventListener("focus",()=>click_funt(ad));
mg.addEventListener("focus",()=>click_funt(mg));

// Adding Focusout event corresponding to focus_funt and passing the required element
n.addEventListener("focusout",()=>focus_funt(n));
e.addEventListener("focusout",()=>focus_funt(e));
m.addEventListener("focusout",()=>focus_funt(m));
ad.addEventListener("focusout",()=>focus_funt(ad));
mg.addEventListener("focusout",()=>focus_funt(mg));

// Adding the Click event to the radio button inputs
for(var i=0;i<r.length;i++){
    r[i].addEventListener('click',()=>rd(r));
}

// Function gives an error if any one of the radio buttons is not clicked
function rd(nm){
    if(nm[0].checked){
        var p=nm[0].parentElement.parentElement;
        p.style.border='1px solid gray';
        var sib=nm[0].parentElement.nextElementSibling.nextElementSibling.nextElementSibling;
        sib.className='';
        sib.innerHTML='';
    }
    else if(nm[1].checked){
        var p=nm[1].parentElement.parentElement;
        p.style.border='1px solid gray';
        var sib=nm[1].parentElement.nextElementSibling;
        sib.className='';
        sib.innerHTML='';
    }
    else{
        var p=nm[0].parentElement.parentElement;
        p.style.border='1px solid gray';
        var sib=nm[0].parentElement.nextElementSibling.nextElementSibling.nextElementSibling;
        sib.className='error_msg';
        sib.innerHTML='This is Required';
    }
}

function click_funt(nn){
    // changing the border when clicked 
    if (nn.value==='' && nn.style.borderBottom==='1px solid red'){
        nn.style.borderBottom='1.5px solid red';  
    }

    //validation of name while typing
    else if(nn===document.getElementById('name')){
        if (nn.style.borderBottom==''){
            nn.style.borderBottom='1.5px solid purple';
        }
        // checking every key to escaping the charecters other than alphabets
        // as name do not contain any special characters
        nn.addEventListener('keypress',function(e){
            if (!(e.keyCode>=65 && e.keyCode<91) || !(e.keyCode>=97 && e.keyCode<123) || !(e.keyCode===32)){
                nn.addEventListener("keyup",function(){
                    nn.value=nn.value.replace(/[^a-z\s]/gi,"");             
                })
            }
            // calling the valid fnction to validate the field
            valid(nn);
        })
    }

     //validation of email id while typing
     else if (nn===document.getElementById('email')){
        if (nn.style.borderBottom==''){
            nn.style.borderBottom='1.5px solid purple';
        }        
        // comparing the field value with the regular expression through 'test' method
        nn.addEventListener('keypress',function(e){
            const regx=/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/    
            valid(nn);
            nn.nextElementSibling.innerHTML=''; 
            if(regx.test(nn.value)){
                valid(nn);
                
            }
        })        
    }

    //validation of mobile number while typing
    else if (nn===document.getElementById('mobile')){
        if (nn.style.borderBottom==''){
            nn.style.borderBottom='1.5px solid purple';
        }       
        // escaping the characters other then digits 0-9
        nn.addEventListener('keypress',function(e){
            if(!(e.keyCode>=48 && e.keyCode<=57)){
                nn.addEventListener("keyup",function(){
                    nn.value=nn.value.replace(/[^\d]/g,"");       
                })
            }
            valid(nn);
            nn.nextElementSibling.innerHTML='';
        })       
    }

    //validation of address while typing
    else if(nn===document.getElementById('address')){
        if (nn.style.borderBottom==''){
            nn.style.borderBottom='1.5px solid purple';
        }
        // excaping characters other than alphabets digits and a few special characters
        nn.addEventListener('keypress',function(e){
            if (!(e.keyCode>=65 && e.keyCode<91) || !(e.keyCode>=48 && e.keyCode<=57) || !(e.keyCode>=97 && e.keyCode<123) || !(e.keyCode===32)||!(e.keyCode>=44 && e.keyCode<=46)||!(e.keyCode===39)){
                nn.addEventListener("keyup",function(){
                    nn.value=nn.value.replace(/[^A-Za-z0-9'\.\-\s\,]/g,""); 
                    valid(nn);
                    nn.nextElementSibling.innerHTML='';            
                })
            }
        })
    }
    // validation of message while typing
    else if(nn===document.getElementById('message')){
        if (nn.style.borderBottom==''){
            nn.style.borderBottom='1.5px solid purple';
        }
        // message can be any thing so only spaces more than once is escaped
        nn.addEventListener('keypress',function(e){
            if (!(e.keyCode===32)){
                nn.addEventListener("keyup",function(){
                nn.value=nn.value.replace(/\s{2,}/g,"");
                })
            }
            valid(nn);
            nn.nextElementSibling.innerHTML='';    

        })        
    }
}

function focus_funt(nm){
    // if the field is blank when focused outside then not_valid function is called 
    // and borders colors are changed 
    if (nm.value ===''){
        not_valid(nm);
        var err=nm.nextElementSibling;        
        err.innerHTML='This is required'; 
    }

    // checking name field when focused outside
    else if (nm===n && nm!=''){
        //only 2 letters not allowed
        if(nm.value.trim().length<=2){
            not_valid(nm);
            var err=nm.nextElementSibling;        
            err.innerHTML='Not Valid'; 
        }
        else{
            // if each word is more than 16 letters then error is displayed
            let array_name=nm.value.trim().split(' ');
            array_name.forEach(i => {
                if(i.length>=16){
                    not_valid(nm);
                    var err=nm.nextElementSibling;        
                    err.innerHTML='Not Valid'; 
                }
            });
        }
    }

    // checking email-id field when focused outside
    else if(nm===e && nm != ''){
        // varifying with the regular expression inside valid_email function
        if(!valid_email(nm)){
            not_valid(nm);
            var err=nm.nextElementSibling;
            err.innerHTML='Not a Valid E-mail';            
        }
        else{
            valid(nm);
        }
    }

    // / checking mobile number when focused outside
    else if(nm===m && nm!=''){
        const exp=/[0-9{10}]/;
        // if length is less than 10 digits error is shown
        if(nm.value.length!=Number(10)){
            not_valid(nm);
            nm.nextElementSibling.innerHTML='10 digits required';
        }
        // checking wih the regular expression for only digits
        else if (!(exp.test(nm.value))){
                not_valid(nm);
                var err=nm.nextElementSibling;
                err.innerHTML='Not a Valid number';
        }
        else{
            valid(nm);
        }
    }

    /// checking message field when focused outside
    else if (nm===mg && nm!=''){
        // if only one word then error is shown        
        if(nm.value.trim().length===Number(1)){
            not_valid(nm);
            nm.nextElementSibling.innerHTML='Not valid';        
        }
        else{
            valid(nm);
        }
    }
    // checking address field when focused outside
    else if (nm===ad && nm!=''){
        // if length of the address field is less than 15 then error is shown
        if(nm.value.length<=Number(15) ){
            console.log(nm.value.length);
            not_valid(nm);
            nm.nextElementSibling.innerHTML='Not a Valid Address';     
        }
        else{
            valid(nm);
        }
    }
}

//validation email-id with regular expression if a match returns true
function valid_email(email){
    const regx=/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/    
    if(regx.test(email.value)){
        valid(email);
        return true;       
    }
    else{
        return false;
    }
}

// This function changes the border color and input border color to red if the field is invalid or blank
function not_valid(nm){
    var p=nm.parentElement;
        p.style.border='1px solid red';
        nm.style.borderBottom='1px solid red';
        var err=nm.nextElementSibling;
        err.className='error_msg';
}
// This function removes the border color and input border color and marks the field as valid
function valid(nm){
    nm.style.borderBottom='1px solid gray';
    var p=nm.parentElement;
    p.style.border='1px solid gray';
    nm.style.borderTop='none';
    nm.style.borderLeft='none';
    nm.style.borderRight='none';
    var err=nm.nextElementSibling;
    err.className='valid';
    err.innerHTML='Valid';  
}

// Here the height of the textarea is adjusted acording to the input value
mg.addEventListener('input',resize);
function resize(){
    this.style.height='auto';
    this.style.height=this.scrollHeight + 'px';
}

// form element targeted and Submit event id called
document.getElementById('form'),addEventListener('submit',sub);

//changing the background color of submit btton on click
document.getElementById('submit').addEventListener('click',function(){
    this.style.backgroundColor='#06bdf5';
})

function sub(e){
    // here we are selecting the p tag as its the only tag which shows error messages
    var p_tag=document.querySelectorAll(".ele p");
    var arr=[];                                                  //array for storing the fields which shows error
    var gen;                                                     // variable for storing radio field
    p_tag.forEach(i=>{
        if(i.innerHTML!='Valid'){                               //checking which is field is not valid
            if(i.previousElementSibling.className!='gender'){   // checking all the fields except the radio field
                arr.push(i.previousElementSibling);             // adding it into the array
            }
            // else if(!(i.previousElementSibling.firstElementChild.checked) && !(i.previousElementSibling.previousElementSibling.firstElementChild.checked) ){
            //     i.className='error_msg';                        //changing the p element class error
            //     i.innerHTML='This is Required';                 // changing the innertext
            //     i.parentElement.style.border='1px solid red';   //changing out border of the radio field
            // }
        }
    })
    if(!(r[0].checked) && !(r[1].checked)){                                    // checking if radio buttons are clicked 
        r[0].parentElement.parentElement.style.border='1px solid red';          
        r[1].parentElement.nextElementSibling.innerHTML='This is required';
        r[1].parentElement.nextElementSibling.className='error_msg';
        e.preventDefault();
    }
    if(arr.length!=0){                                     // loops through the array till its empty
        arr[0].focus();                                         // focuses the first element with error
        arr.forEach(i=>{                                        // looping through the array
            click_funt(i);                                      // calling the click_function to provide the 'click' event
            not_valid(i) ;                                      // not_valid function is called to change the border color to red
            var sib=i.nextElementSibling;                       // targeting thr p element coressponding to the input tag 
            sib.className='error_msg';                          // adding error class to p element
            if(sib.innerHTML===''){                             // checking if there is any inner text in p element
                sib.innerHTML='This is Required';               // changing the inner text of p element
            }
        })
        e.preventDefault();
    } 
}
