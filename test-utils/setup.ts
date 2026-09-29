import { insiderMock } from './insider';

beforeEach(() => {
  jest.clearAllMocks();
  insiderMock.__reset();
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});
