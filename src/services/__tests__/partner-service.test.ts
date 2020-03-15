import Partner from '../../entities/partner';
import PartnerService from '../partner-service';
import * as partnersData from './fixtures/partners-sample.json';

describe('Partner Service', () => {

  test('Create partner', async()  => {
    const partnerObject = partnersData[0];
    const partner = await PartnerService.create(partnerObject);
    expect(partner).toBeDefined();
    expect(partner).toHaveProperty('id');
    expect(partner).toBeInstanceOf(Partner);
  });

  test('Get partner by id', async()  => {
    const partnerObject = partnersData[1];
    const partner = await PartnerService.create(partnerObject);

    await expect(
      PartnerService.findById(partner.id)
    ).resolves.toHaveProperty('document', partnerObject.document);
  });

  test('Find nearest partner', async()  => {
    const partnerIndex = 2;
    for (const partnerObject of partnersData) {
      await PartnerService.create(partnerObject);
    }
    await expect(Partner.count()).resolves.toEqual(partnersData.length);

    const testPoint = { lat: -38, lng: -3 };

    await expect(
      PartnerService.findNearest(testPoint.lat, testPoint.lng)
    ).resolves.toHaveProperty('document', partnersData[partnerIndex].document);
  });

  test('Find nearest partner when no partners exists', async()  => {
    const testPoint = { lat: -38, lng: -3 };
    await expect(Partner.count()).resolves.toEqual(0);

    await expect(
      PartnerService.findNearest(testPoint.lat, testPoint.lng)
    ).rejects.toThrow(/Couldn't find any/);
  });
});
