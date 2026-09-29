import { fireEvent, render, screen } from '@testing-library/react-native';

import UserIdentifier from '@/components/insider/user-identifier';
import { insiderCalls } from '@/test-utils/insider';

test('Login logs the current user in with an email identifier', async () => {
  await render(<UserIdentifier />);

  await fireEvent.press(screen.getByText('Login'));

  expect(insiderCalls()).toEqual([
    ['getCurrentUser'],
    ['user.login', { identifiers: { addEmail: 'mobilexuseinsider@useinsider.com' } }, expect.any(Function)],
  ]);
});

test('Logout logs the current user out', async () => {
  await render(<UserIdentifier />);

  await fireEvent.press(screen.getByText('Logout'));

  expect(insiderCalls()).toEqual([['getCurrentUser'], ['user.logout']]);
});

test('Logout Resetting Insider ID resets the Insider ID on logout', async () => {
  await render(<UserIdentifier />);

  await fireEvent.press(screen.getByText('Logout Resetting Insider ID'));

  expect(insiderCalls()).toEqual([
    ['getCurrentUser'],
    ['user.logoutResettingInsiderID', null, expect.any(Function)],
  ]);
});
