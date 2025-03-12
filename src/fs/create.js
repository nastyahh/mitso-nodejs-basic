import fs from "fs/promises";

const create = async () => {
    try {
        await fs.access("files/fresh.txt");
        throw new Error("FS operation failed");
    } catch (error) {
        if (error.code === "ENOENT") {
            await fs.writeFile("files/fresh.txt", "I am fresh and young");
        } else {
            throw error;
        }
    }
};

await create();