import request from "supertest";
import app from "../index"


describe("Test /", () => {
    test("Catch-all route", async () => {
        const res = await request(app).get("/phonebooks");
        expect(res.body).toEqual({
            message: "Retrived", data: []
        });
    });
});
describe("Test /", () => {
    test("Catch-all route", async () => {
        const res = await request(app).post("/phonebooks").send({
            "name": "who",
            "value": 1,
            "label": "important"
        });
        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty("data.value");
        expect(res.body).toHaveProperty("data.label");
        expect(res.body).toHaveProperty("data.createdDate");
        expect(res.body).toHaveProperty("data.updatedDate");

        expect(res.body).not.toHaveProperty("data.name");
    });
});
describe("Test /", () => {
    test("Catch-all route", async () => {
        await request(app).post("/phonebooks").send({
            "name": "who",
            "value": 1,
            "label": "test"
        });
        const res = await request(app).get("/phonebooks/label/test");
        expect(res.statusCode).toBe(200)
        expect(res.body.data[0].key).toBe("who");
        expect(res.body).toHaveProperty('data[0].value.value', 1);
        expect(res.body).toHaveProperty('data[0].value.label', "test");
    });
});
describe("Test /", () => {
    test("Catch-all route", async () => {
        const res1 = await request(app).post("/phonebooks").send({
            "name": "who",
            "value": 1,
            "label": "test"
        });
        console.log(res1.body)
        const res2 = await request(app).delete("/phonebooks/entry/who");
        expect(res2.statusCode).toBe(204)
        const res3 = await request(app).get("/phonebooks/entry/who");
        expect(res3.statusCode).toBe(404)
        expect(res3.body).toEqual({
            message: "Entry not available"
        })

    });
});