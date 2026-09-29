import { fireEvent, render, screen } from '@testing-library/react-native';

import SocialProof from '@/components/insider/social-proof';
import { createdProducts, exampleProductArgs, insiderCalls } from '@/test-utils/insider';

test('Trigger Social Proof visits the product detail page', async () => {
  await render(<SocialProof />);

  await fireEvent.press(screen.getByText('Trigger Social Proof'));

  const [product] = createdProducts();
  expect(insiderCalls()).toEqual([
    ['createNewProduct', ...exampleProductArgs],
    ['visitProductDetailPage', product],
  ]);
});
