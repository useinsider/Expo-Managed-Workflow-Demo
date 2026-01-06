import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/theme';

import CustomSection from '@/components/custom-section';
import UserAttribute from '@/components/insider/user-attribute';
import ParallaxScrollView from '@/components/parallax-scroll-view';

import ContentOptimizer from '@/components/insider/content-optimizer';
import Event from '@/components/insider/event';
import GDPR from '@/components/insider/gdpr';
import Geofence from '@/components/insider/geofence';
import InappMessages from '@/components/insider/inapp-messages';
import MessageCenter from '@/components/insider/message-center';
import PageVisit from '@/components/insider/page-visit';
import Product from '@/components/insider/product';
import Purchase from '@/components/insider/purchase';
import SmartRecommender from '@/components/insider/smart-recommender';
import SocialProof from '@/components/insider/social-proof';
import UserIdentifier from '@/components/insider/user-identifier';
import Wishlist from '@/components/insider/wishlist';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#FFFFFF' }}
      headerImage={
        <Image
          source={require('@/assets/images/insider-one.png')}
          style={styles.insiderLogo}
        />
      }>
        <View
          style={{
            backgroundColor: Colors.light.background,
            padding: 0,
            margin: 0
          }}
        >
          <CustomSection title="User Attributes">
            <UserAttribute />
          </CustomSection>

          <CustomSection title="User Identifiers">
            <UserIdentifier />
          </CustomSection>

          <CustomSection title="Event">
            <Event />
          </CustomSection>

          <CustomSection title="Product">
            <Product />
          </CustomSection>

          <CustomSection title="Purchase">
            <Purchase />
          </CustomSection>

          <CustomSection title="Smart Recommender">
            <SmartRecommender />
          </CustomSection>

          <CustomSection title="Social Proof">
            <SocialProof />
          </CustomSection>

          <CustomSection title="Page Visit Methods">
            <PageVisit />
          </CustomSection>

          <CustomSection title="GDPR & Mobile App Access">
            <GDPR />
          </CustomSection>

          <CustomSection title="Message Center">
            <MessageCenter />
          </CustomSection>

          <CustomSection title="Content Optimizer">
            <ContentOptimizer />
          </CustomSection>

          <CustomSection title="Geofence">
            <Geofence />
          </CustomSection>

          <CustomSection title="Inapp Messages">
            <InappMessages />
          </CustomSection>

          <CustomSection title="Wishlist">
            <Wishlist />
          </CustomSection>
        </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  insiderLogo: {
    width: 223,
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 20,
  },
});
