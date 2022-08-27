
const { faker } = require('@faker-js/faker');
const fs = require('fs');
let nameList = "";


for (let i = 1; i <= 1000; i++) {
    const randomName = faker.name.fullName();
    if (i > 1) {
        nameList += `, ${randomName}`
    } else {
        nameList += `${randomName}`
    }
}

fs.writeFile('./names.txt',nameList,function (err) {
    console.log("informacion guardada");
    
})
