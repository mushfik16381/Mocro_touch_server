const mongoose = require('mongoose');
const request = require("supertest");

beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URL);
});

afterEach(async () => {
    await mongoose.connection.close();
});
