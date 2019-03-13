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
var businessesArray = [
  new Business('1st and Pike', 23, 65, 6.3),
  new Business('SeaTac Airport', 3, 24, 1.2),
  new Business('Seattle Center', 11, 38, 3.7),
  new Business('Capitol Hill', 20, 38, 2.3),
  new Business('Alki', 23, 65, 6.3)
]; 

//Create constructor function
function Business(location, min, max, avgCookie) {
  this.location = location;
  this.minNumCustomers = min;
  this.maxNumCustomers = max;
  this.avgCookiePerCustomer = avgCookie;

  this.numCustomersArray = [];
  this.avgSalesPerHour = [];
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

//This method will solve for everything
Business.prototype.calcEverything = function(){
  // console.log(`${this.location} Results`);
  for(var i = 0; i < hoursOfOperation.length; i++){
    this.numCustomersArray.push(this.numCustomers());
    this.avgSalesPerHour.push(this.avgSales(i));
    // console.log(`${hoursOfOperation[i]}: ${this.avgSalesPerHour[i]} cookies`);

  }
  // console.log(`Total Cookies: ${this.totalSales()}`);
};

//This function will calculate & store the results from hourly totals in an array
var hourlyTotalArray;
function totalPerHour() {
  hourlyTotalArray = [];
  //this loop will store the result of each hour, for 14 hours
  for(var n = 0; n < hoursOfOperation.length; n++){
    var sum = 0;
    //this loop will add up the cookies at each hour
    for(var i in businessesArray){
      sum = sum + businessesArray[i].avgSalesPerHour[n];
    }
    hourlyTotalArray.push(sum);
  }
}

//Calculate daily total between all stores
function dailyTotal() {
  var dailyTotal = 0;
  for( var i in businessesArray){
    dailyTotal = dailyTotal + businessesArray[i].totalSales();
  }
  return dailyTotal;
}

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

//Reference a table element ("parent")
var tableEl = document.getElementById('salesTable');

//Header follows different format compared to the rest of the table
//This function will render the header
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
  total_td.textContent = 'Daily Total';
  header_tr.appendChild(total_td);
  tableEl.appendChild(header_tr);
}

//This method will add data ('td - child to row') to the rows ('tr - parent to data')
Business.prototype.addData = function(next_tr, location, totalSales) {
  var title_td = document.createElement('td');
  title_td.textContent = location;
  next_tr.appendChild(title_td);
  for(var m = 0; m < hoursOfOperation.length; m++){
    var next_td = document.createElement('td');
    next_td.textContent = this.avgSalesPerHour[m];
    next_tr.appendChild(next_td);
  }
  var sumCookies = document.createElement('td');
  sumCookies.textContent = totalSales;
  next_tr.appendChild(sumCookies);
};

// //This method will add rows ('tr - child to table') to the table ('salesTable') and render the information
Business.prototype.addRow = function() {
  var location = this.location;
  var sumCookies = this.totalSales();
  var next_tr = document.createElement('tr');
  this.addData(next_tr, location, sumCookies);
  tableEl.appendChild(next_tr);
};

//Footer follows different format compared to the rest of the table
//This function will render the footer
function buildFooter() {
  totalPerHour();
  var footer_tr = document.createElement('tr');
  var footer_td = document.createElement('td');
  footer_td.textContent = 'Total';
  footer_tr.appendChild(footer_td);
  for(var q = 0; q < hoursOfOperation.length; q++){
    var nextFooter_td = document.createElement('td');
    nextFooter_td.textContent = hourlyTotalArray[q];
    footer_tr.appendChild(nextFooter_td);
  }
  var dailyTotal_td = document.createElement('td');
  dailyTotal_td.textContent = dailyTotal();
  footer_tr.appendChild(dailyTotal_td);
  tableEl.appendChild(footer_tr);
}

//This function will build a table
function buildTable(){
  buildHeader();
  //this loop builds all the rows in between
  for(var p = 0; p < businessesArray.length; p++){
    businessesArray[p].addRow();
  }
  buildFooter();
}

/* Create a form to build a new location

Inputs:
1. Location name
2 Min # of customers
3. Max # of customers
4. Average cookies bought per customer

//Reference form
//Create function for event
  1.preventdefault
  2.collect user input: <event>.target.<name>.value
  3.use constuctor funtion to build new variable
//Add event listener

*/

//Reference form
var newBusinessForm = document.getElementById('buildNewStore');

function buildNewBusiness(event){
  event.preventDefault();

  //Collect user input
  var location = event.target.storeName.value;
  var min = event.target.minNumCust.value;
  var max = event.target.maxNumCust.value;
  var avg = event.target.avgPerCust.value;

  var newStore = new Business(location, min, max, avg);

  businessesArray.push(newStore);
  tableEl.innerHTML= '';
  newStore.calcEverything();
  buildTable();
}
newBusinessForm.addEventListener('submit', buildNewBusiness);

/* =========================Initialize Page============================================ */

//Calculate results from each businesses
// 1. Results from the following questions:
// 2. random # of customers
// 3. avg sales per hour based on random # of customers
for(var m = 0; m < businessesArray.length; m++){
  businessesArray[m].calcEverything();
}

//Build table & display on page
buildTable();