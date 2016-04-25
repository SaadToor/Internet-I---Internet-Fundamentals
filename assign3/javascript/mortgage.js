//********************************************************************************//
//* Name :                                                                       *//
//* zenit login : int222_161                                                     *//
//********************************************************************************//
//********************************************************************************//
//*   Do not modify any statements in detailPaymentCalculation function          *//
//********************************************************************************//

function detailPaymentCalculation(mortAmount, mortDownPayment, mortRate, mortAmortization) {

  //********************************************************************************//
  //*   This function calculates the monthly payment based on the following:       *//
  //*                                                                              *//
  //*               M = P [ i(1 + i)n ] / [ (1 +  i)n - 1]                         *//
  //*                                                                              *//
  //*   Note: This function also updates the payment amount on the form            *//
  //********************************************************************************//
  var paymentError = "";
  var v = mortAmount * 1;
  var d = mortDownPayment * 1;
  var i = mortRate * 1;
  var y = mortAmortization * 1;
  var a = v - d;
  i = i / 100 / 12;
  n = y * 12;
  var f = Math.pow((1 + i), n);

  var p = (a * ((i * f) / (f - 1))).toFixed(2);

  if (p == "NaN" || p == "Infinity") {
    document.forms[0].payment.value = "";
  }
  else {
    document.forms[0].payment.value = p;
  }

} // End of detailPaymentCalculation function

function calculatePayment() {

  //********************************************************************************//
  //*   You will need to call the functions that validate the following:           *//
  //********************************************************************************//
  //*        (1)              (2)              (3)             (4)                 *//
  //********************************************************************************//
  //*   Property value  -  Down payment  -  Interest rate -  Amortization          *//
  //********************************************************************************//
  //*   If there are no errors, then call                                          *//
  //*                                                                              *//
  //*      detailPaymentCalculation(...., ......, ......, ......);                 *//
  //*                                                                              *//
  //*   and make sure to pass the four values in the order shown above.            *//
  //*                                                                              *//
  //********************************************************************************//
  //*   If there are errors, present the client the following message in the       *//
  //*   reserved area on the form:                                                 *//
  //*                                                                              *//
  //*   Please complete the form first and then click on Calculate Monthly Payment *//
  //*                                                                              *//
  //********************************************************************************//

  var errorMessages = "";
  errorMessages = validatePropertyValue(errorMessages);
  errorMessages = validateDownPayment(errorMessages);
  errorMessages = validateInterestRate(errorMessages);
  errorMessages = validateAmortization(errorMessages);

  var propertyValue = document.mortgage.propValue.value;
  var downPayment = document.mortgage.downPay.value;
  var intRate = document.mortgage.intRate.value;
  var amortizationCalculation = document.mortgage.amortization.value;
  var monthlyPayment = document.mortgage.payment.value;

  if (errorMessages === "") {
    detailPaymentCalculation(propertyValue, downPayment, intRate, amortizationCalculation);

  }
  if (errorMessages !== "") {
    document.getElementById('errMessage').innerHTML = "<ol>Please complete the form first and then click on Calculate Monthly Payment.</ol>";
  }

} // End of calculatePayment function

