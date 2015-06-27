
var hashcuenta = {name:"", id:"", balance:"", type:"", transaction:[]};
var Arraycuenta=[];
var nextcuenta=1;

function validateAccount(number){
  var accountRegex = /^[0-9]{0,9}$/;
  return accountRegex.test(number)
}

function validateAmount(amount){
  var amountRegex = /^[0-9]{1,6}$/;
  return amountRegex.test(amount)
}

function disabledbuttonM(){
  $("button#mostraredocuenta").attr("disabled", "disabled");
}
function abledbuttonM(){
  $("button#mostraredocuenta").removeAttr("disabled")
}

function disabledbuttonG(){
  $("button#guardar").attr("disabled", "disabled");
}
function abledbuttonG(){
  $("button#guardar").removeAttr("disabled")
}


function disabledbuttonE(){
  $("button#enviarTransaccion").attr("disabled", "disabled");
}
function abledbuttonE(id){
  $("button#enviarTransaccion").removeAttr("disabled")
}

function validateAll(amount,account){
  if (validateAmount(amount) === true && validateAccount(account) === true){
    abledbuttonE();
  } else {
    disabledbuttonE()
  }
}

function validateC(account){
  //if (validateAccount(account) === true){
    abledbuttonG();
  //} else {
  //  disabledbuttonG()
//  }
}

function validateM(account){
  if (validateAccount(account) === true){
    abledbuttonM();
  } else {
    disabledbuttonM()
  }
}

$(document).ready(function(){

  $("form").hide();

function Cuenta (hash) {
  this.name = hash.name;
  this.id = hash.id;
  this.balance = hash.balance;
  this.type = hash.type;
  this.transaction = [];
}


function Transaction (hash){
  this.amount = hash.amount;
  this.tipotrans = hash.tipotrans;
  this.medio = hash.medio;
  this.moneda = hash.moneda;
}

function Busqueinserte(num,transaccion) {
  for(i=0; i< Arraycuenta.length; i++) {

    if (Arraycuenta[i].id === parseInt(num)) {
      Arraycuenta[i].transaction.push(transaccion);
      $("div#Ok").show();
      $("div#Ok").html("Transaccion creada satisfactoriamente");
      $("div#Ok").fadeOut(5000);
      $("input").val("");


//      console.log("Ingresado");
      } else {
      console.log("No fue posible grabar la transaccion")
      }
    }
  }

function Busquemuestre(num){
  //debugger;
  var sumQ=0;
  var sumUSD=0;

    Arraycuenta.forEach(function(cuenta){
      if (cuenta.id === parseInt(num)){

        $("#msgnombrecuenta").html("Nombre de la Cuenta:" + cuenta.name)

        for ( i=0; i < cuenta.transaction.length; i++){
          if(cuenta.transaction[i].moneda === "Quetzal" && cuenta.transaction[i].tipotrans === "Debito"){
            $("tbody").append("<tr><td>"+cuenta.transaction[i].tipotrans + "</td><td>" + cuenta.transaction[i].moneda + "</td><td>" + cuenta.transaction[i].medio + "</td><td> <font color='red'> Q. -" + cuenta.transaction[i].amount + "</font></td><td></td></tr>")
            sumQ = parseInt(sumQ) - parseInt(cuenta.transaction[i].amount);
          } else if (cuenta.transaction[i].moneda === "Quetzal" && cuenta.transaction[i].tipotrans === "Credito"){
              $("tbody").append("<tr><td>"+cuenta.transaction[i].tipotrans + "</td><td>" + cuenta.transaction[i].moneda + "</td><td>" + cuenta.transaction[i].medio + "</td><td> Q. " + cuenta.transaction[i].amount + "</td><td></td></tr>")
            sumQ = parseInt(sumQ) + parseInt(cuenta.transaction[i].amount);
          } else if (cuenta.transaction[i].moneda === "Dolar" && cuenta.transaction[i].tipotrans === "Debito"){
            $("tbody").append("<tr><td>"+cuenta.transaction[i].tipotrans + "</td><td>" + cuenta.transaction[i].moneda + "</td><td>" + cuenta.transaction[i].medio + "</td><td></td><td><font color='red'> $. -" + cuenta.transaction[i].amount + "</font></td></tr>")
            sumUSD = parseInt(sumUSD) - parseInt(cuenta.transaction[i].amount);
          } else if (cuenta.transaction[i].moneda === "Dolar" && cuenta.transaction[i].tipotrans === "Credito"){
              $("tbody").append("<tr><td>"+cuenta.transaction[i].tipotrans + "</td><td>" + cuenta.transaction[i].moneda + "</td><td>" + cuenta.transaction[i].medio + "</td><td></td><td> $. " + cuenta.transaction[i].amount + "</td></tr>")
            sumUSD = parseInt(sumUSD) + parseInt(cuenta.transaction[i].amount);
          }
        }

        $("tbody").append("<tr><td></td><td></td><td><b>GRAN TOTAL</b></td><td><b>Q: " + sumQ + "</b></td><td><b>$: " + sumUSD + "</b></td></tr>")


      } else {
      //  alert("No existe numero de cuenta en el registro")
      }
    })
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  $("button#newaccount").on("click", function() {
    $("form#transactionForm").hide();
    $("form#muestraedocuenta").hide();
    $("form#cuentaNueva").show();
    disabledbuttonG();
    $("form#cuentaNueva").on("keyup", "input", function(){
      var inputs = {account: $("input#numberform").val()}
      validateC(inputs.account);
    })
  })

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------


  $("button#guardar").on("click",function(event){
    event.preventDefault();
    hashcuenta = {name:$("input#nameform").val(), id:nextcuenta, balance:$("input#saldoform").val(), type:$("select#tipoform").val(), transaction:[]}

    var cuentaNueva = new Cuenta (hashcuenta)
    Arraycuenta.push(cuentaNueva);
    $("span").show();
    $("span").html("Su numero de cuenta es:  " + nextcuenta);
    $("span").fadeOut(5000);
    $("input").val("");
      nextcuenta = nextcuenta + 1;
  })

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  $("button#transaction").on("click", function(){

      $("div#Ok").hide();
    $("form#cuentaNueva").hide();
    $("form#transactionForm").show();
    $("form#muestraedocuenta").hide();
    disabledbuttonE();
    $("form#transactionForm").on("keyup", "input", function(){
      var inputs = {account: $("input#cuentaTransaccion").val(),amount: $("input#amounttransaction").val()}
      validateAll(inputs.amount,inputs.account);
      })
})

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

$("button#enviarTransaccion").on("click", function(event){
  event.preventDefault();

    var numcuenta = $("#cuentaTransaccion").val();
    hashtransaccion = {amount:$("input#amounttransaction").val(), medio: $("select#medio").val(), tipotrans: $("select#tipotransaction").val(), moneda: $("select#moneda").val()}
    //debugger;
    var nuevaTransaccion = new Transaction (hashtransaccion);
    Busqueinserte(numcuenta, nuevaTransaccion)

  })

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  $("button#edocuenta").on("click", function(event){
    event.preventDefault();
    $("#msgnombrecuenta").html("")
    $("form#muestraedocuenta").show();
    $("form#cuentaNueva").hide();
    $("form#transactionForm").hide();
    disabledbuttonM();
    $("form#muestraedocuenta").on("keyup", "input", function(){
      var inputs = {account: $("input#ingresenumcuenta").val()}
      validateM(inputs.account);
    })
  })

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  $("button#mostraredocuenta").on("click", function(event){
    event.preventDefault();
    //debugger;
    var num = $("input#ingresenumcuenta").val();
    Busquemuestre(num);
  })



})
