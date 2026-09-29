import { fireEvent, render, screen } from '@testing-library/react-native';

import GDPR from '@/components/insider/gdpr';
import { insiderCalls } from '@/test-utils/insider';

test.each([
  ['GDPR True', ['setGDPRConsent', true]],
  ['GDPR False', ['setGDPRConsent', false]],
  ['Mobile App Access True', ['setMobileAppAccess', true]],
  ['Mobile App Access False', ['setMobileAppAccess', false]],
])('%s', async (button, expectedCall) => {
  await render(<GDPR />);

  await fireEvent.press(screen.getByText(button));

  expect(insiderCalls()).toEqual([expectedCall]);
});
