const obj = {
  name: "abc",

  // 1. Method (normal function shorthand)
  f1() {
    console.log("f1 :", this);
  },

  // 2. Named function
    f2: function named() {
    console.log("f2 :", this);
  },

  // 3. Unnamed function
  f3: function () {
    console.log("f3 :", this);
  },

  // 4. Arrow function
  f4: () => {
    console.log("f4 :", this);
  },

  // 5. Arrow inside a normal function
  f5() {
    console.log("outer :", this);

    const arrowf5= () => {
      console.log("arrow inside normal:", this);
    };

    arrowf5();
  },

};

obj.f1();  // points to obj
obj.f2();  // points to obj
obj.f3();  // points to obj
obj.f4();  // points to global objeect
obj.f5();   // outer points to obj, inner arrow points to obj due as it takes this from surrounding.
