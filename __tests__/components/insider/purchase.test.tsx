import { fireEvent, render, screen } from '@testing-library/react-native';

import Purchase from '@/components/insider/purchase';
import { createdProducts, exampleProductArgs, insiderCalls } from '@/test-utils/insider';

test.each([
  ['Item Add To Cart', (product: unknown) => ['itemAddedToCart', product]],
  ['Item Remove From Cart', () => ['itemRemovedFromCart', 'productID']],
  ['Item Purchase', (product: unknown) => ['itemPurchased', 'uniqueSaleID', product]],
  ['Cart Clear', () => ['cartCleared']],
])('%s', async (button, expectedCall) => {
  await render(<Purchase />);

  await fireEvent.press(screen.getByText(button));

  const [product] = createdProducts();
  expect(insiderCalls()).toEqual([['createNewProduct', ...exampleProductArgs], expectedCall(product)]);
});
