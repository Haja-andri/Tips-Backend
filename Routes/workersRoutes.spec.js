const request = require("supertest");
const server = require("../server");
const db = require("../data/dbConfig");

beforeAll(async () => {
    await db("workers").truncate();
});

describe("workers endpoints", () => {

    it("should return empty array initially", async () => {
        const res = await request(server).get("/api/workers");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
    });

    it("should create new worker", async () => {
        const workerData =     {
            "name": "Tonton",
            "first_name": "Cari",
            "job_title": "Cleaner",
            "mobile": "+33724570891",
            "email": "tonton@email.com",
            "start_date": "08/2019",
            "tagline": "Tonton rocks",
            "password": "123"
        };
        const {statusCode, body} = await request(server).
            post("/api/workers").
            send(workerData);
        expect(statusCode).toEqual(200);
        expect(body[0].name).toBe("Tonton");
    });
});