const { faker } = require("@faker-js/faker");
// get the client
const mysql = require("mysql2");
let express = require("express");
let app = express();
let path = require("path");
let methodoverride = require("method-override");
app.use(methodoverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// create the connection to database"
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "temp",
  password: "Pankaj@2580",
});
app.get("/back/home", (req, res) => {
  res.redirect("/");
});
app.get("/", (req, res) => {
  try {
    let q = "select count(*) from user";
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send(result);
  }
});
// show user

app.get("/user", (req, res) => {
  try {
    let q = "select * from user";
    connection.query(q, (err, users) => {
      if (err) throw err;

      res.render("showusers.ejs", { users });
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// edit user

app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = ` SELECT * FROM USER WHERE ID='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      // console.log(user);
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// update data
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: Formpass, username: Newusername } = req.body;
  let q = ` SELECT * FROM USER WHERE ID='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (Formpass != user.password) {
        res.send("WRONG PASSWORD!");
      } else {
        let q2 = `UPDATE user SET username='${Newusername}' WHERE id ='${id}' `;
        // res.send(result[0].username);
        connection.query(q2, (err, result) => {
          try {
            if (err) throw err;
            // res.send("Updated");
            res.redirect("/user");
          } catch (err) {
            res.send(err);
          }
        });
      }
      console.log(user.password);
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
// delete from database

app.post("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = ` SELECT * FROM USER WHERE ID='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      // console.log(user);
      res.render("delete.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// delete data
app.delete("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: Formpass, username: Newusername } = req.body;
  let q = ` SELECT * FROM USER WHERE ID='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (Formpass != user.password) {
        res.send("WRONG PASSWORD!");
      } else {
        let q2 = `DELETE FROM user WHERE id ='${id}'`;
        // res.send(result[0].username);
        connection.query(q2, (err, result) => {
          try {
            if (err) throw err;
            // res.send("Updated");
            res.redirect("/user");
          } catch (err) {
            res.send(err);
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
// Add new user

app.get("/user/add", (req, res) => {
  res.render("add.ejs");
});

// add user to database

app.post("/user", (req, res) => {
  let { email, username, password } = req.body;
  let id = faker.string.uuid();
  console.log(id);
  console.log(email, username, password);
  // res.send("added!");
  q = ` INSERT INTO USER VALUES ("${id}","${username}","${email}","${password}")`;
  console.log(q);
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;

      res.redirect("/user");
    });
  } catch (err) {
    // console.log(err);
    res.send("WRONG ENTRY");
  }
});

// Create port
app.listen("8080", (req, res) => {
  console.log("App is Listening at 8080.");
});
