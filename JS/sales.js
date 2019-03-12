'use strict';

/*
Create an object for each location
Input information about that store

KVPs
    1. Location
    2. MinCust/hr
    3. MaxCust/hr
    4. Avg Cookie/Cust

Methods
    1. Calculate random number of customers
    2. Calculate average sales per hour
    3. Calculate total sales per day
    4. List details in an ordered manner
    5. Render results onto webpage

*/

//This function calculates a random number
//Copied from MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Global variable
var hoursOfOperation = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

//Create constructor function
function Business(location, min, max, avgCookie, hours, numCustomers, avgSales) {
  this.location = location;
  this.minNumCustomers = min;
  this.maxNumCustomers = max;
  this.avgCookiePerCustomer = avgCookie;
  this.hoursOfOperation = hours;
  this.numCustomersArray = numCustomers;
  this.avgSalesPerHour = avgSales;
}

//Create methods for constructors
//This method will calculate random number of customers per hour
Business.prototype.numCustomers = function(){
  var randomNumCustomers = getRandomIntInclusive(this.minNumCustomers, this.maxNumCustomers);
  // console.log('random number is: ' + randomNumCustomers);
  return randomNumCustomers;
};

//This method will calculate avg sales per hours
//avgSalesPerHour = avgCookiePerCustomer * numCustomersArray[i]
Business.prototype.avgSales = function(index){
  var avgCookiesPerCustomerPerHour = Math.floor(this.avgCookiePerCustomer * this.numCustomersArray[index]);
  return avgCookiesPerCustomerPerHour;
};

//This method will calculate total # cookies
Business.prototype.totalSales = function(){
  var totalCookies = 0;
  for(var j = 0; j < this.avgSalesPerHour.length; j++){
    totalCookies = totalCookies + this.avgSalesPerHour[j];
  }
  return totalCookies;
};

//This method will create a list for everything
Business.prototype.listEverything = function(){
  console.log(`${this.location} Results`);
  for(var i = 0; i < this.hoursOfOperation.length; i++){
    this.numCustomersArray.push(this.numCustomers());
    this.avgSalesPerHour.push(this.avgSales(i));
    console.log(`${this.hoursOfOperation[i]}: ${this.avgSalesPerHour[i]} cookies`);

  }
  // console.log('Total Cookies: ' + this.totalSales());
  console.log(`Total Cookies: ${this.totalSales()}`);
};

/*
Render information about 1st store onto webpage

1. get the parent
2. make new element
3. give it information
4. render onto page

Display as unordered list. Example:

1st and Pike
-6AM: 16 cookies
-7AM: 20 cookies
-8AM: 35 cookies

Use template literals to render JS to webpage

*/

// //This method will render everything as a list
// Business.prototype.render = function(id){
//   var nextUl = document.getElementById(id);
//   var titleLi = document.createElement('ul');
//   titleLi.textContent = this.location;
//   nextUl.appendChild(titleLi);

//   for(var k = 0; k < this.hoursOfOperation.length; k++){
//     var nextLi = document.createElement('li');
//     var avgCookies = this.avgSalesPerHour[k];
//     var time = this.hoursOfOperation[k];
//     nextLi.textContent = `${this.hoursOfOperation[k]}: ${this.avgSalesPerHour[k]} cookies`;

//     nextUl.appendChild(nextLi);
//   }
//   var totalLi = document.createElement('li');
//   totalLi.textContent = `Total Cookies: ${this.totalSales()}`;
//   nextUl.appendChild(totalLi);
// };


//Initialize Page
var pike = new Business('1st and Pike', 23, 65, 6.3, hoursOfOperation, [], []);
pike.listEverything();
// pike.render('pike');

var seatacAirport = new Business('SeaTac Airport', 3, 24, 1.2, hoursOfOperation, [], []);
seatacAirport.listEverything();
// seatacAirport.render('seatacAirport');

var seattleCenter = new Business('Seattle Center', 11, 38, 3.7, hoursOfOperation, [], []);
seattleCenter.listEverything();
// seattleCenter.render('seattleCenter');

var capHill = new Business('Capitol Hill', 20, 38, 2.3, hoursOfOperation, [], []);
capHill.listEverything();
// capHill.render('capHill');

var alki = new Business('Alki', 23, 65, 6.3, hoursOfOperation, [], []);
alki.listEverything();
// alki.render('alki');



/*

MAKING A TABLE 
<table>
  <tr>
    <td></td>
    <td></td>
    .
    .
    .
  </tr>
</table>

Make a table following the format below. Example:

        6AM   7AM   8AM
Pike    10    30    1000
SeaTac  14    47    2

*/

//Create a table element ("parent")
var tableEl = document.getElementById('salesTable');

//Header follows different format compared to the rest of the table
//This code will render the header
function buildHeader() {
  var header_tr = document.createElement('tr');
  var blankSpace = document.createElement('td');
  blankSpace.textContent = '';
  header_tr.appendChild(blankSpace);
  for(var l = 0; l < hoursOfOperation.length; l++){
    var nextHeader_td = document.createElement('td');
    nextHeader_td.textContent = hoursOfOperation[l];
    header_tr.appendChild(nextHeader_td);
  }
  var total_td = document.createElement('td');
  total_td.textContent = 'Daily Location Total';
  header_tr.appendChild(total_td);
  tableEl.appendChild(header_tr);
}


//This method will add data ('td') to the rows ('tr')
Business.prototype.addData = function(next_tr, location, totalSales) {
  var title_td = document.createElement('td');
  title_td.textContent = location;
  next_tr.appendChild(title_td);
  for(var m = 0; m < this.hoursOfOperation.length; m++){
    var next_td = document.createElement('td');
    next_td.textContent = this.avgSalesPerHour[m];
    next_tr.appendChild(next_td);
  }
  var sumCookies = document.createElement('td');
  sumCookies.textContent = totalSales;
  next_tr.appendChild(sumCookies);
};

// //This method will add rows ('tr') to the table ('salesTable') and render the information
Business.prototype.addRow = function() {
  var location = this.location;
  var sumCookies = this.totalSales();
  var next_tr = document.createElement('tr');
  this.addData(next_tr, location, sumCookies);
  tableEl.appendChild(next_tr);
};

buildHeader();
pike.addRow();
seatacAirport.addRow();
seattleCenter.addRow();
capHill.addRow();
alki.addRow();



