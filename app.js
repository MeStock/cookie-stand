'use strict';

/*
Create an object for 1st location
Input information about that store

KVPs
    1. Location
    2. MinCust/hr
    3. MaxCust/hr
    4. Avg Cookie/Cust

Methods
    1. Calculate random number of customers
    2. Calc Sum

*/

//This function calculates a random number
//Copied from MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Create objects for 1st store

var pike = {
  location: '1st and Pike',
  minNumCustomers: 23,
  maxNumCustomers: 65,
  avgCookiePerCustomer: 6.3,
  hoursOfOperation: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],
  numCustomersArray: [],
  avgSalesPerHour: [],
  
  numCustomers: calcNumCustomers,
  avgSales: calcAvgSales,
  totalSales: calcTotalCookies,
  listEverything: calcEverything,
};

//Create function to calculate # of customers
function calcNumCustomers() {
  var randomNumCustomers = getRandomIntInclusive(this.minNumCustomers, this.maxNumCustomers);
  // console.log('random number is: ' + randomNumCustomers);
  return randomNumCustomers;
}

function calcEverything() {
  for(var i = 0; i < this.hoursOfOperation.length; i++){
    this.numCustomersArray.push(this.numCustomers());
    this.avgSalesPerHour.push(this.avgSales(i));
    console.log(this.hoursOfOperation[i] + ': ' + this.avgSalesPerHour[i] + ' cookies');
  }
  console.log('Total Cookies: ' + this.totalSales());
}



//Create a function to calculate average sales per hour ----> avgSalesPerHour = avgCookiePerCustomer * numCustomersArray[i]
function calcAvgSales(index) {
  var avgCookiesPerCustomerPerHour = Math.floor(this.avgCookiePerCustomer * this.numCustomersArray[index]);
  return avgCookiesPerCustomerPerHour;
}

//Create a function to calculate total # of cookies sold
function calcTotalCookies() {
  var totalCookies = 0;
  for(var j = 0; j < this.avgSalesPerHour.length; j++){
    totalCookies = totalCookies + this.avgSalesPerHour[j];
  }
  return totalCookies;
}

//Initialize Page
pike.listEverything();
