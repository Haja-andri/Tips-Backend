const Workers = require('./workersModel');
const db = require('../dbConfig')


beforeAll(async () => {
    await db("workers").truncate();
});

describe("Wokers Model", () => {
    it("returns empty array initially", async () => {
        const worker = await Workers.getAll();
        expect(worker).toEqual([]);
    });

    it("should create a new Worker", async () => {
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
        const worker = await Workers.add(workerData);
        expect(worker).toHaveLength(1);
        expect(worker[0].name).toBe('Tonton');
    });

    it("should delete a worker", async () => {
        const deleted = await Workers.deleteWorker(1);
        expect(deleted).toBeTruthy();
    });

});