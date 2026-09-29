import { fireEvent, render, screen } from '@testing-library/react-native';

import MessageCenter from '@/components/insider/message-center';
import { insiderCalls } from '@/test-utils/insider';

const now = 1_700_000_000_000;
const oneDay = 86_400_000;

test('Get Message Center Data requests 100 messages from yesterday to tomorrow', async () => {
  jest.spyOn(Date, 'now').mockReturnValue(now);
  await render(<MessageCenter />);

  await fireEvent.press(screen.getByText('Get Message Center Data'));

  expect(insiderCalls()).toEqual([
    ['getMessageCenterData', 100, new Date(now - oneDay), new Date(now + oneDay), expect.any(Function)],
  ]);
});