function formValidation() {

  //***************************************************************************************//
  //*                                                                                     *//
  //* This function calls the different functions to validate all required fields         *//
  //*                                                                                     *//
  //* Once you have called and validated all field, determine if any error(s)             *//
  //*  have been encountered                                                              *//
  //*                                                                                     *//
  //* If any of the required fields are in error:                                         *//
  //*                                                                                     *//
  //*    present the client with a list of all the errors in reserved area                *//
  //*         on the form and                                                             *//
  //*          don't submit the form to the CGI program in order to allow the             *//
  //*          client to correct the fields in error                                      *//
  //*                                                                                     *//
  //*    Error messages should be meaningful and reflect the exact error condition.       *//
  //*                                                                                     *//
  //*    Make sure to return false                                                        *//
  //*                                                                                     *//
  //* Otherwise (if there are no errors)                                                  *//
  //*                                                                                     *//
  //*    Recalculate the monthly payment by calling                                       *//
  //*      detailPaymentCalculation(mortAmount,mortDownPayment,mortRate,mortAmortization) *//
  //*                                                                                     *//
  //*    Change the 1st. character in the field called client to upper case               *//
  //*                                                                                     *//
  //*    Change the initial value in the field called jsActive from N to Y                *//
  //*                                                                                     *//
  //*    Make sure to return true in order for the form to be submitted to the CGI        *//
  //*                                                                                     *//
  //***************************************************************************************//
  var errorMessages = "";

  errorMessages = validateIncomeValue(errorMessages);
  errorMessages = validatePropertyLocation(errorMessages);
  errorMessages = validatePropDetails(errorMessages);
  errorMessages = validateMortYear(errorMessages);
  errorMessages = validateMortMonth(errorMessages);
  errorMessages = validateInterestRate(errorMessages);
  errorMessages = validateAmortization(errorMessages);
  errorMessages = validatePropertyValue(errorMessages);
  errorMessages = validateDownPayment(errorMessages);
  errorMessages = validateUserID(errorMessages);
  errorMessages = validateUserName(errorMessages);



  if (errorMessages !== "") {
    showErrors(errorMessages);
    return false;
  }
  else {
    clearShowErrors();
    document.getElementById('jsActive').value = "Y";
    return true;
  }

}

function validateIncomeValue(errorMessages) {
  var selection = document.mortgage.income.selectedIndex;
  if (selection < 0) {
    errorMessages += "<p>Please select a Income Value.</p>";
  }
  return errorMessages;
}

function validatePropertyLocation(errorMessages) {
  var selection = document.mortgage.propLocation.selectedIndex;
  if (selection < 0) {
    errorMessages += "<p>Please select a Property Location.</p>";
  }
  return errorMessages;
}

function validatePropDetails(errorMessages) {
  var selection = false;
  for (var i = 0 ; i < document.mortgage.propDetails.length ; i++) {
    if (document.mortgage.propDetails[i].checked === true) {
      selection = document.mortgage.propDetails[i];
    }
  }
  if (selection === false) {
    errorMessages += "<p>Please select a Property Type.</p>";
  }
  return errorMessages;
}

function validateMortYear(errorMessages) {
  var myDate = new Date();
  var myYear = myDate.getFullYear();
  var length = document.mortgage.mortYear.value.length;
  var mortyear = document.mortgage.mortYear.value.trim();

  if (mortyear === "") {
    errorMessages += "<p>Please enter a Mortgage Year Value.</p>";
  }
  else {
    if (mortyear.charCodeAt(0) < 48 || mortyear.charCodeAt(0) > 57 || mortyear.charCodeAt(1) < 48 || mortyear.charCodeAt(1) > 57 || mortyear.charCodeAt(2) < 48 || mortyear.charCodeAt(2) > 57 || mortyear.charCodeAt(3) < 48 || mortyear.charCodeAt(3) > 57) {
      errorMessages += "<p>Please enter numbers for the year</p>";
    }
    else {
      mortyear = parseInt(mortyear, 10);
      if (mortyear > myYear + 1 || mortyear < myYear) {
        errorMessages += "<p>Please enter a Mortgage Year value within the current year.</p>";
      }
    }
  }
  return errorMessages;
}

function validateMortMonth(errorMessages) {
  var myDate = new Date();
  var myMonth = myDate.getMonth();
  var length = document.mortgage.mortMonth.value.length;
  var mortmonth = document.mortgage.mortMonth.value.trim();
  if (mortmonth === "") {
    errorMessages += "<p>Please enter a Mortgage Month.</p>";
  }
  else {
    if (mortmonth.charCodeAt(0) < 48 || mortmonth.charCodeAt(0) > 57 || mortmonth.charCodeAt(1) < 48 || mortmonth.charCodeAt(1) > 57) {
      errorMessages += "<p>Please enter numbers for the month</p>";
    }
    else {
      mortmonth = parseInt(mortmonth, 10);
      if (mortmonth > myMonth + 1 || mortmonth < myMonth) {
        errorMessages += "<p>Please enter a Mortgage Month value within the current Month.</p>";
      }
    }
  }
  return errorMessages;
}

