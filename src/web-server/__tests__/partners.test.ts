import * as request from 'supertest';
import * as http from 'http-status-codes';
import PartnerService from '../../services/partner-service';
import { app } from '../index';
import * as partnersData from './fixtures/partners-sample.json';

const PATH = '/ze-backend-challenge/partners';

describe('Create partner', () => {
  test('empty payload', async () => {
    const response = await request(app).post(PATH);

    expect(response.status).toBe(http.BAD_REQUEST);
  });

  test('missing field', async () => {
    const { ownerName, ...partnerObject } = partnersData[0];
    const response = await request(app)
      .post(PATH)
      .send(partnerObject);

    expect(response.status).toBe(http.BAD_REQUEST);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ param: 'ownerName' })
      ])
    );
  });

  test('valid payload', async () => {
    const partnerObject = partnersData[0];
    const response = await request(app)
      .post(PATH)
      .send(partnerObject);

    expect(response.status).toBe(http.OK);
    expect(response.body.document).toEqual(partnerObject.document);
    expect(response.body.coverageArea).toEqual(partnerObject.coverageArea);
    expect(response.body.address).toEqual(partnerObject.address);
    expect(response.body.ownerName).toEqual(partnerObject.ownerName);
    expect(response.body.tradingName).toEqual(partnerObject.tradingName);
  });

  test('already existing partner', async () => {
    const partnerObject = partnersData[0];
    await PartnerService.create(partnerObject);
    const response = await request(app)
      .post(PATH)
      .send(partnerObject);

    expect(response.status).toBe(http.CONFLICT);
  });
});

describe('Get partner', () => {
  test('existing partner', async () => {
    const partnerObject = partnersData[0];
    const partner = await PartnerService.create(partnerObject);

    const response = await request(app).get(`${PATH}/${partner.id}`);
    expect(response.status).toBe(http.OK);
    expect(response.type).toMatch(/json/);
    expect(response.body.id).toEqual(partner.id);
  });

  test('404 if no partner found for given id', async () => {
    const response = await request(app).get(`${PATH}/123`);
    expect(response.status).toBe(http.NOT_FOUND);
    expect(response.type).toMatch(/json/);
  });
});

describe('Search partner by location', () => {
  const testPoint = { lat: -46, lng: -21 };
  test('find nearest partner', async () => {
    const document = '06.004.905/0001-16';

    for (const partnerObject of partnersData) {
      await PartnerService.create(partnerObject);
    }

    const response = await request(app)
      .get(`${PATH}/search`)
      .query(testPoint);
    expect(response.status).toBe(http.OK);
    expect(response.type).toMatch(/json/);
    expect(response.body).toHaveProperty('document', document);
  });

  test('404 if no partner exists', async () => {
    const response = await request(app)
      .get(`${PATH}/search`)
      .query(testPoint);
    expect(response.status).toBe(http.NOT_FOUND);
    expect(response.type).toMatch(/json/);
  });
});
