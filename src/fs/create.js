import fs from "fs";

const create = async () => {
    if (!fs.existsSync('files/fresh.txt')) {
        fs.writeFileSync("files/fresh.txt", "I am fresh and young")
    }
    else {
        console.error("FS operation failed")
    }
};

await create();