![Docker Image CI](https://github.com/cnovoab/ze-backend-challenge/workflows/Docker%20Image%20CI/badge.svg?branch=develop&event=push)

# ze-backend-challenge
Code challenge for backend position @ ZX Ventures

## Challenge
https://github.com/ZXVentures/ze-code-challenges/blob/master/backend.md

## Solution
Stack: 
- Node.js
- TypeScript
- Express.js
- Postgres w/Postgis

## Build, Test and Deploy

This solution is containerized using docker-compose.

So you can buiild and start the service using:
```
docker-compose up -d
```

## Run tests
```
docker-compose exec app yarn test
```

## CI/CD (TODO)
```
- Setup a Github action to run tests on push and pull request event
- Setup a github action to deploy master branch on merge event
```

## REST API

### Get partner by ID
GET /ze-backend-challenge/partners/:id
```
- Returns 200 if partner found
- Returns 404 if no partner found
```
### Create Partner
POST /ze-backend-challenge/partners
```
- Returns 200 if partner created succesfully
- Returns 400 if some field missing/invalid
- Returns 409 if partner already exists (criteria: document number)
```
### Find nearest partner by location (lat, lng)
GET /ze-backend-challenge/partners/search?lat=${latitude}&lng=${longitude}
```
- Returns 200 if partner found
- Returns 404 if no partner found
```
### Partner Schema
```
{
  id: integer,
  tradingName: string,
  ownerName: string,
  document: string, // (1)
  coverageArea: GeoJSON(Multipolygon), // (2)
  address: GeoJSON(Point) // (3)
}
```
All fields are required
1. https://en.wikipedia.org/wiki/CNPJ
2. https://geojson.org/geojson-spec.html#point
3. https://geojson.org/geojson-spec.html#multipolygon

The above schema is utilized to respond to all the endpoint described. 
Also this schema (except for the id field) must be used as the schema for the payload of the Create Partner endpoint.

### Future Work
- CI/CD (Github Actions/Heroku)
- Swagger UI (API documentation)
- Authentication (JWT)
- Profile and optimize (if needed) search near partner query

