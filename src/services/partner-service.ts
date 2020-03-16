import Partner from '../entities/partner';

export default class PartnerService {

  static async create(payload: any): Promise<Partner> {
    return await Partner.create({
      tradingName: payload.tradingName,
      ownerName: payload.ownerName,
      document: payload.document,
      coverageArea: payload.coverageArea,
      address: payload.address
    }).save();
  }

  static async findById(id: number | string): Promise<Partner> {
    return await Partner.findOneOrFail(id);
  }

  static async findNearest(lat: number, lng: number): Promise<Partner> {
    const origin = {
      type: 'Point',
      coordinates: [lat, lng]
    };
    const areaDistanceClause =
        'ST_Distance("coverageArea", ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID("coverageArea")))';
    const addressDistanceClause =
        'ST_Distance("address", ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID("address")))';
    const partner = await Partner
      .getRepository()
      .createQueryBuilder()
      .orderBy(areaDistanceClause)
      .addOrderBy(addressDistanceClause)
      .setParameter('origin', JSON.stringify(origin))
      .limit(1)
      .getOne();

    if (!partner) {
      throw new Error('Couldn\'t find any partner near given location');
    }

    return partner;
  }
}
