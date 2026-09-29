import { fireEvent, render, screen } from '@testing-library/react-native';

import Product from '@/components/insider/product';
import { exampleProductArgs, insiderCalls } from '@/test-utils/insider';

test('Create Product creates a product and sets every attribute', async () => {
  await render(<Product />);

  await fireEvent.press(screen.getByText('Create Product'));

  expect(insiderCalls()).toEqual([
    ['createNewProduct', ...exampleProductArgs],
    ['product.setColor', 'color'],
    ['product.setVoucherName', 'voucherName'],
    ['product.setVoucherDiscount', 10.5],
    ['product.setPromotionName', 'promotionName'],
    ['product.setPromotionDiscount', 10.5],
    ['product.setSize', 'size'],
    ['product.setSalePrice', 10.5],
    ['product.setShippingCost', 10.5],
    ['product.setQuantity', 10],
    ['product.setStock', 10],
    ['product.setCustomAttributeWithString', 'string_parameter', 'This is Insider.'],
    ['product.setCustomAttributeWithInt', 'int_parameter', 10],
    ['product.setCustomAttributeWithDouble', 'double_parameter', 10.5],
    ['product.setCustomAttributeWithBoolean', 'bool_parameter', true],
    ['product.setCustomAttributeWithDate', 'date_parameter', expect.any(Date)],
    ['product.setCustomAttributeWithArray', 'array_parameter', ['value1', 'value2', 'value3']],
  ]);
});
