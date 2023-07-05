const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Biomarket application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");

db.mongoose
  .connect(`mongodb://localhost/Biomarket`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// ----------------------------------------------------------------
const supplierRouter = require("./app/routes/supplier.routes");
const productRouter = require("./app/routes/product.routes");
const orderRouter = require("./app/routes/order.routes");
const orderItemRouter = require("./app/routes/orderItem.routes");
const saleRouter = require("./app/routes/sale.routes");
const saleItemRouter = require("./app/routes/saleItem.routes");

// ----------------------------------------------------------------

app.use("/api/supplier", supplierRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/orderItems", orderItemRouter);
app.use("/api/sale", saleRouter);
app.use("/api/saleItems", saleItemRouter);

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
