import request from 'supertest';
import { app } from '@/app';
import { prisma } from '@/database/prisma';

describe('TeamsController', () => {
  let token: string;
  let team_id: string;
  let user_id: string;

  beforeAll(async () => {
    await prisma.taskHistory.deleteMany();
    await prisma.tasks.deleteMany();
    await prisma.teamMembers.deleteMany(); // ou o nome correto do modelo no schema
    await prisma.teams.deleteMany();
    await prisma.user.deleteMany();
  });

  it('should authenticate and get access token', async () => {
    const userResponse = await request(app).post('/users').send({
      name: 'Teams User',
      email: 'teams_user@example.com',
      password: 'password123',
      role: 'admin',
    });

    user_id = userResponse.body.id;

    const sessionResponse = await request(app).post('/sessions').send({
      email: 'teams_user@example.com',
      password: 'password123',
    });

    token = sessionResponse.body.token;
    console.log('TOKEN GERADO:', token); // 👀

    expect(sessionResponse.status).toBe(200);
    expect(token).toEqual(expect.any(String));
  });

  it("should create a new team", async () => {
  const response = await request(app)
    .post("/teams")
    .set("Authorization", `Bearer ${token}`) // ⚠️ Bearer + token
    .send({
      name: "Development Team",
      description: "Handles all development tasks",
    });

    team_id = response.body.id;

  console.log("RESPONSE STATUS:", response.status);
  console.log("RESPONSE BODY:", response.body);

  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty("id");
  });
});
