# App Store Release — Dubai & Dips

The native project is configured for an iOS production build with bundle identifier:

`com.dubaianddips.app`

## Before submission

1. Enroll the business in the Apple Developer Program.
2. Create/confirm the app record in App Store Connect.
3. Confirm that `com.dubaianddips.app` is available to the team's Apple Developer account.
4. Run `npm install` once so the branded icon is generated in `assets/icon.png`.
5. Install EAS CLI and sign into the Expo account that will own the production build.
6. Run `eas init` once to attach the Expo project ID.
7. Build:
   `eas build --platform ios --profile production`
8. Submit:
   `eas submit --platform ios --profile production --latest`

## Listing draft

**Name:** Dubai & Dips

**Subtitle:** Sweet destinations ahead

**Category:** Food & Drink

**Description draft:**
Discover Dubai & Dips from your phone. Explore signature frappes, matcha, coffee and desserts through a travel-inspired experience. Online ordering and Boarding Club rewards will connect to Toast when the restaurant activates those channels.

**Keywords:** dessert, coffee, matcha, frappe, pistachio, Dubai, cafe

## Still needed from the business

- Apple Developer / App Store Connect account access
- Support URL
- Privacy policy URL
- Final app screenshots
- Final store description and contact information
- Toast Online Ordering URL when activated
- Toast Loyalty URL when activated

Do not submit fake rewards balances or unavailable ordering features to production. Production builds disable preview-mode sample points by default.
