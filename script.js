document.addEventListener("DOMContentLoaded",function(){
    let buttons = document.querySelectorAll(".button");
    let miniDisplay = document.querySelector(".mini-display");
    let bigDisplay = document.querySelector(".big-display");
    let temp = "";
    let cuenta1; /*VARIABLES DONDE GUARDAREMOS AMBAS PARTES DE UNA CUENTA*/
    let oper;
    let cuenta2;
    let resultado;

    function limitarResultado(num) {
        return Number(num.toPrecision(8)); // Convertimos de vuelta a número
    }
    


    function display(variable){ /*FUNCION PARA MOSTRAR EN LA PANTALLA GRANDE */
        bigDisplay.innerHTML = variable;
        return;
    }

    function moveToMini(variable){/*FUNCION PARA MOSTRAR EN LA PANTALLA CHICA */
        

        miniDisplay.innerHTML = ''; // Limpiar antes de agregar el nuevo número

        let span = document.createElement('span');
        span.textContent = variable;
        miniDisplay.appendChild(span);

        // Pequeño retraso para activar la animación
        setTimeout(() => {
            span.classList.add('show');
        }, 10);

        return;
    }

    function clear(){ 
        display("");
        moveToMini("");
        cuenta1 = null;
        cuenta2=null;
        temp="";
        resultado=null;
    }

    function limpiezaPosOperacion(){
        cuenta1 = resultado;
        cuenta2 = null;
        oper = null;
        resultado = null;
        temp = "";

    }

    function operacion (cuenta1,cuenta2,oper){ /*FUNCION PARA OPERACIONES*/
        cuenta1 = Number(cuenta1);
        cuenta2 = Number(cuenta2);

        switch (oper) {
            case '+':
                return limitarResultado(cuenta1 + cuenta2);
            case '-':
                return limitarResultado(cuenta1 - cuenta2);
            case '*':
                return limitarResultado(cuenta1 * cuenta2);
            case '/':
                return cuenta2 !== 0 ? limitarResultado(cuenta1 / cuenta2) : "ERROR";
            default:
                return 'Operador no válido';
        }

    }
    

    buttons.forEach(button =>{
        button.addEventListener("click", function(){
            
            if(button.innerHTML == "C"){ /*CLEAR*/
                clear();
                return true;
            }

            if(button.innerHTML == "="){ /*IGUAL*/
                
                if(cuenta1!==null && oper && temp !== ""){
                    
                    resultado = operacion(cuenta1,temp,oper);
                    moveToMini(cuenta1 + oper + temp);
                    display(resultado);

                    limpiezaPosOperacion();
                }
                
                
                return true;
            }



            if(isNaN(button.innerHTML) && temp == "" && cuenta1==null){ /*AÑADIMOS DISPLAY ERROR SI SE INTENTA HACER CUENTAS SIN NUMEROS*/

                display("ERROR");
                temp = "";
                return true;

            } else if (isNaN(button.innerHTML) && temp !== "" && cuenta1==null){ /* SI HABIA NUMEROS SE AÑADE TEMP A CUENTA 1 Y SE MUESTRA CUENTA1 EN EL MINI DISPLAY*/

                cuenta1 = temp;
                moveToMini(temp);
                temp = "";
                oper=button.innerHTML;
                display(button.innerHTML);
                return true;

            }else if(isNaN(button.innerHTML) && temp == "" && cuenta1!==null && oper){

                return true;

            }else if (isNaN(button.innerHTML) && temp !== ""){ /*SI YA HABIA UN CUENTA 1, TEMP PASA A CUENTA 2, SE REALIZA LA OPERACION, EL RESULTADO A CUENTA 1, Y SE MUESTRA CUENTA 1 EN EL MINI*/

                cuenta2 = temp;
                resultado = operacion(cuenta1,cuenta2,oper);
                /*alert("CUENTA1: " + cuenta1 + " -----------CUENTA22 :  " + cuenta2 + "------OPER : " + oper + "TEMP :" + temp);*/
                moveToMini(resultado);
                display(button.innerHTML);
                limpiezaPosOperacion();
                oper=button.innerHTML;
                return true;
                
            }else if(isNaN(button.innerHTML) && temp == "" && cuenta1!==null && !oper){  /*DESPUES DE HACER UNA OPERACION TENEMOS RESULTADO COMO CUENTA1 Y TEMP VACIO, SI EN ESE MOMENTO SE CLICKEA UN OPERADOR, SE AÑADE COMO OPER*/

                oper = button.innerHTML;
                moveToMini(cuenta1);
                display(button.innerHTML);
                return true;
                
            }

            else if(!isNaN(button.innerHTML) && temp == "" && cuenta1!==null && !oper){
                cuenta1 = null;
                temp += button.innerHTML;
                display(temp);
                return true;
            }
            

            

            if (temp.length >= 8){ /*NO PERMITIMOS MAS DE 8 NUMEROS EN PANTALLA*/

                if (isNaN(button.innerHTML)){ /*PERO PERMITIMOS HACER CUENTAS CON 8 NUMEROS*/
                    temp += button.innerHTML;
                    bigDisplay.innerHTML=temp;
                }

                return true;
            }

            
            
            temp += button.innerHTML;
            display(temp);

        });
    });
});