// 1.1. 使用对象字面量

/*const animal = {
    type: "mammal",
    sound() {
        console.log("Some sound");
    }
};

const dog = Object.create(animal); // 继承自 animal
dog.breed = "Labrador";
dog.sound(); // 输出: Some sound*/

// 1.2. 使用 new Object() 构造函数
/*const person = new Object();
person.name = "Bob";
person.age = 25;
person.greet = function() {
    console.log("Hello, I am " + this.name);
};

person.greet(); // 输出: Hello, I am Bob*/


// 1.3. 使用工厂函数

/*function createPerson(name, age) {
    return {
        name: name,
        age: age,
        greet: function() {
            console.log("Hi, I'm " + this.name);
        }
    };
}

const person1 = createPerson("Charlie", 28);
person1.greet(); // 输出: Hi, I'm Charlie
console.log(person1.age)*/


// 1.4. 使用构造函数
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.greet = function() {
        console.log("Hello, I am " + this.name);
    };
}

const person2 = new Person("David", 32);
person2.greet(); // 输出: Hello, I am David

// 1.5. 使用 Object.create()
/*const protoPerson = {
    greet: function() {
        console.log("Hi, my name is " + this.name);
    }
};

const person3 = Object.create(protoPerson);
person3.name = "Eve";
person3.greet(); // 输出: Hi, my name is Eve*/


