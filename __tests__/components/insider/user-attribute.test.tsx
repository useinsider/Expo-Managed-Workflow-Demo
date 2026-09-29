import { fireEvent, render, screen } from '@testing-library/react-native';
import InsiderGender from 'react-native-insider/src/InsiderGender';

import UserAttribute from '@/components/insider/user-attribute';
import { insiderCalls } from '@/test-utils/insider';

test('Set Attribute sets every attribute on the current user', async () => {
  await render(<UserAttribute />);

  await fireEvent.press(screen.getByText('Set Attribute'));

  expect(insiderCalls()).toEqual([
    ['getCurrentUser'],
    ['user.setName', 'Insider'],
    ['user.setSurname', 'Demo'],
    ['user.setAge', 23],
    ['user.setGender', InsiderGender.Other],
    ['user.setBirthday', expect.any(Date)],
    ['user.setEmailOptin', true],
    ['user.setSMSOptin', false],
    ['user.setPushOptin', true],
    ['user.setLocationOptin', true],
    ['user.setFacebookID', 'Facebook-ID'],
    ['user.setTwitterID', 'Twittter-ID'],
    ['user.setLanguage', 'TR'],
    ['user.setLocale', 'tr_TR'],
  ]);
});
