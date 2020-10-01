const request = require('supertest');
const app = require('../server');

describe('Post Endpoints', () => {
  it('should update new post', async () => {
    const res = await request(app)
      .post('/api/food/updateFoodItem')
      .send({
        label: "Basmati Rice",
        price: 300,
        foodLabel: "Rice"
      });
    expect(res.statusCode).toEqual(200);
  });
});
