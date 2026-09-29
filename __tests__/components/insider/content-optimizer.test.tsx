import { fireEvent, render, screen } from '@testing-library/react-native';
import ContentOptimizerDataType from 'react-native-insider/src/ContentOptimizerDataType';

import ContentOptimizer from '@/components/insider/content-optimizer';
import { insiderCalls } from '@/test-utils/insider';

const callback = expect.any(Function);
const element = ContentOptimizerDataType.Element;

test('Get Variable With Content Optimizer reads cached string, bool and int variables', async () => {
  await render(<ContentOptimizer />);

  await fireEvent.press(screen.getByText('Get Variable With Content Optimizer'));

  expect(insiderCalls()).toEqual([
    ['getContentStringWithName', 'string_variable_name', 'defaultValue', element, callback],
    ['getContentBoolWithName', 'bool_variable_name', true, element, callback],
    ['getContentIntWithName', 'int_variable_name', 10, element, callback],
  ]);
});

test('Get Variable With Content Optimizer (Without Cache) reads uncached variables', async () => {
  await render(<ContentOptimizer />);

  await fireEvent.press(screen.getByText('Get Variable With Content Optimizer (Without Cache)'));

  expect(insiderCalls()).toEqual([
    ['getContentStringWithoutCache', 'string_variable_name', 'defaultValue', element, callback],
    ['getContentBoolWithoutCache', 'bool_variable_name', true, element, callback],
    ['getContentIntWithoutCache', 'int_variable_name', 10, element, callback],
  ]);
});
