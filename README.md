# Dubai & Dips App

Native iOS/Android app shell for Dubai & Dips.

- **Frontend:** Expo + React Native + Expo Router
- **Ordering:** Toast Online Ordering remains the transaction engine
- **App role:** premium home/discovery experience, featured products, category handoff, rewards/account entry points

## Run locally

```bash
npm install
npx expo start
```

Choose iOS Simulator, Android emulator, or a development build.

## Connect Toast

Copy `.env.example` to `.env` and replace the placeholder URLs with the real Toast Online Ordering URLs.

```bash
cp .env.example .env
```

The app intentionally does **not** rebuild Toast cart, modifiers, payments, fulfillment, loyalty, or POS logic.
