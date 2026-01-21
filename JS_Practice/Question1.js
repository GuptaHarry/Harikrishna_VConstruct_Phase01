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


// Q.2 Normalise the user names   => converting all names to uppercase 

activeUsers.forEach(user=>{
  user.name = user.name.toUpperCase();
});

// adding derived property whether user is adult or not (for all including inactive users)
const userswithAdultProperty = data.map(user=>{
  return {
    ...user,
    isAdult: user.age >= 18 ? true : false
  }
});


// Q.3 check whether at least one user has an admi role .
const hasAdmin = data.some(user=>user.roles.includes("admin"));

// check whether all users have valid email addresses (contain "@" and ".")

  // approach - 1
const allValidEmails = data.every(user=>{
  return user.email.includes("@") && user.email.includes(".");
});


 // approach - 3  using Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allValidEmailsRegex = data.every(user=>emailRegex.test(user.email));
console.log(allValidEmailsRegex);

 // appraoch - 2 (using HTML5)

 const inputElement = document.createElement("input");
inputElement.type = "email";    
const validEmailsHTML = data.every(user=>{
  inputElement.value = user.email;
  return inputElement.checkValidity();
});




// Q.4 calculate average age of active users
const totalAge = activeUsers.reduce((sum,user)=>sum + user.age,0);



// Q.5 Use Object methods to generate summaries using this .

const userSummary1 = {
  totalUsers: 0,
  activeUsers: 0,
  inactiveUsers: 0,
  adultUsers: 0,
  minorUsers: 0,

  generateSummary(data) {
    data.forEach(user => {
      this.totalUsers++;

      if (user.isActive) this.activeUsers++;
      else this.inactiveUsers++;

      if (user.age >= 18) this.adultUsers++;
      else this.minorUsers++;
    });

    return this;
  }
};
userSummary1.generateSummary(data);
console.log(userSummary1);


// sumary without using this.

const userSummary2 = data.reduce((summary,user)=>{
  summary.totalUsers += 1;  
    if(user.isActive) summary.activeUsers += 1;
    else summary.inactiveUsers += 1;

    if(user.age >= 18) summary.adultUsers += 1;
    else summary.minorUsers += 1;
    return summary;
},{
  totalUsers: 0,
  activeUsers: 0,
    inactiveUsers: 0,
    adultUsers: 0,
    minorUsers: 0
});

console.log(userSummary2);
