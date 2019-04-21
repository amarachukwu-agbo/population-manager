import request from 'supertest';
import app from '..';
import models from '../../models';


describe('Location Routes', () => {
  beforeAll(async () => {
    await models.Location.destroy({ truncate: { cascade: true }, force: true });
  });
  describe('POST api/v1/locations', () => {
    const location = {
      name: 'Test location',
      maleOccupantCount: 20,
      femaleOccupantCount: 40,
    };
    let parentLocationId;
    it('creates a valid location and returns 200 response',
      async (done) => {
        const response = await request(app)
          .post('/api/v1/locations')
          .send(location);
        parentLocationId = response.body.location.id;
        expect(response.status).toEqual(201);
        expect(response.body.message)
          .toEqual('Location successfully created');
        expect(response.body.location)
          .toMatchObject({ ...location, totalResidents: 60 });
        done();
      });

    it('throws 409 error if location with name and parentLocationId already exists',
      async (done) => {
        const response = await request(app)
          .post('/api/v1/locations')
          .send(location);
        expect(response.status).toEqual(409);
        expect(response.body.message)
          .toEqual('Error creating location');
        expect(response.body.error)
          .toEqual('A location with this name and parent location already exists');
        done();
      });

    it('creates a location with existing name but different parentLocationId',
      async (done) => {
        const newLocation = { ...location, parentLocationId };
        const response = await request(app)
          .post('/api/v1/locations')
          .send(newLocation);
        expect(response.status).toEqual(201);
        expect(response.body.message)
          .toEqual('Location successfully created');
        expect(response.body.location)
          .toMatchObject(newLocation);
        done();
      });

    it('throws 400 error if parentLocationId does not exist',
      async (done) => {
        const newLocation = { ...location, parentLocationId: 1000 };
        const response = await request(app)
          .post('/api/v1/locations')
          .send(newLocation);
        expect(response.status).toEqual(400);
        expect(response.body.error)
          .toEqual('Parent location does not exist');
        done();
      });

    it('throws 422 error if there is a validation error in the location body',
      async (done) => {
        const response = await request(app)
          .post('/api/v1/locations')
          .send({ ...location, name: '', maleOccupantCount: [] });
        expect(response.status).toEqual(422);
        expect(response.body.message)
          .toEqual('Request failed due to validation error');
        expect(response.body.errors)
          .toEqual([{
            location: 'body',
            msg: 'Name cannot be empty and must be between 3 and 50 characters long',
            param: 'name',
            value: '',
          }, {
            location: 'body',
            msg: 'maleOccupantCount cannot be empty and must be a positive integer',
            param: 'maleOccupantCount',
            value: [],
          }]);
        done();
      });
  });
});
