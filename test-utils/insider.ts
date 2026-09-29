import RNInsider from 'react-native-insider';

type InsiderMock = {
  __calls: unknown[][];
  __reset: () => void;
  init: jest.Mock;
  createNewProduct: jest.Mock;
  getSmartRecommendation: jest.Mock;
};

// Resolves to __mocks__/react-native-insider.js; jest.requireMock would hand back a separate instance.
export const insiderMock = RNInsider as unknown as InsiderMock;

export const insiderCalls = () => insiderMock.__calls;

export const createdProducts = () =>
  insiderMock.createNewProduct.mock.results.map((result) => result.value);

export const exampleProductArgs = [
  'productID',
  'productName',
  ['taxonomy1', 'taxonomy2', 'taxonomy3'],
  'imageURL',
  1000.5,
  'currency',
];
