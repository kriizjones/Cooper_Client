function Person(attr) {
    this.gender = attr.gender;
    this.age = attr.age;
}

Person.prototype.assessCooper = function (distance) {
    this.cooperMessage = cooperAssessmentOf(this, distance);
};

var person = new Person({
    gender: 'Male',
    age: 20
});

person.assessCooper(1400);
console.log(person.cooperMessage);
// > Poor

person.assessCooper(1800);
console.log(person.cooperMessage);
// > Below average

person.assessCooper(2300);
console.log(person.cooperMessage);
// > Average

