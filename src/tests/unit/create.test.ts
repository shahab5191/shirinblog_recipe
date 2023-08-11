import request from "supertest"
import app from "../../app"
import { createInput } from "../factories/createInput"
import { randomAlphaNumeric } from "../factories/random-gen"

describe("Testing create recipe route", () => {
  test("it should return 403 body is empty", async () => {
    await request(app).post("/api/v1/recipe/create").send({}).expect(403)
  })

  describe("testing name field", () => {
    test("it should return 403 if name is empty", async () => {
      const inputs = createInput({ name: "" })
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)

      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("name")
    })
    test("it should return 403 if name lentgh is more than 128 chars", async () => {
      const name = randomAlphaNumeric(100, 28, 5)
      const inputs = createInput({ name })
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)

      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("name")
    })
    test("it should return 200 when name is alphanumeric", async () => {
      const inputs = createInput({})
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(200)
    })
    test("it should return 403 if name length is less than 4 chars", async () => {
      const name = randomAlphaNumeric(1, 1, 0)
      const inputs = createInput({ name })
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("name")
    })
    test("it should return 403 if name none space chars are less than 4 chars", async () => {
      const name = "  t  1  s"
      const inputs = createInput({ name })
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("name")
    })
  })

  describe("testing title field", () => {
    test("it should return 403 if title is empty", async () => {
      const inputs = createInput({ title: "" })
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)

      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("title")
    })
    test("it should return 403 if title lentgh is more than 128 chars", async () => {
      const title = randomAlphaNumeric(100, 28, 5)
      const inputs = createInput({ title })
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)

      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("title")
    })
    test("it should return 200 when title is alphanumeric", async () => {
      const inputs = createInput({})
      await request(app).post("/api/v1/recipe/create").send(inputs).expect(200)
    })
    test("it should return 403 if title length is less than 4 chars", async () => {
      const title = randomAlphaNumeric(1, 1, 0)
      const inputs = createInput({ title })
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("title")
    })
    test("it should return 403 if title none space chars are less than 4 chars", async () => {
      const title = "  t  1  s"
      const inputs = createInput({ title })
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("title")
    })
  })

  describe("testing description field", () => {
    test("it should return 403 if description is empty", async () => {
      const inputs = createInput({ description: "" })
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)

      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("description")
    })
    test("it should return 200 when description is alphanumeric", async () => {
      const inputs = createInput({})
      await request(app).post("/api/v1/recipe/create").send(inputs).expect(200)
    })
    test("it should return 403 if description length is less than 4 chars", async () => {
      const description = randomAlphaNumeric(1, 1, 0)
      const inputs = createInput({ description })
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("description")
    })
    test("it should return 403 if description none space chars are less than 4 chars", async () => {
      const description = "  t  1  s"
      const inputs = createInput({ description })
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("description")
    })
  })

  describe("testing Difficulty field", () => {
    test("it should return 403 if difficulty is empty", async () => {
      const inputs = createInput({ difficulty: "" })
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)

      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("difficulty")
    })
    test("it should return 200 when difficulty is either EASY, MEDIUM or HARD", async () => {
      let inputs = createInput({ difficulty: "EASY" })
      await request(app).post("/api/v1/recipe/create").send(inputs).expect(200)
      inputs.difficulty = "MEDIUM"
      await request(app).post("/api/v1/recipe/create").send(inputs).expect(200)
      inputs.difficulty = "HARD"
      await request(app).post("/api/v1/recipe/create").send(inputs).expect(200)
    })
    test("it should return 403 if difficulty is not EASY, MEDIUM or HARD", async () => {
      const inputs = createInput({ difficulty: "asdfw" })
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("difficulty")
    })
  })

  describe("testing ingredients field", () => {
    test("it should return 403 if title is empty", async () => {
      const inputs = createInput({ ingredients: "" })
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)

      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("ingredients")
    })
    test("it should return 403 if any item of ingredients has length of more than 128 chars", async () => {
      const ingredItem = randomAlphaNumeric(100, 28, 5)
      let inputs = createInput({})
      inputs.ingredients[0] = ingredItem
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)

      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("ingredients")
    })
    test("it should return 200 when ingredients is array of strings", async () => {
      const inputs = createInput({})
      await request(app).post("/api/v1/recipe/create").send(inputs).expect(200)
    })
    test("it should return 403 if any of ingredients length is less than 2 chars", async () => {
      const ingredItem = "a"
      let inputs = createInput({})
      inputs.ingredients[0] = ingredItem
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("ingredients")
    })
    test("it should return 403 if any ingredients item's none space chars are less than 2 chars", async () => {
      const ingredItem = "  t  "
      let inputs = createInput({})
      inputs.ingredients[0] = ingredItem
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("ingredients")
    })
    test("it should return 403 if ingredients is an empty array", async () => {
      const ingredients = [] as any
      const inputs = createInput({ ingredients })
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("ingredients")
    })
  })

  describe("testing categories field", () => {
    test("it should return 403 if categories is empty", async () => {
      const inputs = createInput({ categories: "" })
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)

      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("categories")
    })
    test("it should return 403 if any item of categories has length of more than 128 chars", async () => {
      const categoryItem = randomAlphaNumeric(100, 28, 5)
      let inputs = createInput({})
      inputs.categories[0] = categoryItem
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)

      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("categories")
    })
    test("it should return 200 when categories is array of strings", async () => {
      const inputs = createInput({})
      await request(app).post("/api/v1/recipe/create").send(inputs).expect(200)
    })
    test("it should return 403 if any of categories length is less than 2 chars", async () => {
      const categoryItem = "a"
      let inputs = createInput({})
      inputs.categories[0] = categoryItem
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("categories")
    })
    test("it should return 403 if any categories item's none space chars are less than 2 chars", async () => {
      const categoryItem = "  t  "
      let inputs = createInput({})
      inputs.categories[0] = categoryItem
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("categories")
    })
    test("it should return 403 if categories is an empty array", async () => {
      const categories = [] as any
      const inputs = createInput({ categories })
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("categories")
    })
  })

  describe("testing steps field", () => {
    test("it should return 403 if steps is empty", async () => {
      const inputs = createInput({ steps: "" })
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)

      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("steps")
    })
    test("it should return 403 if any item of steps has length of more than 128 chars", async () => {
      const stepsItem = randomAlphaNumeric(100, 28, 5)
      let inputs = createInput({})
      inputs.steps[0] = stepsItem
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)

      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("steps")
    })
    test("it should return 200 when steps is array of strings", async () => {
      const inputs = createInput({})
      await request(app).post("/api/v1/recipe/create").send(inputs).expect(200)
    })
    test("it should return 403 if any of steps length is less than 4 chars", async () => {
      const stepsItem = "abc"
      let inputs = createInput({})
      inputs.steps[0] = stepsItem
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("steps")
    })
    test("it should return 403 if any steps item's none space chars are less than 4 chars", async () => {
      const stepsInput = "  t  a   s  "
      let inputs = createInput({})
      inputs.steps[0] = stepsInput
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("steps")
    })
    test("it should return 403 if steps is an empty array", async () => {
      const steps = [] as any
      const inputs = createInput({ steps })
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("steps")
    })
  })

  describe("testing Status field", () => {
    test("it should return 403 if status is empty", async () => {
      const inputs = createInput({ status: "" })
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)

      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("status")
    })
    test("it should return 200 when status is either DRAFT, PUBLISH or TRASH", async () => {
      let inputs = createInput({ status: "DRAFT" })
      await request(app).post("/api/v1/recipe/create").send(inputs).expect(200)
      inputs.status = "PUBLISH"
      await request(app).post("/api/v1/recipe/create").send(inputs).expect(200)
      inputs.status = "TRASH"
      await request(app).post("/api/v1/recipe/create").send(inputs).expect(200)
    })
    test("it should return 403 if status is not DRAFT, PUBLISH or TRASH", async () => {
      const inputs = createInput({ status: "asdfw" })
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)

      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("status")
    })
  })

  describe("testing timing field", () => {
    test("it should return 403 if timing is empty", async () => {
      const inputs = createInput({ timing: "" })
      const response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)

      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("timing")
    })
    test("it should return 200 when timing has preparation, cooking and additional properties", async () => {
      let inputs = createInput({})
      await request(app).post("/api/v1/recipe/create").send(inputs).expect(200)
    })
    test("it should return 403 when timing does not have any of preparation, cooking and additional properties", async () => {
      const timing = { cooking: 10, additional: 10 }
      let inputs = createInput({ timing })
      let response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("timing")

      const timing2 = { preparation: 10, additional: 10 }
      inputs = createInput({ timing: timing2 })
      response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("timing")

      const timing3 = { cooking: 10, preparation: 10 }
      inputs = createInput({ timing: timing3 })
      response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("timing")
    })
    test("it should return 403 when any properties of timing is not of type number", async () => {
      const timing = { preparation: "", cooking: 10, additional: 10 }
      let inputs = createInput({ timing })
      let response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("timing")

      const timing2 = { preparation: 10, cooking: null, additional: 10 }
      inputs = createInput({ timing: timing2 })
      response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("timing")

      const timing3 = { preparation: 10, cooking: 10, additional: undefined }
      inputs = createInput({ timing: timing3 })
      response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("timing")
    })
    test("it should return 403 when any properties of timing has more properties than defined", async () => {
      const timing = {
        preparation: 10,
        cooking: 10,
        additional: 10,
        extraItem: 10,
      }
      let inputs = createInput({ timing })
      let response = await request(app)
        .post("/api/v1/recipe/create")
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("timing")
    })
  })

  describe("testing servings field", () => {
    test("should return 403 if servings field is not int", async () => {
      let inputs = createInput({servings: "aa"})
      let response = await request(app)
        .post('/api/v1/recipe/create')
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("servings")

      inputs = createInput({servings: null})
      response = await request(app)
        .post('/api/v1/recipe/create')
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("servings")

      inputs = createInput({})
      inputs.servings = undefined
      response = await request(app)
        .post('/api/v1/recipe/create')
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("servings")

      inputs = createInput({servings: 1.4})
      response = await request(app)
        .post('/api/v1/recipe/create')
        .send(inputs)
        .expect(403)
      expect(response.body).toHaveProperty("errors")
      expect(response.body.errors[0].field).toBe("servings")
    })
    test("should return 200 if servings field is int", async () => {
      const inputs = createInput({})
      const response = await request(app)
        .post('/api/v1/recipe/create')
        .send(inputs)
        .expect(200)
    })
  })
})
