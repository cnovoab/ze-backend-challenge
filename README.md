# ze-backend-challenge
Code challenge for backend position @ ZX Ventures

## Build and Run
```
docker-compose up -d
```

## Run tests
```
docker-compose exec app yarn test
```
OR 
```
yarn test
```
If running locally

## REST API

### Get partner by ID
GET /ze-backend-challenge/partners/:id
```
-> Returns 200 if partner found
-> Returns 404 if no partner found
```
### Create Partner
POST /ze-backend-challenge/partners
```
-> Returns 200 if partner created succesfully
-> Returns 400 if some field missing/invalid
-> Returns 409 if partner already exists (criteria: document number)
```
### Find nearest partner by location (lat, lng)
GET /ze-backend-challenge/partners/search?lat=${latitude}&lng=${longitude}
```
-> Returns 200 if partner found
-> Returns 404 if no partner found
```
### Payload Schema
```
{
  id: integer,
  tradingName: string,
  ownerName: string,
  document: string, // Following format 00.000.000/1111-22
  coverageArea: {
    type: 'MultiPolygon',
    coordinates: [Nested array of coordinates]
  },
  address: {
    type: 'Point',
    coordinates: [Array of coordinates]
  }
}
```

The above schema is utilized to respond to all the endpoint described. Also this schema (except for the id field) must be used as the schema for the payload of the Create Partner endpoint.
```
