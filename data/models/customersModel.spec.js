const Customers = require('./customersModel');
const db = require('../dbConfig')


beforeAll(async () => {
    await db("customers").truncate();
});

describe("Customer Model", () => {

    it("should create a new Customer", async () => {
        const customerData = {
            "name": "Jack",
            "first_name": "Nic",
            "email": "jack@email.com"
        };
        const customer = await Customers.add(customerData);
        expect(customer).toHaveLength(1);
        expect(customer[0].name).toBe('Jack');
    });

    it("Find customer by its ID", async () => {
        const customer = await Customers.findById(1);
        expect(customer[0].name).toBe('Jack');
    });

});