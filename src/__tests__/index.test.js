import request from 'supertest';
import app from '..';
import models from '../../models';


describe('Location Routes', () => {
  let firstLocationId;
  let secondLocationId;
  beforeAll(async () => {
    await models.Location.destroy({ truncate: { cascade: true }, force: true });
  });
  describe('POST api/v1/locations', () => {
    const location = {
      name: 'Test location',
      maleOccupantCount: 20,
      femaleOccupantCount: 40,
    };
    it('creates a valid location and returns 200 response',
      async (done) => {
        const response = await request(app)
          .post('/api/v1/locations')
          .send(location);
        firstLocationId = response.body.location.id;
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
        expect(response.body.error)
          .toEqual('A location with this name and parent location already exists');
        done();
      });

    it('creates a location with existing name but different parentLocationId',
      async (done) => {
        const newLocation = { ...location, parentLocationId: firstLocationId };
        const response = await request(app)
          .post('/api/v1/locations')
          .send(newLocation);
        secondLocationId = response.body.location.id;
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

  describe('PUT api/v1/locations', () => {
    let location = {
      name: 'Update location',
      maleOccupantCount: 50,
      femaleOccupantCount: 40,
    };
    it('updates a valid location and returns 200 response',
      async (done) => {
        const response = await request(app)
          .put(`/api/v1/locations/${firstLocationId}`)
          .send(location);
        expect(response.status).toEqual(200);
        expect(response.body.message)
          .toEqual('Location updated successfully');
        expect(response.body.location)
          .toMatchObject(location);
        done();
      });
    it('throws 404 error if the location is not found',
      async (done) => {
        const response = await request(app)
          .put('/api/v1/locations/5000')
          .send(location);
        expect(response.status).toEqual(404);
        expect(response.body.error)
          .toEqual('Location does not exist');
        done();
      });
    it('throws 422 error if the location body is incomplete',
      async (done) => {
        const response = await request(app)
          .put('/api/v1/locations/5000')
          .send({});
        expect(response.status).toEqual(422);
        expect(response.body.message)
          .toEqual('Request failed due to validation error');
        done();
      });
    it('throws 400 error if locationId and parentLocationId are the same',
      async (done) => {
        location = {
          name: 'Test location',
          maleOccupantCount: 20,
          femaleOccupantCount: 40,
          parentLocationId: secondLocationId,
        };
        const response = await request(app)
          .put(`/api/v1/locations/${secondLocationId}`)
          .send(location);
        expect(response.status).toEqual(400);
        expect(response.body.error)
          .toEqual('parentLocationId should not be the same as locationId');
        done();
      });
  });

  describe('GET api/v1/locations', () => {
    it('gets locations and all sublocations and returns 200 response',
      async (done) => {
        const response = await request(app)
          .get('/api/v1/locations/');
        expect(response.status).toEqual(200);
        expect(response.body.message)
          .toEqual('Locations retrieved successfully');
        expect(response.body.locations.length)
          .toBe(2);
        expect(response.body.locations[0])
          .toHaveProperty('subLocations');
        done();
      });
  });

  describe('DELETE api/v1/locations', () => {
    it('throws 404 error if location does not exist',
      async (done) => {
        const response = await request(app)
          .delete('/api/v1/locations/9000');
        expect(response.status).toEqual(404);
        expect(response.body.error)
          .toEqual('Location does not exist');
        done();
      });
    it('deletes locations and sublocations and returns 200 response',
      async (done) => {
        const response = await request(app)
          .delete(`/api/v1/locations/${firstLocationId}`);
        expect(response.status).toEqual(200);
        expect(response.body.message)
          .toEqual('Location deleted successfully');
        const allLocations = await models.Location.findAll();
        expect(allLocations.length).toBe(0);
        done();
      });
  });
});
