const data = [ 
  { 
    id: 1, 
    title: "submit report", 
    status: "completed", 
    priority: 2, 
    dueDate: "2025-01-10" 
  }, 
  { 
    id: 2, 
    title: "fix login bug", 
    status: "pending", 
    priority: 1, 
    dueDate: "2025-01-05" 
  }, 
  { 
    id: 3, 
    title: "update docs", 
    status: "pending", 
    priority: 3, 
    dueDate: "2025-01-20" 
  } 
] ;




// Q.1 create tasks using a constructor function
                                                             
function Task(id, title, status, priority, dueDate) {             // 
  this.id = id;
  this.title = title;
  this.status = status;
  this.priority = priority;
  this.dueDate = dueDate;
};

const tasks = data.map(item => new Task(item.id, item.title, item.status, item.priority, item.dueDate));
console.log("Tasks:", tasks);


// add a method to find all pending tasks

 Task.pendingTasks = function(tasks){
    return tasks.filter(task => task.status === "pending");
 }


 // ATTACH SHARED METHOD USING PROTOTYPES 
Task.prototype.markCompleted = function() {
  this.status = "completed";
};




 tasks[1].markCompleted();
console.log("After marking completed:", tasks);
const pending = tasks.pendingTasks(tasks);
console.log("Pending tasks:", pending);




// add shared functionality => check if task is overdue
Task.prototype.isOverdue = function(currentDate) {
  return new Date(this.dueDate) < new Date(currentDate);
};

const currentDate = "2025-01-15";
tasks.forEach(task => {
  console.log(`Is task "${task.title}" overdue?`, task.isOverdue(currentDate));
});



// format task title consistently
Task.prototype.formatTitle = function() {
  this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1).toLowerCase();
};

tasks.forEach(task => {
  task.formatTitle();
});
console.log("After formatting titles:", tasks);


// sort tasks by prirority 
tasks.sort( (a,b)=> b.priority - a.priority);
console.log("Tasks sorted by priority:", tasks);


// check some tasks are overdue 
tasks.forEach(task=> {
    console.log(`Task "${task.title}" is overdue:`, task.isOverdue(currentDate));
})


// check all tasks have valid titles 
// check criteria => title must be non-empty string without whiespace only.

const allValidTitles = tasks.every(task => typeof task.title === "string" && task.title.trim().length > 0);
console.log("All tasks have valid titles:", allValidTitles);
