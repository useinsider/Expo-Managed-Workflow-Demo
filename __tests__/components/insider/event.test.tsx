import { fireEvent, render, screen } from '@testing-library/react-native';

import Event from '@/components/insider/event';
import { insiderCalls } from '@/test-utils/insider';

test('Trigger Events tags three events with their parameters and builds each', async () => {
  await render(<Event />);

  await fireEvent.press(screen.getByText('Trigger Events'));

  expect(insiderCalls()).toEqual([
    ['tagEvent', 'first_event'],
    ['event.build'],
    ['tagEvent', 'second_event'],
    ['event.addParameterWithInt', 'int_parameter', 10],
    ['event.build'],
    ['tagEvent', 'third_event'],
    ['event.addParameterWithString', 'string_parameter', 'This is Insider.'],
    ['event.addParameterWithInt', 'int_parameter', 10],
    ['event.addParameterWithDouble', 'double_parameter', 10.5],
    ['event.addParameterWithBoolean', 'bool_parameter', true],
    ['event.addParameterWithDate', 'date_parameter', expect.any(Date)],
    ['event.addParameterWithArray', 'array_parameter', ['value1', 'value2', 'value3']],
    ['event.build'],
  ]);
});
