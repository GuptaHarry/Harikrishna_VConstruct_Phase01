const data = [ 
  { 
    id: 1, 
    name: "john doe", 
    email: "john@example.com", 
    age: 22, 
    roles: ["user"], 
    isActive: true 
  }, 
  { 
    id: 2, 
    name: "jane smith", 
    email: "jane@company.com", 
    age: 17, 
    roles: ["admin"], 
    isActive: true 
  }, 
  { 
    id: 3, 
    name: "mark lee", 
    email: "mark@oldmail", 
    age: 30, 
    roles: ["user"], 
    isActive: false 
  } 
];


// Q.1 
const activeUsers = data.filter(user=>user.isActive);  // filters return new array so orignial data is unchanged.
console.log( activeUsers);
