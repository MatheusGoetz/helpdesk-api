import request from 'supertest';
import { app } from '@/app';
import { prisma } from '@/database/prisma';

describe('TaskController', () => {
  let token: string;
  let user_id: string;
  let team_id: string;

  beforeAll(async () => {
    await prisma.taskHistory.deleteMany();
    await prisma.tasks.deleteMany();
    await prisma.teamMembers.deleteMany(); // ou o nome correto do modelo no schema
    await prisma.teams.deleteMany();
    await prisma.user.deleteMany();
  });



  it('should authenticate and get access token', async () => {
    const userResponse = await request(app).post('/users').send({
      name: 'Task User',
      email: 'task_user@example.com',
      password: 'password123',
      role: 'admin',
    });

    console.log("USER RESPONSE BODY:", userResponse.body);

    user_id = userResponse.body.id;

    const sessionResponse = await request(app).post('/sessions').send({
      email: 'task_user@example.com',
      password: 'password123',
    });

    token = sessionResponse.body.token;
    console.log('TOKEN GERADO:', token); 

    expect(sessionResponse.status).toBe(200);
    expect(token).toEqual(expect.any(String));
  });

  it("should create a new team", async () => {
  const responseTeam = await request(app)
    .post("/teams")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Task Team",
      description: "Handles all task-related activities",
    });

    team_id = responseTeam.body.id;


  console.log("RESPONSE STATUS:", responseTeam.status);
  console.log("RESPONSE BODY:", responseTeam.body);

  expect(responseTeam.status).toBe(201);
  expect(responseTeam.body).toHaveProperty("id");
  });

  it("should create a new task", async () => {
  console.log("user_id:", user_id)
  console.log("team_id:", team_id)

  const taskResponse = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: "New Task",
      description: "This is a new task for testing.",
      assignedTo: user_id,
      teamId: team_id
    })

  console.log("TASK RESPONSE STATUS:", taskResponse.status)
  console.log("TASK RESPONSE BODY:", taskResponse.body)

  expect(taskResponse.status).toBe(201)
  expect(taskResponse.body).toHaveProperty("id")
  })
});
