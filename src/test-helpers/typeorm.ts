import { connection } from '../initialization/typeorm';
import { getConnection } from 'typeorm';

beforeAll(async () => {
  await connection();
});

beforeEach(async () => {
  expect.hasAssertions();
  await getConnection().synchronize();
});

afterEach(async () => {
  await getConnection().dropDatabase();
});

afterAll(async () => {
  await getConnection().close();
});
