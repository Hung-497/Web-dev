const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/userModel");
const Workout = require("../models/workoutModel");
const workouts = require("./data/workouts.js");

const api = supertest(app);
let token = null;

const authorizedRequest = (request) =>
  request.set("Authorization", "bearer " + token);

const createWorkout = async (workout) => {
  await authorizedRequest(api.post("/api/workouts")).send(workout).expect(201);
};

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/user/signup")
    .send({ email: "mattiv@matti.fi", password: "R3g5T7#gh" });

  token = result.body.token;
});

describe("POST /api/user/signup", () => {
  it("should return a token on successful signup", () => {
    expect(token).not.toBeNull();
  });
});

describe("GET /api/workouts", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
    await createWorkout(workouts[0]);
    await createWorkout(workouts[1]);
  });

  it("should return workouts as JSON with status 200", async () => {
    await authorizedRequest(api.get("/api/workouts"))
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should return all workouts belonging to the authenticated user", async () => {
    const response = await authorizedRequest(api.get("/api/workouts")).expect(
      200,
    );

    expect(response.body).toHaveLength(2);
  });

  it("should return 401 when no token is provided", async () => {
    await api.get("/api/workouts").expect(401);
  });
});

describe("POST /api/workouts", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
  });

  describe("when the payload is valid", () => {
    it("should create a workout and return status 201", async () => {
      const newWorkout = { title: "testworkout", reps: 10, load: 100 };

      await authorizedRequest(api.post("/api/workouts"))
        .send(newWorkout)
        .expect(201);
    });

    it("should persist the new workout in the database", async () => {
      const newWorkout = { title: "Situps", reps: 25, load: 10 };
      await createWorkout(newWorkout);

      const response = await authorizedRequest(api.get("/api/workouts"));
      const titles = response.body.map((workout) => workout.title);

      expect(titles).toContain("Situps");
    });
  });

  describe("when the payload is invalid", () => {
    it("should return status 400 when title is missing", async () => {
      const newWorkout = { reps: 10, load: 100 };

      await authorizedRequest(api.post("/api/workouts"))
        .send(newWorkout)
        .expect(400);
    });

    it("should not persist a workout when the payload is invalid", async () => {
      const newWorkout = { reps: 10 };
      await authorizedRequest(api.post("/api/workouts"))
        .send(newWorkout)
        .expect(400);

      const response = await authorizedRequest(api.get("/api/workouts"));
      expect(response.body).toHaveLength(0);
    });
  });
});

describe("GET /api/workouts/:id", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
    await createWorkout(workouts[0]);
  });

  it("should return the requested workout as JSON with status 200", async () => {
    const allWorkouts = await authorizedRequest(api.get("/api/workouts"));
    const id = allWorkouts.body[0]._id;

    const response = await authorizedRequest(api.get(`/api/workouts/${id}`))
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.title).toBe(workouts[0].title);
  });

  it("should return 404 when the workout does not exist", async () => {
    const missingId = "000000000000000000000000";

    await authorizedRequest(api.get(`/api/workouts/${missingId}`)).expect(404);
  });
});

describe("DELETE /api/workouts/:id", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
    await createWorkout(workouts[0]);
    await createWorkout(workouts[1]);
  });

  it("should return status 200 and remove the workout from the database", async () => {
    const allWorkouts = await authorizedRequest(api.get("/api/workouts"));
    const workoutToDelete = allWorkouts.body[0];

    const response = await authorizedRequest(
      api.delete(`/api/workouts/${workoutToDelete._id}`),
    ).expect(200);
    expect(response.body._id).toBe(workoutToDelete._id);

    const remaining = await authorizedRequest(api.get("/api/workouts"));
    const remainingIds = remaining.body.map((workout) => workout._id);
    expect(remainingIds).not.toContain(workoutToDelete._id);
    expect(remaining.body).toHaveLength(1);
  });
});

describe("PATCH /api/workouts/:id", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
    await createWorkout(workouts[0]);
  });

  it("should return status 200 and persist the updated fields", async () => {
    const allWorkouts = await authorizedRequest(api.get("/api/workouts"));
    const id = allWorkouts.body[0]._id;

    await authorizedRequest(api.patch(`/api/workouts/${id}`))
      .send({ reps: 99 })
      .expect(200);

    const updated = await authorizedRequest(api.get(`/api/workouts/${id}`));
    expect(updated.body.reps).toBe(99);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