function validateInterestRate(errorMessages) {
  var length = document.mortgage.intRate.value.length;
  var interestRate = document.mortgage.intRate.value.trim();
  var flag = new Boolean();

  if (interestRate === "") {
    errorMessages += "<p>Please enter a proper interest rate.</p>";
  } 
  else {
    interestRate = parseFloat(interestRate);
    if (isNaN(interestRate) === true) {
      errorMessages += "<p>Please enter numbers for the interest rate</p>";
    }
    else {
      if (interestRate > 16.000 || interestRate < 3.000) {
        errorMessages += "<p>Please enter between 3.000 to 16.000 interest rate</p>";
      }
    }
	
  }
  
  return errorMessages;
}

function validateAmortization(errorMessages) {
  var length = document.mortgage.amortization.value.length;
  var AmortizationVar = document.mortgage.amortization.value.trim();
  var one = AmortizationVar[0];
  var two = AmortizationVar[1];
  if (AmortizationVar === "") {
    errorMessages += "<p>Please enter a proper Amortization</p>";
  }
  else {
    one = parseInt(one, 10);
    two = parseInt(two, 10);
    if (isNaN(one) === true || isNaN(two) === true) {
      errorMessages += "<p>Please enter numbers for the Amortization</p>";
    }
    else {
      if (AmortizationVar > 20 || AmortizationVar < 5) {
        errorMessages += "<p>Please enter between 5 to 20 Amortization</p>";
      }
    }
  }
  return errorMessages;
}

function validatePropertyValue(errorMessages) {
  var PV = document.mortgage.propValue.value.trim();
  var length = document.mortgage.propValue.value.length;
  var DP = document.mortgage.downPay.value.trim();
  var one = PV[0];
  var two = PV[1];
  var three = PV[2];
  var four = PV[3];
  var five = PV[4];
  var six = PV[5];

  if (PV === "") {
    errorMessages += "<p>Please enter the Property Value.</p>";
  }
  else {
    if (isNaN(one) === true || isNaN(two) === true || isNaN(three) === true || isNaN(four) === true || isNaN(five) === true || isNaN(six) === true) {
      errorMessages += "<p>Please enter Numeric values for the Property Value.</p>";
    }
    else {
      PV = parseInt(PV, 10);
      DP = parseInt(DP, 10);
      if (PV < (DP + 65000)) {
        errorMessages += "<p>Your Property value has to higher!</p>";
      }
    }
  }
  return errorMessages;
}

function validateDownPayment(errorMessages) {
  var PV = document.mortgage.propValue.value.trim();
  var length = document.mortgage.downPay.value.length;
  var DP = document.mortgage.downPay.value.trim();
  var one = DP[0];
  var two = DP[1];
  var three = DP[2];
  var four = DP[3];
  var five = DP[4];
  var six = DP[5];

  if (DP === "") {
    errorMessages += "<p>Please enter the Down Payment.</p>";
  }
  else {
    if (isNaN(one) === true || isNaN(two) === true || isNaN(three) === true || isNaN(four) === true || isNaN(five) === true || isNaN(six) === true) {
      errorMessages += "<p>Please enter Numeric values for the Down Payment.</p>";
    }
    else {
      PV = parseInt(PV, 10);
      DP = parseInt(DP, 10);
      if (DP <= (PV * 0.20)) {
        errorMessages += "<p>Down Payment value has to be higher than 10% of Property Value!</p>";
      }
    }
  }
  return errorMessages;
}

