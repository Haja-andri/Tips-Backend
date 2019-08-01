const request = require("supertest");
const server = require("../server");
const db = require("../data/dbConfig");

beforeAll(async () => {
    await db("customers").truncate();
});

describe("customers endpoints", () => {

    it("should create new customer", async () => {
        const customerData = {
            "name": "Jack",
            "first_name": "Nic",
            "email": "jack@email.com"
        };
        const {statusCode, body} = await request(server).
            post("/api/customers").
            send(customerData);
        expect(statusCode).toEqual(200);
        expect(body[0].name).toBe("Jack");
    });
});