import { prismaClient } from "../src/app/database.js";

const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where : {
            username : "test"
        }
    });
}

const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            email : "test@gmail.com",
            password: await bcrypt.hash("12345678", 10),
            name: "test"
        }
    });
}

export {
    removeTestUser,
    createTestUser
}