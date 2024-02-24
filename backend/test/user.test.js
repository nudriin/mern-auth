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

describe("POST /api/users/login", () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("Should success login", async () => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "12345678"
            });

        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.token).toBeDefined();
    });

    it("Should reject login if username invalid", async () => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "testss",
                password: "12345678"
            });

        console.log(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

    it("Should reject login if password invalid", async () => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "123456782312"
            });

        console.log(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

    it("Should reject login if both username and password invalid", async () => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "tes12231232t",
                password: "1234567823123123122"
            });

        console.log(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

    it("Should reject login if request invalid", async () => {
        const response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "",
                password: "12"
            });

        console.log(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});

describe("POST /api/users/google", () => {
    afterEach(async () => {
        await removeTestUser();
    });

    it("should be succes register auth via google", async () => {
        const response = await supertest(web)
            .post("/api/users/google")
            .send({
                username: "test",
                email: "test@gmail.com",
                password: "12345678",
                name: "test",
                profile_pic: "test"
            });

        console.log(response.body);

        expect(response.status).toBe(200);
        expect(response.body.data.token).toBeDefined();
    });

    it("should be reject auth via google if request invalid", async () => {
        const response = await supertest(web)
            .post("/api/users/google")
            .send({
                username: "",
                email: "testgmail.comssss",
                password: "1234",
                name: "",
                profile_pic: "test"
            });

        console.log(response.body);

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

});

describe("GET /api/users/current", () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("Should success get users", async () => {

        // Login first
        let response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "12345678"
            });
        const token = response.body.data.token;

        // get user data
        response = await supertest(web)
            .get("/api/users/current/")
            .set({
                "Authorization": `Bearer ${token}`
            });

        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.email).toBe("test@gmail.com");
        expect(response.body.data.name).toBe("test");
    });

    it("Should reject if token invalid get users", async () => {
        // get user data
        const response = await supertest(web)
            .get("/api/users/current/")
            .set({
                "Authorization": `Bearer`
            });

        console.log(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors).toBe("Unauthorized");

    });

    it("Should reject if no authorize get users", async () => {
        // get user data
        const response = await supertest(web)
            .get("/api/users/current/");

        console.log(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors).toBe("Unauthorized");

    });
});

describe("PATCH /api/users/current", () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("Should success update name users", async () => {

        // Login first
        let response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "12345678"
            });
        const token = response.body.data.token;

        // get user data
        response = await supertest(web)
            .patch("/api/users/current/")
            .set({
                "Authorization": `Bearer ${token}`
            })
            .send({
                username : "test",
                name : "updated"
            });

        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.email).toBe("test@gmail.com");
        expect(response.body.data.name).toBe("updated");
    });

    it("Should success update password users", async () => {

        // Login first
        let response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "12345678"
            });
        const token = response.body.data.token;

        // get user data
        response = await supertest(web)
            .patch("/api/users/current/")
            .set({
                "Authorization": `Bearer ${token}`
            })
            .send({
                username : "test",
                password : "updated12345",
                old_password : "12345678"
            });

        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.email).toBe("test@gmail.com");
        expect(response.body.data.name).toBe("test");
        
        response = await supertest(web)
        .post("/api/users/login")
        .send({
            username: "test",
            password: "updated12345"
        });

        expect(response.status).toBe(200);
        expect(response.body.data.token).toBeDefined();
    });

    it("Should success update profile_pic users", async () => {

        // Login first
        let response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "12345678"
            });
        const token = response.body.data.token;

        // get user data
        response = await supertest(web)
            .patch("/api/users/current/")
            .set({
                "Authorization": `Bearer ${token}`
            })
            .send({
                username : "test",
                profile_pic : "updated"
            });

        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.email).toBe("test@gmail.com");
        expect(response.body.data.name).toBe("test");
        expect(response.body.data.profile_pic).toBe("updated");
    });

    it("Should success update all data users", async () => {

        // Login first
        let response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "12345678"
            });
        const token = response.body.data.token;

        // get user data
        response = await supertest(web)
            .patch("/api/users/current/")
            .set({
                "Authorization": `Bearer ${token}`
            })
            .send({
                username : "test",
                name : "updated",
                password : "updated12345",
                old_password : "12345678",
                profile_pic : "updated"
            });

        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.email).toBe("test@gmail.com");
        expect(response.body.data.name).toBe("updated");
        expect(response.body.data.profile_pic).toBe("updated");

        response = await supertest(web)
        .post("/api/users/login")
        .send({
            username: "test",
            password: "updated12345"
        });

        expect(response.status).toBe(200);
        expect(response.body.data.token).toBeDefined();
    });

    it("Should reject update if old password users invalid", async () => {

        // Login first
        let response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "12345678"
            });
        const token = response.body.data.token;

        // get user data
        response = await supertest(web)
            .patch("/api/users/current/")
            .set({
                "Authorization": `Bearer ${token}`
            })
            .send({
                username : "test",
                password : "updated12345",
                old_password : "salah1231232312"
            });

        console.log(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
        
        response = await supertest(web)
        .post("/api/users/login")
        .send({
            username: "test",
            password: "updated12345"
        });

        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

    it("Should reject update if no authorization users invalid", async () => {

        // Login first
        let response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "12345678"
            });
        const token = response.body.data.token;

        // get user data
        response = await supertest(web)
            .patch("/api/users/current/")
            .set({
                "Authorization": `Bearer ${token}123213123`
            })
            .send({
                username : "test",
                password : "updated12345",
                old_password : "salah1231232312"
            });

        console.log(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });

    it("Should reject update if request users invalid", async () => {

        // Login first
        let response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "12345678"
            });
        const token = response.body.data.token;

        // get user data
        response = await supertest(web)
            .patch("/api/users/current/")
            .set({
                "Authorization": `Bearer ${token}`
            })
            .send({
                username : "test",
                name : "",
                profile_pic : "",
                password : "updated12345",
                // old_password : "salah1231232312"
            });

        console.log(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});

