const { faker } = require("@faker-js/faker");
// get the client
const mysql = require("mysql2");

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// insert data into table

let q = "INSERT INTO user ( ID, username , EMAIL, password ) VALUES ?";
// let users = [
//   ["14", "SAMARTH", "SAMARTH@MAIL.COM", "12"],
//   ["15", "SARTHAK", "SARTHAK@MAIL.COM", "11"],
// ];

let data = [];
for (i = 0; i <= 100; i++) {
  // console.log(getRandomUser());
  data.push(getRandomUser());
}
// console.log(getRandomUser());

// create the connection to database"
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "temp",
  password: "Pankaj@2580",
});

try {
  connection.query(q, [data], (err, result) => {
    if (err) throw err;
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
connection.end();
