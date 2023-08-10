import request from "supertest";
import app from "../../app";
import { createInput } from "../factories/createInput";
import { randomAlphaNumeric } from "../factories/random-gen";

describe("Testing create recipe route", () => {
  test("it should return 403 body is empty", async () => {
    await request(app)
      .post("/api/v1/recipe/create")
      .send({})
      .expect(403);
  })

  describe('testing name field', ()=>{
    test("it should return 403 if name is empty", async () => {
      const inputs = createInput({name: ""});
      const response = await request(app)
        .post('/api/v1/recipe/create')
        .send(inputs)
        .expect(403)

      expect(response.body).toHaveProperty('errors')
      expect(response.body.errors[0].field).toBe('name')
    })
    test('it should return 403 if name lentgh is more than 128 chars', async ()=>{
      const name = randomAlphaNumeric(100,28,5)
      const inputs = createInput({name})
      const response = await request(app)
        .post('/api/v1/recipe/create')
        .send(inputs)
        .expect(403)

      expect(response.body).toHaveProperty('errors')
      expect(response.body.errors[0].field).toBe('name')
    })
    test('it should return 200 when name is alphanumeric', async () => {
      const inputs = createInput({})
      const response = await request(app)
        .post('/api/v1/recipe/create')
        .send(inputs)
        .expect(200)
    })
    test('it should return 403 if name length is less than 4 chars', async () => {
      const name = randomAlphaNumeric(1,1,0)
      const inputs = createInput({name})
      const response = await request(app)
        .post('/api/v1/recipe/create')
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty('errors')
      expect(response.body.errors[0].field).toBe('name')
    })
    test('it should return 403 if name none space chars are less than 4 chars', async ()=>{
      const name = "  t  1  s";
      const inputs = createInput({name})
      const response = await request(app)
        .post('/api/v1/recipe/create')
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty('errors')
      expect(response.body.errors[0].field).toBe('name')
    })
  })

  describe('testing title field',()=>{
    test("it should return 403 if title is empty", async () => {
      const inputs = createInput({title: ""});
      const response = await request(app)
        .post('/api/v1/recipe/create')
        .send(inputs)
        .expect(403)

      expect(response.body).toHaveProperty('errors')
      expect(response.body.errors[0].field).toBe('title')
    })
    test('it should return 403 if title lentgh is more than 128 chars', async ()=>{
      const title = randomAlphaNumeric(100,28,5)
      const inputs = createInput({title})
      const response = await request(app)
        .post('/api/v1/recipe/create')
        .send(inputs)
        .expect(403)

      expect(response.body).toHaveProperty('errors')
      expect(response.body.errors[0].field).toBe('title')
    })
    test('it should return 200 when title is alphanumeric', async () => {
      const inputs = createInput({})
      await request(app)
        .post('/api/v1/recipe/create')
        .send(inputs)
        .expect(200)
    })
    test('it should return 403 if title length is less than 4 chars', async () => {
      const title = randomAlphaNumeric(1,1,0)
      const inputs = createInput({title})
      const response = await request(app)
        .post('/api/v1/recipe/create')
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty('errors')
      expect(response.body.errors[0].field).toBe('title')
    })
    test('it should return 403 if title none space chars are less than 4 chars', async ()=>{
      const title = "  t  1  s";
      const inputs = createInput({title})
      const response = await request(app)
        .post('/api/v1/recipe/create')
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty('errors')
      expect(response.body.errors[0].field).toBe('title')
    })
  })

  describe('testing description field',()=>{
    test("it should return 403 if description is empty", async () => {
      const inputs = createInput({description: ""});
      const response = await request(app)
        .post('/api/v1/recipe/create')
        .send(inputs)
        .expect(403)

      expect(response.body).toHaveProperty('errors')
      expect(response.body.errors[0].field).toBe('description')
    })
    test('it should return 200 when description is alphanumeric', async () => {
      const inputs = createInput({})
      await request(app)
        .post('/api/v1/recipe/create')
        .send(inputs)
        .expect(200)
    })
    test('it should return 403 if description length is less than 4 chars', async () => {
      const description = randomAlphaNumeric(1,1,0)
      const inputs = createInput({description})
      const response = await request(app)
        .post('/api/v1/recipe/create')
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty('errors')
      expect(response.body.errors[0].field).toBe('description')
    })
    test('it should return 403 if description none space chars are less than 4 chars', async ()=>{
      const description = "  t  1  s";
      const inputs = createInput({description})
      const response = await request(app)
        .post('/api/v1/recipe/create')
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty('errors')
      expect(response.body.errors[0].field).toBe('description')
    })
  })
});
