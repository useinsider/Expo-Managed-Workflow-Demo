import { render } from '@testing-library/react-native';
import InsiderCallbackType from 'react-native-insider/src/InsiderCallbackType';

import RootLayout from '@/app/_layout';
import { insiderCalls, insiderMock } from '@/test-utils/insider';

// The layout imports reanimated only for its side effects, which need the native worklets runtime.
jest.mock('react-native-reanimated', () => ({}));

jest.mock('expo-router', () => {
  const Stack = Object.assign(() => null, { Screen: () => null });
  return {
    DarkTheme: {},
    DefaultTheme: {},
    Stack,
    ThemeProvider: ({ children }: { children: unknown }) => children,
  };
});

test('initialises the SDK with the placeholder partner and disables data collection', async () => {
  await render(<RootLayout />);

  expect(insiderCalls()).toEqual([
    ['init', '{YOUR_PARTNER_NAME}', '{YOUR_APP_GROUP}', expect.any(Function)],
    ['registerWithQuietPermission', false],
    ['setActiveForegroundPushView'],
    ['startTrackingGeofence'],
    ['enableIDFACollection', false],
    ['enableIpCollection', false],
    ['enableLocationCollection', false],
    ['enableCarrierCollection', false],
  ]);
});

test('init callback logs the callback types it handles', async () => {
  await render(<RootLayout />);
  const onInsiderCallback = insiderMock.init.mock.calls[0][2];

  onInsiderCallback(InsiderCallbackType.NOTIFICATION_OPEN, { id: 1 });
  onInsiderCallback(InsiderCallbackType.SESSION_STARTED, { id: 2 });

  expect(console.log).toHaveBeenCalledWith('[INSIDER][NOTIFICATION_OPEN]: ', { id: 1 });
  expect(console.log).toHaveBeenCalledWith('[INSIDER][SESSION_STARTED]: ', { id: 2 });
});

test('InsiderCallbackType stub matches the published SDK', () => {
  const actual = jest.requireActual('react-native-insider/src/InsiderCallbackType').default;

  expect(InsiderCallbackType).toEqual(actual);
});
