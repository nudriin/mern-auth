import { web } from "../src/app/web.js";
import supertest from "supertest";
import { createTestUser, removeTestUser } from "./test-utils.js";

describe("POST /api/users", () => {

    afterEach(async () => {
        await removeTestUser();
    });

    it("Should be success regsiter user", async () => {
        const response = await supertest(web)
            .post("/api/users")
            .send({
                username: "test",
                email: "test@gmail.com",
                name: "test",
                password: "12345678",
            });

        console.log(response.body);

        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.email).toBe("test@gmail.com");
        expect(response.body.data.name).toBe("test");
    });

    it("Should be reject register user if request invalid", async () => {
        const response = await supertest(web)
            .post("/api/users")
            .send({
                username: "",
                email: "test",
                name: "",
                password: "678",
            });

        console.log(response.body);

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("Should be reject register user if username duplicate", async () => {
        // await createTestUser();
        let response = await supertest(web)
            .post("/api/users")
            .send({
                username: "test",
                email: "test@gmail.com",
                name: "test",
                password: "12345678",
            });

        response = await supertest(web)
            .post("/api/users")
            .send({
                username: "test",
                email: "succes@gmail.com",
                name: "test",
                password: "12345678",
            });

        console.log(response.body);

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("Should be reject register user if email duplicate", async () => {
        // await createTestUser();
        let response = await supertest(web)
            .post("/api/users")
            .send({
                username: "test",
                email: "test@gmail.com",
                name: "test",
                password: "12345678",
            });

        response = await supertest(web)
            .post("/api/users")
            .send({
                username: "success",
                email: "test@gmail.com",
                name: "test",
                password: "12345678",
            });

        console.log(response.body);

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("Should be reject register user if username and email duplicate", async () => {
        // await createTestUser();
        let response = await supertest(web)
            .post("/api/users")
            .send({
                username: "test",
                email: "test@gmail.com",
                name: "test",
                password: "12345678",
            });

        response = await supertest(web)
            .post("/api/users")
            .send({
                username: "test",
                email: "test@gmail.com",
                name: "test",
                password: "12345678",
            });

        console.log(response.body);

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });


});