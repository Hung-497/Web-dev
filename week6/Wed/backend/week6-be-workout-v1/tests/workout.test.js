const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Workout = require("../models/workoutModel");

beforeEach(async () => {
  await Workout.deleteMany({});
  let workoutObject = new Workout(initialWorkouts[0]);
  await workoutObject.save();
  workoutObject = new Workout(initialWorkouts[1]);
  await workoutObject.save();
});

afterAll(() => {
  mongoose.connection.close();
});

const initialWorkouts = [
  {
    title: "test workout 1",
    reps: 11,
    load: 101,
  },
  {
    title: "test workout 2",
    reps: 12,
    load: 102,
  },
];

const workoutsInDb = async () => {
  const workouts = await Workout.find({});
  return workouts.map((workout) => workout.toJSON());
};
// -- Get /api/workouts
describe("GET /api/workouts", () => {
  it("should return all workouts", async () => {
    const response = await api.get("/api/workouts");

    expect(response.body).toHaveLength(initialWorkouts.length);
  });

  it("should contain a specific workout in the returned list", async () => {
    const response = await api.get("/api/workouts");

    const contents = response.body.map((r) => r.title);
    expect(contents).toContain("test workout 2");
  });

  it("should return workouts in JSON format", async () => {
    await api
      .get("/api/workouts")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

// -- Post /api/workouts/
describe("POST /api/workouts", () => {
  describe("when the payload is valid", () => {
    it("should create a new workout and return status 201", async () => {
      const newWorkout = {
        title: "test workout 3",
        reps: 13,
        load: 103,
      };

      await api
        .post("/api/workouts")
        .send(newWorkout)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const workoutsAtEnd = await workoutsInDb();
      expect(workoutsAtEnd).toHaveLength(initialWorkouts.length + 1);

      const contents = workoutsAtEnd.map((r) => r.title);
      expect(contents).toContain("test workout 3");
    });
  });
  
  describe("when the payload is invalid", () => {
    it("should return status 400 when title is missing", async () => {
      const newWorkout = {
        reps: 14,
        load: 104,
      };

      await api.post("/api/workouts").send(newWorkout).expect(400);

      const workoutsAtEnd = await workoutsInDb();
      expect(workoutsAtEnd).toHaveLength(initialWorkouts.length);
    });
  });
});

// -- Delete /api/workouts/:id
describe("DELETE /api/workouts/:id", () => {
  it("should delete a workout and return status 204 when id is valid", async () => {
    const workoutsAtStart = await workoutsInDb();
    const workoutToDelete = workoutsAtStart[0];

    await api.delete(`/api/workouts/${workoutToDelete.id}`).expect(204);

    const workoutsAtEnd = await workoutsInDb();
    expect(workoutsAtEnd).toHaveLength(initialWorkouts.length - 1);

    const contents = workoutsAtEnd.map((r) => r.title);
    expect(contents).not.toContain(workoutToDelete.title);
  });
});
