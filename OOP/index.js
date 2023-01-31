'use strict';

function User(name, id){
    this.name = name;
    this.id = id;
    this.human = true;
}

const ivan = new User();

function sayName(){
    console.log(this);
    console.log(this.name)
}

const usr = {
    name: 'Mkrtich'
}

sayName.apply(usr);

console.log(usr)