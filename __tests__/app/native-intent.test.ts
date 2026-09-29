import { redirectSystemPath } from '@/app/+native-intent';
import { insiderCalls } from '@/test-utils/insider';

// Mirrors the unfilled partner placeholder the demo ships with.
const insiderLink = 'insider{YOUR_PARTNER_NAME}://test-device?id=abc';

test('hands Insider links to the SDK and stops the router from navigating', () => {
  expect(redirectSystemPath({ path: insiderLink, initial: true })).toBe('');
  expect(insiderCalls()).toEqual([['handleURL', insiderLink]]);
});

test.each(['/', '/(tabs)', 'expodemomw://home', 'insiderotherpartner://test'])(
  'passes %s through untouched',
  (path) => {
    expect(redirectSystemPath({ path, initial: false })).toBe(path);
    expect(insiderCalls()).toEqual([]);
  },
);
