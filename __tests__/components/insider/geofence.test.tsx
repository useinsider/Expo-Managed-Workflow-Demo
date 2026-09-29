import { fireEvent, render, screen } from '@testing-library/react-native';

import Geofence from '@/components/insider/geofence';
import { insiderCalls } from '@/test-utils/insider';

test('Start Tracking Geofence starts geofence tracking', async () => {
  await render(<Geofence />);

  await fireEvent.press(screen.getByText('Start Tracking Geofence'));

  expect(insiderCalls()).toEqual([['startTrackingGeofence']]);
});
