import { act, fireEvent, render, screen } from '@testing-library/react-native';

import SmartRecommender from '@/components/insider/smart-recommender';
import { createdProducts, exampleProductArgs, insiderCalls, insiderMock } from '@/test-utils/insider';

const callback = expect.any(Function);

test('Get Smart Recommender Data requests recommendations by id, product and product ids', async () => {
  await render(<SmartRecommender />);

  await fireEvent.press(screen.getByText('Get Smart Recommender Data'));

  const [product] = createdProducts();
  expect(insiderCalls()).toEqual([
    ['createNewProduct', ...exampleProductArgs],
    ['getSmartRecommendation', 1, 'tr_TR', 'TRY', callback],
    ['getSmartRecommendationWithProduct', product, 1, 'tr_TR', callback],
    ['getSmartRecommendationWithProductIDs', ['XX', 'YY', 'ZZ'], 1, 'en_US', 'US', callback],
  ]);
});

test('Trigger Add To Cart & Purchase clicks, adds and purchases once recommendations arrive', async () => {
  const now = 1_700_000_000_000;
  jest.spyOn(Date, 'now').mockReturnValue(now);
  await render(<SmartRecommender />);

  await fireEvent.press(screen.getByText('Trigger Add To Cart & Purchase'));

  const [product] = createdProducts();
  expect(insiderCalls()).toEqual([
    ['createNewProduct', ...exampleProductArgs],
    ['getSmartRecommendation', 1, 'tr_TR', 'TRY', callback],
  ]);

  const onRecommendation = insiderMock.getSmartRecommendation.mock.calls[0][3];
  await act(() => onRecommendation({}));

  expect(insiderCalls().slice(2)).toEqual([
    ['clickSmartRecommendationProduct', 1, product],
    ['itemAddedToCart', product],
    ['itemPurchased', `sale_id_${now}`, product],
  ]);
});
