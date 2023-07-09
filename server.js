import app from "./app.js";
import { connectDB } from "./config/database.js";

connectDB();

app.listen(process.env.PORT || 4200, () => {
    console.log(`Server is Working `);
})