import { MultiPolygon, Point } from 'geojson';
import Partner from '../partner';
import * as partnerData from './fixtures/partner.json';

describe('Partner entity', () => {
  const { coverageArea, address, ...data } = partnerData;
  const partnerObject = {
    coverageArea: <MultiPolygon> coverageArea,
    address: <Point> address,
    ...data
  };

  test('Create valid partner', async()  => {
    const partner = await Partner.create(partnerObject).save();
    expect(partner).toBeDefined();
    expect(partner).toHaveProperty('id');
    expect(partner).toBeInstanceOf(Partner);
  });

  test('Create 2 partners with the same CNPJ', async()  => {
    await Partner.create(partnerObject).save();
    await expect(
      Partner.create(partnerObject).save()
    ).rejects.toThrowError(/unique/);
  });

  test('Create invalid partner (no address)', async()  => {
    await expect(
      Partner.create({
        coverageArea: coverageArea as MultiPolygon,
        ...data
      }).save()
    ).rejects.toThrowError(/address/);
  });
});
