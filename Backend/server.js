import app from "./src/app.js";
import ConnectDB from "./src/config/db.js";

const PORT = process.env.PORT || 3000;

await ConnectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
