import { fireEvent, render, screen } from '@testing-library/react-native';

import Wishlist from '@/components/insider/wishlist';
import { createdProducts, exampleProductArgs, insiderCalls } from '@/test-utils/insider';

test.each([
  ['Item Add To Wishlist', (product: unknown) => ['itemAddedToWishlist', product]],
  ['Item Remove From Wishlist', () => ['itemRemovedFromWishlist', 'productID']],
  ['Wishlist Clear', () => ['wishlistCleared']],
  ['Visit Wishlist Page', (product: unknown) => ['visitWishlistPage', [product]]],
])('%s', async (button, expectedCall) => {
  await render(<Wishlist />);

  await fireEvent.press(screen.getByText(button));

  const [product] = createdProducts();
  expect(insiderCalls()).toEqual([['createNewProduct', ...exampleProductArgs], expectedCall(product)]);
});
