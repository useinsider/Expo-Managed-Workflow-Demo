import { fireEvent, render, screen } from '@testing-library/react-native';

import InappMessages from '@/components/insider/inapp-messages';
import { insiderCalls } from '@/test-utils/insider';

test.each([
  ['Enable Inapp Messages', 'enableInAppMessages'],
  ['Disable Inapp Messages', 'disableInAppMessages'],
])('%s', async (button, method) => {
  await render(<InappMessages />);

  await fireEvent.press(screen.getByText(button));

  expect(insiderCalls()).toEqual([[method]]);
});
