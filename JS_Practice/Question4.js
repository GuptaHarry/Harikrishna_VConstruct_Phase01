const data = [ 
  { 
    request_id: "REQ_101", 
    payload: { 
      user: { 
        id: 1, 
        name: "john doe", 
        email: "john@example.com" 
      } 
    }, 
    status: "success" 
  }, 
  { 
    request_id: "REQ_102", 
    payload: {}, 
    status: "failed" 
  } 
] ;



// handling reading data without errors 

data.forEach(element => {
    console.log("Request ID:", element.request_id);
    if (element.payload && element.payload.user) {
        console.log("User Name:", element.payload.user.name);
        console.log("User Email:", element.payload.user.email);
    } else {
        console.log("No user data available.");
    }
    console.log("Status:", element.status);
});
 

// with optional chaining
data.forEach(element => {
    console.log("Request ID:", element.request_id);
    console.log("User Name:", element.payload?.user?.name ?? "No user data available.");
    console.log("User Email:", element.payload?.user?.email ?? "No user data available.");
    console.log("Status:", element.status);
}); 


// method -1 is more clear and readable





// Q.2 covert backend style keys to frontend style keys 


/*  Most backends use formats like:

snake_case → very common in APIs

sometimes PascalCase

Frontend (especially JavaScript/React) convention is:

camelCase */


function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (matched, char) => char.toUpperCase());
}


/*   the pattern is /_([a-z])/g  
 _ is for underscore
 ([a-z]) is a capturing group for a lowercase letter
 g is for global replacement (all occurrences)
 
 and the callback has ( matched,char) 
  matched is entire "_......"
  char is the captured letter after underscore

  replace calls the callback for each match it finds
  Example: "request_id"
   1st match: "_i" → char = "i"
   callback returns "I"
   final result: "requestId"
  */
function convertKeys(obj) {
  const result = {};
  for (let key in obj) {
    const camelKey = toCamelCase(key);
    result[camelKey] = obj[key];
  }
  return result;
}
const convertedData = data.map(item => convertKeys(item));



// format string values consistently
convertedData.forEach(item => {
  if (item.payload && item.payload.user && item.payload.user.name) {    
    const name = item.payload.user.name;
    item.payload.user.name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
});

console.log("Converted Data:", convertedData);




// count total api requests
const totalRequests = convertedData.length;
console.log("Total API requests:", totalRequests);


// count successful responses
const successfulResponses = convertedData.filter(item => item.status === "success").length;
console.log("Successful responses:", successfulResponses);

// storing the data into an object 
const obj1 = {...convertedData};
console.log("Data as object:", obj);  // less meaningful bcz we get  0 : {} , 1 : {} format.


// using reduce to create an object with request_id as keys
const obj2 = convertedData.reduce((acc,item)=>{
    acc[item.requestId] = item;
    return acc;
},{});
console.log("Data as object with requestId keys:", obj2);

// now the format will be  {  "REQ_101" : {....} , "REQ_102" : {....}  }.



// use Object methods and this to manage state.
const objMethods = {
    data: convertedData,
    totalRequests() {        
        return this.data.length;
    },
    successResponses() {
        return this.data.filter(item => item.status === "success").length;
    },
    failedResponses() {
        return this.data.filter(item => item.status === "failed").length;
    }
}
console.log("Total requests (method):", objMethods.totalRequests());
console.log("Successful responses (method):", objMethods.successResponses());
console.log("Failed responses (method):", objMethods.failedResponses());


// preserve data integrity 
// it is preserved by not mutating original data and creating new objects/arrays when transforming data.
