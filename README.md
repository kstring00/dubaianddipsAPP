# Dubai & Dips Native App

A real iOS/Android app for Dubai & Dips built with Expo + React Native + Expo Router.

The visual direction mirrors the approved luxury concept:

- cream / deep green / muted gold palette
- Dubai skyline hero
- Boarding Club rewards card
- featured Dubai Chocolate Frappe
- travel-style "Departures" menu categories
- "Order again" treatment
- native bottom navigation
- haptics and polished press states

## Ordering architecture

The app does **not** rebuild Toast.

Today, while Toast Online Ordering is not active, the app runs as a polished browse/preview experience. Once the restaurant activates Toast, add the live Toast URLs to environment variables and the native CTAs will hand off to Toast for modifiers, cart, payments, loyalty, fulfillment and POS routing.

## Run locally

```bash
npm install
cp .env.example .env
npx expo start
```

The `postinstall` script generates `assets/icon.png` for the native build.

## Preview vs production

Local/preview builds can show sample Boarding Club points:

```env
EXPO_PUBLIC_PREVIEW_MODE=true
```

The production EAS profile sets preview mode to `false` so fake reward balances are never shipped to customers.

## App Store

Production build configuration is included in `eas.json`.

After the business has an Apple Developer / App Store Connect account:

```bash
npx eas-cli login
npx eas-cli init
npx eas-cli build --platform ios --profile production
npx eas-cli submit --platform ios --profile production --latest
```

See `APP_STORE.md` for the remaining business/account requirements.
