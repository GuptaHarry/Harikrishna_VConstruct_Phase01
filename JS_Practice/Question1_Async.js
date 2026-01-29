const USERS  = [             // Always declare constants wit all caps.
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'Diana' }
];


function notifyUser(user){
    // the async function should always return a Promise => if returns promise it automatically becomes async function.
    
    if (user.id%2===0){   // Always use === to avoid type coersion issues 
        return Promise.resolve(`Notification sent to ${user.name}`);
    }
    else
    return Promise.reject(new Error(`Failed to notify ${user.name}`));   
    // else is redundant part here without else also function will return a promise. 
}


// 

// continue processing if one notification fails
async function notifyAllUsers() {
    // internal function of await is to  ****  pause the async function , until the Promise is resolved or rejected. and control is given to the normal JS program.
    
    let attempted =0 ;
let successful =0 ;
let failed =0 ;

let successfulArray =[];
let failedArray =[];

    
    for (const user of USERS) { 
        attempted++;
        try {
            await notifyUser(user);
            successful++;
            successfulArray.push(user.name);
        } catch (error) {      // to continue processing , if one fails the error will be logged and the loop continues
            failed++;
            failedArray.push(user.name);
            
        }
    }

    // since we handled inside a promise we return the data as an object 
     return {
    attempted,
    successful,
    failed,
    successfulArray,
    failedArray
  };
}


async function main(){                       // normal printing is also inside a async function because await will continue normal flow and will print 0. 
 const result = await notifyAllUsers();

// track total attempted , successful, and failed notifications
console.log(`Total notifications attempted: ${result.attempted}`);
console.log(`Total notifications successful: ${result.successful}`);
console.log(`Total notifications failed: ${result.failed}`);



// log a final summary after all users procesed.
console.log(`Successful notified users are:`);
for (const name of result.successfulArray){
    console.log(name);
}


console.log(`Failed to notify users are:`);
for (const name of result.failedArray){
    console.log(name);
}

}

main();