function validateUserID(errorMessages) {
  var value = document.mortgage.userId.value;
  if (value.length != 10) {
    errorMessages += "<p>Please enter 10 positions in User ID</p>";
  }
  else {
    if (value[4] != "-") {
      errorMessages += "<p>User ID Position 5 must be a hyphen (-)</p>";
    }
    else {
      for (var i = 0; i < 4; i++) {
        if (isNaN(value[i])) {
          errorMessages += "<p>All positions left must be a number in User ID</p>";
          break;
        }
      }
      for (i = 5; i < 10; i++) {
        if (isNaN(value[i])) {
          errorMessages += "<p>All positions rigth must be a number in User ID</p>";
          break;
        }
      }
      var lowsum = 0;
      for (i = 0; i < 4; i++) {
        lowsum += parseInt(value[i],10);
      }
      if (lowsum <= 0) {
        errorMessages += "<p>User ID Sum of the first 4 numbers must be greater than 0</p>";
      }
      var highsum = 0;
      for (i = 5; i < 10; i++) {
        highsum += parseInt(value[i],10);
      }
      if (highsum <= 0) {
        errorMessages += "<p>User ID Sum of the last 5 numbers must be greater than 0</p>";
      }
      else {
        if (highsum != (lowsum * 2) + 2) {
          errorMessages += "<p>User ID sum of the last 5 numbers must be the double plus of of the first 4 numbers</p>";
        }
      }
    }
  }
  return errorMessages;
}


function validateUserName(errorMessages) {
  var client = document.mortgage.client.value.trim();

  var length = document.mortgage.client.value.length;
  client = client.toUpperCase();
  var first = client[0];
  var two = client[1];
  var three = client[2];
  var last = client[length - 1];
  var A = 0;
  var H = 0;
  if (client === "") {
    errorMessages += "<p>Please enter a User Name.";
  }
  else {
    if (client.length < 3) {
      errorMessages += "<p>Please enter a name that has at least 3 characters.</p>";
    }
    else {
      if (client.charCodeAt(first) < 65 || client.charCodeAt(first) > 90 || client.charCodeAt(two) < 65 || client.charCodeAt(two) > 90 || client.charCodeAt(three) < 65 || client.charCodeAt(three) > 90) {
        errorMessages += "<p>The first three characters must be Alphabetic.</p>";
      }
      else {
        if (client.charCodeAt(first) === 45 || client.charCodeAt(first) === 39 || client.charCodeAt(last) === 45 || client.charCodeAt(last) === 39) {
          errorMessages += "<p>Please do not enter a hyphen or apostrope at the beginning or end your name. </p>";
        }
        for (var b = 3; b < length; b++) {
          if (client.charCodeAt(b) == 45) {
            H += 1;
          }
        }
        for (var j = 3; j < length; j++) {
          if (client.charCodeAt(b) == 39) {
            A += 1;
          }
        }
        if (A > 1 || H > 1) {
          errorMessages += "<p> Please enter only one hyphen and apostrophe </p>";
        }
        else {
          if (A === 1 && H === 0 || A === 1 && H === 1 || A === 0 && H === 1 || A === 0 && H === 0) {
            for (g = 0; g < length; g++) {
              for (h = 1; h < length; h++) {
                if (name.charCodeAt(g) == 39 && name.charCodeAt(h) == 45 || name.charCodeAt(g) == 45 && name.charCodeAt(h) == 39) {
                  errorMessages += "<p> You cannot have a hyphen and apostrophe beside one another, please re-enter a valid name </p>";
                }
              }
            }
          }
        }
      }
    }
  }
  return errorMessages;
}











function showErrors(errorMessages) {
  errorMessages = "<ol>" + errorMessages + "</ol>";
  document.getElementById('errMessage').innerHTML = errorMessages;
}
function clearShowErrors() {
  document.getElementById('errMessage').innerHTML = " ";
  document.getElementById('errMessage').focus();
}
