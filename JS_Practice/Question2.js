const data = [ 
  { 
    id: "P101", 
    name: "Laptop", 
    price: 60000.456, 
    quantity: 1, 
    category: "electronics" 
  }, 
  { 
    id: "P102", 
    name: "Mouse", 
    price: 799.99, 
    quantity: 2, 
    category: "electronics" 
  }, 
  { 
    id: "P103", 
    name: "Notebook", 
    price: 99.5, 
    quantity: 3, 
    category: "stationery" 
  } 
] ; 


// Q.1 sort cart items by price 
const sortedByPrice = data.sort((a,b)=>a.price - b.price);
console.log("Sorted by price:", sortedByPrice);

 // locate first item belonging to specific category
const categoryToFind = "electronics";
const firstElectronicsItem = data.find(item=>item.category === categoryToFind); // find stops as soons as it finds the matched item 
console.log("First electronics item:", firstElectronicsItem);



//Q.2 Ensure all items have a quantity greater than zero
console.log( "All items have a quantity greater than zero:", data.every(item=>item.quantity > 0));

// Q.3 total cart value
const totalCartValue = data.reduce((total,item)=> total + (item.price * item.quantity),0);
console.log("Total cart value:", totalCartValue);

// apply tax and discount rates 
const taxRate = 0.1; // 10% tax
const discountRate = 0.05; // 5% discount   
const finalCartValue = data.reduce((total,item)=>{
  const itemTotal = item.price * item.quantity;
  const tax = itemTotal * taxRate;
  const discount = itemTotal * discountRate;
  return total + itemTotal + tax - discount;
},0);


// Q.4 group pricing logic isnde an object 
const pricing = {
  taxRate: 0.1,
  discountRate: 0.05,   
    calculateFinalPrice(item) {
        const itemTotal = item.price * item.quantity;
        const tax = itemTotal * this.taxRate;
        const discount = itemTotal * this.discountRate;
        return itemTotal + tax - discount;
    },

// use this to access tax rates , discounts and cart data.
    calculateCartTotal(data) {
        return data.reduce((total,item)=> total + this.calculateFinalPrice(item),0);
    }
};




// Q.5 round monetary values appropiately.
const roundToTwoDecimals = (value) => Math.round(value * 100) / 100;
const roundedCartValue = roundToTwoDecimals(finalCartValue);
console.log("Rounded final cart value:", roundedCartValue);






