/************ CUSTOMER class ********************/

var Customer = function(customerInfo) {
  // ** your code here**
  // Customer class has 3 public properties.
  this.id = customerInfo.id;             //can also pass id as a parameter then you set id as the id that you pass in Example: this.id=id;
  this.name = customerInfo.name;
  this.carRented = null;                 // this is an object with default value = null so not compulsory to create this when you create an instance of Car class;

};//end of Customer class constructor



/************ CAR class ************************/

var Car = function (carInfo) {
  // ** your code here**
  // Car class has 7 public properties.
  this.id = carInfo.id;
  this.producer = carInfo.producer;
  this.model = carInfo.model;
  this.rentalPricePerDay = carInfo.rentalPrice;  //=rentalPrice as per question requirement in quotePrice function.
  this.available = true;
  this.rentalDuration = 0;
  this.customer = null;            //this is a Customer object


  //Car class 3 public function.


  this.quotePrice = function(rentalDuration){
    return this.rentalPrice * rentalDuration;
  };//end quotePrice function


  this.reserve = function(customer, rentalDuration){
      if(this.available)
      {
          this.available = false;
          this.customer = customer;
          this.rentalDuration = rentalDuration;
          return true;
      }
      else
      {
          return false;
      }
  };//end reserve function


  this.return = function() {
      if(this.available)
      {
          console.log ("Sorry, this car have already been returned.");
      }
      else //if the car is unavailable, you can return it.
      {
          this.available = true;
          this.customer = null;
          this.rentalDuration = 0; //rentalDuration null, this is integer = 0
      }
  };//end of return function


}; //end of Car class constructor


/************ VENDOR class ************************/

// Vendor Object
var Vendor = function(name) {
  // 3 properties.
  this.name = name;
  this.cars = [];                                 // an empty array - list of cars
  this.customers = [];                            // an empty array - list of customers


  //this function takes an carID and returns the index or -1.
  this.findCarIndex = function (carID) {
    return this.cars.findIndex(function(car){
      return car.id === carID ? true : false ;
    });
  };


  //this function takes an customerID and returns the index or -1.
  this.findCustomerIndex = function (customerID) {
    return this.customers.findIndex(function(customer){  // pass the Customer object so can access the .id propertie
      return customer.id === customerID ? true : false ;
    });
  };

  this.getCar = function (carID) {
    return this.cars.find(function(car){
      return car.id === carID ? true : false ;
    });
  };

  //get which customer from the list of customers
  this.getCustomer = function (customerID)
  {
    return this.customers.find(function(customer){
        return customer.id === customerID ? true : false ;
      });
  };

  // **your code here**
  this.addCar = function (carObj) {
     if(this.getCar(carObj.id)) //check if returns true
      {
        console.log("Car already exists");
      }
    else
      {
        //push the object
        this.cars.push(carObj); // push the Car object into the list of cars
        console.log("Car added to the warehouse");

      }
  };

  this.addCustomer = function (customerObj) {
     if(this.getCustomer(customerObj.id)) //if you can find the customer id
      {
        console.log("Customer already exists");
      }
    else
      {
        //push the object
        this.customers.push(customerObj); // push the customer object into the list of customer
        console.log("Customer added to the warehouse");

      }
  };


  //this is to remove the car if its in the list
  this.removeCar = function (carID) {
    var carIndex = this.findCarIndex(carID);
    if(carIndex>=0)
      {
        //remove
        //this.car.splice()
        this.cars.splice(carIndex,1); //only remove one Car at index=carIndex
        console.log("Car deleted");
      }
    else
      {
        console.log("Car not found");
      }
  };


  //this is to remove the Customer
  this.removeCustomer = function (customerID) {
    var customerIndex = this.findCustomerIndex(customerID);
    if(customerIndex>=0)
      {
        //remove
        //this.car.splice()
        this.customer.splice(customerIndex,1); //only remove one Car at index=carIndex
        console.log("Customer deleted");
      }
    else
      {
        console.log("Customer not found");
      }
  };


  //this is to filter the generate an array of cars which available is true

  this.availableCars = function () {
    //to generate array of cars available for rent
    return this.cars.filter(function(car){ //display all the card that is available in this list
      return car.available ? true:false;  //return true if car is available
    });//close
  };

  this.rentCar = function (customerID, rentalDuration){
    var availableCars = this.availableCars();
    if (availableCars.length === 0) {
      console.log("All our cars have been rented");
    } else {
      var customer = this.getCustomer(customerID);
      if (customer) {
        var car = availableCars[0];
        customer.carRented = car;
        car.reserve(customer, rentalDuration);
        console.log("The car has been reserved");
      } else {
        console.log("Please provide a valid customerID");
      }
    }

  };//end of rentCar function
  //

  // start of returnCar function

  this.returnCar = function(customerID){

    if(this.getCustomer(customerID))
      {
        customer.carRented.return();  //Call customer's carRented's return function
        customer.carRented = null;    //Set customer's carRented to null
        console.log("Thank you for using our service");
      }
    else
      {
        console.log ("Please provide a valid customerID");
      }
  };



  this.totalRevenue = function () {
    return this.cars.reduce(function(oldSum, current){
      console.log(oldSum, current);
      return oldSum + (current.quotePrice());
    }, 0);

};

};//end of Vendor constructor


//Codes you can run to test your code
//set the value of the customer properties.

var customerInfo = {
  id: "001",
  name: "Sherman"
};

//create an instance of Customer object
var customerA = new Customer(customerInfo);
console.log("Customer Id: " +customerA.id);
console.log("Customer Name: " + customerA.name);

//set the properties of Car object
//set only 3 properties here since the rest has default values.
var carInfo = {
  id: "001",
  producer: "Toyota",
  model: "Subra",
  rentalPrice: 200
};

//create an instrance of Car object.
var carA = new Car(carInfo);
console.log("Car ID: " + carA.id);
console.log("Car produced by: " + carA.producer);
console.log("Car model: " + carA.model);
console.log("Car rental price: " + carA.rentalPricePerDay);



var vendor = new Vendor('Jens Limited');
vendor.addCustomer(customerA);
console.log(vendor.availableCars());
vendor.addCar(carA);
console.log(vendor.availableCars());
vendor.rentCar(customerA.id, 5);
