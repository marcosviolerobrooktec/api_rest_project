const request = require('supertest');
const app = require('../server');

describe('POST /api/auth/login', () => {
  it('should log in successfully with valid credentials', async () => {
    const loginData = {
      email: "example2@example.com",
      password: "password123"
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(loginData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Inicio de sesión exitoso');
    expect(response.body.token).toBeDefined();
  });

  it('should return 401 for invalid credentials', async () => {
    const loginData = {
      email: 'wrong@example.com',
      password: 'wrongpassword'
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(loginData);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Usuario no encontrado');
  });
});

describe('GET /api/companies/:id', () => {
  it('should return a company by ID', async () => {
    const response = await request(app).get(`/api/companies/2`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Company One');
  });

  it('should return 404 if company not found', async () => {
    const response = await request(app).get('/api/companies/999999'); 

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Compañía no encontrada');
  });
});