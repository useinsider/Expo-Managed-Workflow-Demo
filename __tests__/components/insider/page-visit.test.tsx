import { fireEvent, render, screen } from '@testing-library/react-native';

import PageVisit from '@/components/insider/page-visit';
import { createdProducts, exampleProductArgs, insiderCalls } from '@/test-utils/insider';

const taxonomy = ['taxonomy1', 'taxonomy2', 'taxonomy3'];

test.each([
  ['Home Page', () => ['visitHomePage']],
  ['Product Page', () => ['visitListingPage', taxonomy]],
  ['Cart Page', (product: unknown) => ['visitCartPage', [product, product]]],
  ['Category Page', (product: unknown) => ['visitProductDetailPage', product]],
])('%s', async (button, expectedCall) => {
  await render(<PageVisit />);

  await fireEvent.press(screen.getByText(button));

  const [product] = createdProducts();
  expect(insiderCalls()).toEqual([['createNewProduct', ...exampleProductArgs], expectedCall(product)]);
});
