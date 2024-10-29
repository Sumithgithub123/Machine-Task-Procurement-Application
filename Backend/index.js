const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const supplierRoutes = require("./routes/supplier");
const itemroutes = require("./routes/item");
const orderitemsroutes = require("./routes/orderItems");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/suppliers", supplierRoutes);
app.use("/api/items", itemroutes);
app.use("/api/orderitems", orderitemsroutes);

mongoose
  .connect(
    "mongodb+srv://sumithev02:7RBe6lHctlgmOmOC@cluster0.jnng4.mongodb.net/procurement",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
