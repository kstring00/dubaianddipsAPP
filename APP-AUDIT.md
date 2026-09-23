# Dubai & Dips App — Pre-Ship Audit

**Date:** 2026-09-23
**Commit audited:** `1737d7a` on `main`
**Type:** read-only. No code was changed; this file is the only addition.

**How this was checked**

- Read all 30 source files (`app/`, `components/`, `constants/`, `lib/`), plus the config, scripts and docs.
- Ran `npm run typecheck` (clean) and `npx expo config --type public`.
- Ran `npx expo prebuild` in a **throwaway copy outside the repo** to see what the native iOS/Android projects will actually contain: permissions, SDK levels, privacy manifest, signing.
- Earlier in this session the app was rendered headlessly at 320, 375 and 430pt widths with no runtime errors.

**What was not done:** no build on a physical device, no Xcode build, no store submission. Everything about review outcomes below is a judgment call, not a guarantee.

---

## TL;DR

- **It is a real native app, not a reskinned Toast page.** It has zero WebViews and makes zero Toast API calls.
- **It is also a brochure.** It shows 4 hard-coded menu items and a points card with sample data. Its one working action hands a URL to Safari or Chrome, which takes the user out of the app. No Toast URL is configured anywhere, so a production build today would answer every order button with "Online ordering is almost here."
- **Apple would very likely reject it as-is**, under Guideline 2.1 (placeholder content, dead buttons) and 4.2 / 4.2.2 (minimum functionality, "collection of links").
- **Remaining work to ship:** about **189 hours likely** (range 103–332), plus about **44 hours a year** of upkeep.

---

## Task 1 — What this is, actually

### Stack

| Item | Value | Evidence |
|---|---|---|
| Expo SDK | **57** (`expo` 57.0.24) | `package.json:16`; resolved `sdkVersion: '57.0.0'` |
| React Native | **0.86.3** (React 19.2.3), New Architecture on, Hermes | `package.json:25-27`, `app.json:9` |
| Workflow | **Managed (Continuous Native Generation).** No `ios/` or `android/` folders are committed; EAS generates them at build time. | repo root |
| Router | **Expo Router 57.0.22** (file-based). A native Stack at the root, with the JS bottom-tab navigator (`Tabs`) inside it. | `app/_layout.tsx`, `app/(tabs)/_layout.tsx` |
| Native modules the app code uses | expo-haptics, expo-linking (via RN `Linking`), expo-linear-gradient (one component), @expo/vector-icons, safe-area-context, screens | imports |
| Installed but **unused** by app code | `expo-web-browser` (never imported); `react-native-reanimated` and `react-native-worklets` (no app imports) | grep |

### Every screen

| Route | File | What it is | Native or web? | External URLs loaded |
|---|---|---|---|---|
| Root layout | `app/_layout.tsx` | Native Stack plus the status bar | Native | none |
| Tab layout | `app/(tabs)/_layout.tsx` | Bottom tab bar with 4 tabs (Ionicons, haptic on tap) | Native (RN views) | none |
| Home | `app/(tabs)/index.tsx` | Greeting, Boarding Club card, featured drink, "Departures" tickets, "Order again" | Native | none. Buttons may hand a URL to the OS browser (see below). |
| Order | `app/(tabs)/order.tsx` | Departure board plus a grid of 4 hard-coded menu tickets | Native | none (same hand-off) |
| Rewards | `app/(tabs)/rewards.tsx` | Membership card plus static "Earn / Redeem" copy | Native | none (same hand-off) |
| Account | `app/(tabs)/account.tsx` | Passport card plus 6 settings rows | Native | none. **All 6 rows do nothing** (`account.tsx:64`, `onPress={() => {}}`). |
| (auto) | expo-router defaults | `+not-found` screen; `_sitemap` (dev only) | Native | none |

**No WebView or iframe exists anywhere in the app.**

- `react-native-webview` is not installed. It appears in `package-lock.json` only as an optional peer dependency of Expo's DOM-components feature, which this app does not use.
- `expo-web-browser`, the in-app Safari view, is installed but never imported.

**Exact URLs loaded:** none. No URL is hard-coded anywhere in the source.

- The only external destinations are six environment variables (`lib/toast.ts:6-11`).
- All six are blank in `.env.example`, none is set in any `eas.json` profile, and no `.env` exists in the repo.
- As the repo stands, the app opens nothing.

### Does anything call a Toast API?

**No.** There are no `fetch`, `axios` or XHR calls anywhere in the codebase, and the string `toasttab` does not appear in the source. Ordering is a URL hand-off to the operating system:

`lib/toast.ts:5-14`
```ts
export const toastLinks = {
  order: env.EXPO_PUBLIC_TOAST_ORDER_URL ?? '',
  frappes: env.EXPO_PUBLIC_TOAST_FRAPPES_URL ?? '',
  matcha: env.EXPO_PUBLIC_TOAST_MATCHA_URL ?? '',
  coffee: env.EXPO_PUBLIC_TOAST_COFFEE_URL ?? '',
  featured: env.EXPO_PUBLIC_TOAST_FEATURED_URL ?? '',
  rewards: env.EXPO_PUBLIC_TOAST_REWARDS_URL ?? '',
};

export const previewMode = env.EXPO_PUBLIC_PREVIEW_MODE !== 'false';
```

`lib/toast.ts:24-43`
```ts
export async function openToast(url?: string) {
  const destination = hasToastLink(url) ? url! : toastLinks.order;
  if (!hasToastLink(destination)) {
    Alert.alert('Online ordering is almost here', ...);
    return false;
  }
  const supported = await Linking.canOpenURL(destination);
  ...
  await Linking.openURL(destination);
  return true;
}
```

`Linking.openURL` passes the URL to iOS or Android, which opens **Safari or Chrome**. The customer leaves the app to order. Nothing is embedded.

Side findings in the same file:

- **`EXPO_PUBLIC_TOAST_FEATURED_URL` is dead config.** `toastLinks.featured` (`lib/toast.ts:10`) is never read. The featured "Start order" button uses the *frappes* link instead (`app/(tabs)/index.tsx:56` → `constants/menu.ts` `toastKey: 'frappes'`).
- **The per-category links assume Toast Online Ordering supports category or item deep links.** Confirm this with the actual Toast site. If it doesn't, every button leads to the same page.

### Native vs. web: the blunt number

**100% native UI, 0% wrapped web content.** That number is true, and it flatters the app. The more useful split is **presentation vs. function: about 98 / 2.**

- Screens and components come to 3,055 lines, all React Native views. 1,140 of those (37%) are style declarations, and the rest is layout.
- Everything the app *does* lives in `lib/toast.ts`: 43 lines that either open a URL or show an alert. `lib/haptics.ts` (22 lines) adds vibration feedback.
- All content is hard-coded: 4 menu items with prices in `constants/menu.ts:32,46,60,74`.
- There are no network requests, no stored data, no user accounts, no sign-in and no state that survives a restart.

It is a well-made native brochure, not a web wrapper.

### Can it do anything an installable website can't?

**Effectively nothing.** One item qualifies, and it is cosmetic:

1. **Haptic feedback on iPhone.** iOS Safari has no Vibration API. Android Chrome does, so there is no difference on Android.

Everything else here, a website installed to the home screen can also do: the home-screen icon, working offline, tab navigation, animations, opening the Toast ordering page, safe-area layout. Being listed in the App Store is distribution, not functionality.

---

## Task 2 — App Store viability

### Apple (App Review Guidelines)

This app is **not** a repackaged website, so the literal "repackaged website" wording of 4.2 doesn't apply. It fails the *substance* of the minimum-functionality rules anyway:

- **4.2, Minimum Functionality.** Apps must offer "features, content, and UI that elevate it beyond a repackaged website," and be "app-like." The UI is strong; the features are nil.
- **4.2.2.** Apps "shouldn't primarily be marketing materials, advertisements, web clippings, content aggregators, or a collection of links." That is an accurate description of this app: marketing content plus six links to one ordering site.
- **2.1, App Completeness.** No placeholder or temporary content. Production builds show:
  - "ONLINE ORDERING · COMING SOON" (`order.tsx:54`)
  - "Ordering coming soon" (`order.tsx:68`)
  - "Rewards coming soon" (`rewards.tsx:91`)
  - six dead settings rows (`account.tsx:64`)
  - Reviewers tap everything.
- **The single useful action leaves the app.** A reviewer who taps "Start order" lands in Safari.

**Physical goods are not an issue.** Paying outside the app is allowed for food (Guideline 3.1.3(e)), so no in-app purchase is needed.

| Scenario | Estimated rejection risk (first submission) |
|---|---|
| **As configured today** (no Toast URL in `eas.json`, "coming soon" copy, dead rows) | **90–95%.** Almost certain, under 2.1 and 4.2. |
| Real Toast URL wired in and placeholders removed, otherwise unchanged (brochure plus external link) | **65–80%.** Likely, under 4.2 / 4.2.2. |
| With the "pass package" below (push, real menu with detail screens, store info, favorites, ordering kept in-app) | **20–35%.** First-time submitters often get metadata or privacy rejections even when the app is fine. |

### Google Play

- **Relevant policy:** *Spam and Minimum Functionality*. Apps must "provide users with a basic degree of functionality and a respectful user experience." Broken or non-functional features can be flagged.
- The **WebView rule does not apply**: there is no WebView, and the client owns the site.
- Play review is more automated and more lenient toward static apps.

| Scenario | Estimated rejection risk |
|---|---|
| As configured today | **30–50%**, most likely flagged as broken functionality (dead buttons, "coming soon") |
| Placeholders removed, real Toast link | **15–25%** |
| With the pass package | **under 10%** |

**Process risk on Play, separate from policy:**

- New **personal** Play developer accounts must run a closed test with at least **12 testers for 14 consecutive days** before they can publish to production. Confirm the current rule at signup.
- **Organization** accounts (which need a D-U-N-S number) are exempt. The client should register as an organization.

### What would have to be added to pass

**Hard constraint first.** Toast's APIs (orders, menus, loyalty, guest data) are not self-serve. They require Toast to approve you as an integration or API-access customer, and approval is not guaranteed and can take weeks. Without it:

- the Boarding Club card can **never** show real points;
- "Order again" can never show real history;
- checkout can never be native.

Plan around that constraint rather than assuming access.

| # | Addition | Why review cares | Hours (low / likely / high) |
|---|---|---|---|
| A1 | Remove every placeholder, "coming soon" label and dead control from production. Make each visible control work, or remove it. | 2.1 | 4 / 8 / 12 |
| A2 | Wire the real Toast Online Ordering URL. Open it **in-app** (Safari view controller on iOS, Custom Tabs on Android, via the already-installed `expo-web-browser`). Handle errors. | 4.2: the user stays in the app | 3 / 5 / 8 |
| A3 | Store info screen: hours, address, map or directions, tap-to-call, Instagram | Real utility | 6 / 10 / 16 |
| A4 | Complete, accurate menu: all items, real photos, descriptions, allergens, item detail screens. Updatable via a small CMS or remote JSON with caching, or hard-coded plus over-the-air updates. | 4.2 content depth. Also stops wrong prices shipping. | 16 / 28 / 45 |
| A5 | Push notifications end to end: `expo-notifications`, Apple push key, Firebase Cloud Messaging, permission prompt, token storage, and a way for the shop to send (Expo push tool or OneSignal). Marketing pushes need explicit opt-in (Guideline 4.5.4). | The strongest "only an app can do this" feature | 12 / 20 / 32 |
| A6 | Favorites and dietary filters, stored on the device | Personalization; makes the Account rows real | 6 / 10 / 16 |
| A7 | Help, contact, privacy policy, terms and about screens | 2.1; required URLs | 3 / 5 / 8 |
| A8 | Rewards made honest: link to Toast loyalty sign-up or lookup in-app, or remove the tab until API access exists | 2.1: no fake data | 3 / 6 / 10 |
| A9 | Config and compliance fixes (details in Task 3): app-level privacy manifest; block unused Android permissions; remove `edgeToEdgeEnabled`; add `expo-system-ui`; make the preview flag fail closed; official icon art and adaptive-icon safe zone; splash logo; contrast fixes; font-scale caps | Upload validation and accessibility | 6 / 10 / 16 |
| A10 | Crash reporting (Sentry) plus `expo-updates` for over-the-air fixes. Recommended rather than required for review. | Otherwise you can't see crashes, and every fix needs a store release. | 4 / 7 / 12 |
| | **Total** | | **63 / 109 / 175** |

---

## Task 3 — Ship checklist

Legend: **DONE** · **PARTIAL** · **MISSING** · N/A

### App config (`app.json`)

| Item | Status | Reference / note |
|---|---|---|
| name | DONE | `app.json:3` "Dubai & Dips" |
| slug | DONE | `app.json:4` |
| iOS bundle identifier | DONE | `app.json:17` `com.dubaianddips.app`. Must be registered under the **client's** Apple team. |
| Android package | DONE | `app.json:24` |
| version | DONE | `app.json:5` `1.0.0` |
| build number / versionCode | DONE | Set in `app.json:18,25`, but EAS manages the real values remotely and auto-increments them (`eas.json:4`, `appVersionSource: "remote"`; `eas.json:21`, `autoIncrement`). |
| orientation | DONE | `app.json:6` portrait |
| splash | PARTIAL | `app.json:11-14`: background color only, no logo image. Uses the legacy top-level `splash` key. |
| adaptive icon | PARTIAL | `app.json:26-29` uses the full square icon as the foreground. Measured: the star sits 345–348px from center, outside the 313px safe zone, so **its tips are clipped** by round launcher masks. |
| EAS project ID / owner | MISSING | No `extra.eas.projectId`. `eas init` has never been run (`APP_STORE.md:14`). |
| `android.edgeToEdgeEnabled` | PARTIAL | `app.json:30`. Prebuild warns this setting "is no longer available"; Android 16 makes edge-to-edge mandatory. Remove it. |
| Light-mode lock on Android | PARTIAL | `userInterfaceStyle: "light"` (`app.json:8`) needs `expo-system-ui` on Android; prebuild warns about this. Not installed. |

### Icons and splash assets

| Item | Status | Note |
|---|---|---|
| Source icon | **PARTIAL (quality)** | `assets/icon.png` is committed, but it is also **overwritten on every `npm install`** by `scripts/generate-icon.cjs` (the `postinstall` script, `package.json:7`). EAS builds therefore always ship the generated version: dropping in a new PNG does nothing until the script is changed or removed. It is 1024×1024 RGBA; Expo strips the alpha for iOS (verified). **The artwork is a programmatic approximation**: a plain sans-serif "D" and a "+"-shaped star that reads as a plus sign. It is **not** the official `d&d_logomark.svg` from the brand guide (pp. 4–5). Replace it with the official vector art. |
| All required sizes | DONE (mechanically) | Expo generates the iOS 1024 icon and Android mipmaps from the source (verified in prebuild). |
| Splash image | MISSING | Color only |
| Store creative | MISSING | iPhone 6.9" screenshots; Android phone screenshots; Play feature graphic (1024×500); Play icon (512×512) |

### EAS Build (`eas.json`)

| Item | Status | Note |
|---|---|---|
| Profiles | DONE | development, preview and production (`eas.json:6-26`) |
| Production hides sample data | DONE | `eas.json:23` `EXPO_PUBLIC_PREVIEW_MODE=false` |
| Toast URLs in production | **MISSING** | No profile sets any `EXPO_PUBLIC_TOAST_*`. A production build ships with ordering disabled. |
| development profile | PARTIAL | `developmentClient: true` (`eas.json:8`), but `expo-dev-client` is not installed. |
| submit config | PARTIAL | `submit.production: {}` (`eas.json:28`). Needs the App Store Connect app ID and team (or interactive prompts) and a Google service-account key. **The first Play upload must be done manually** in Play Console. |
| Credentials strategy | MISSING | Nothing documented. Recommended: the client owns the Apple, Google and Expo organization accounts and invites you as a member; EAS manages credentials; Play App Signing is enabled; the upload key is backed up and handed to the client. |
| Local release signing | Note | The generated `android/app/build.gradle` signs release builds with the **debug keystore**. Irrelevant for EAS builds (EAS injects real credentials), but dangerous if anyone ever builds locally. |

### iOS

| Item | Status | Note |
|---|---|---|
| Apple Developer Program (organization) plus D-U-N-S | MISSING | The client enrolls ($99/yr); it takes days to weeks. |
| Provisioning / certificates | MISSING | EAS can generate them once the client's team exists (App Store Connect API key or Admin role). |
| Capabilities / entitlements | DONE (none needed) | Generated entitlements are empty (verified). Push would add `aps-environment`. |
| `PrivacyInfo.xcprivacy` | PARTIAL | There is **no app-level manifest**: `ios.privacyManifests` isn't set and prebuild generated none. React Native and Expo modules ship their own pod-level manifests (e.g. `react-native/React/Resources/PrivacyInfo.xcprivacy`, `expo-constants`). Probably accepted, but upload can trigger ITMS-91053 "missing API declaration" warnings. Adding one is about 1 hour. |
| Privacy nutrition label | MISSING (form) | The app collects **no data** today (no network calls, analytics or storage), so the declaration is "Data Not Collected". Update it once push, crash reporting or analytics are added. |
| App Tracking Transparency | N/A | No tracking. |
| Export compliance | DONE | `app.json:20` `ITSAppUsesNonExemptEncryption: false` |
| App Transport Security | DONE | Generated: `NSAllowsArbitraryLoads` is false. |
| Privacy policy URL / support URL | MISSING | Required by App Store Connect. Listed as needed in `APP_STORE.md:36-37`. |
| iPad | Note | `supportsTablet: false` (`app.json:16`). The app still runs in compatibility mode on iPad, and reviewers sometimes test there. |

### Android

| Item | Status | Note |
|---|---|---|
| Play Console account (organization) | MISSING | $25 one-time. Identity verification. Personal accounts face the 12-tester, 14-day rule. |
| Signing | MISSING | EAS generates the upload key on first build. Enable Play App Signing and back up the key. |
| Target SDK | DONE | **target 36 / compile 36 / min 24**, from `react-native/gradle/libs.versions.toml` (verified in prebuild). Play raises the required level every August; recheck at submission. |
| Data safety form | MISSING (form) | Inputs today: no data collected or shared. Push, crash or analytics tools will change the answers. |
| Content rating, target audience, ads declaration, app access | MISSING (forms) | |

### Permissions

`app.json` declares none: no iOS usage strings, no `android.permissions`. The generated Android manifest nevertheless contains:

| Permission | Source | Actually used? |
|---|---|---|
| `INTERNET` | Expo template | Not by app code in release. Needed for the development server. Harmless; keep it. |
| `VIBRATE` | expo-haptics | **Yes**, for haptics on Android |
| `SYSTEM_ALERT_WINDOW` | Expo template | **No** in release (dev menu only). Block it via `android.blockedPermissions`. |
| `READ_` / `WRITE_EXTERNAL_STORAGE` (max SDK 32) | Expo template | **No**. Block them. |

iOS requests no permissions and needs no usage strings. **DONE.**

### Deep links

| Item | Status | Note |
|---|---|---|
| Custom scheme `dubaianddips://` | DONE | `app.json:7`. Generated Android intent filter and iOS `CFBundleURLSchemes` (verified). Expo Router resolves paths such as `/order`. |
| Universal links (iOS) / App Links (Android) | MISSING | No `associatedDomains`, no `autoVerify` intent filters, and no `apple-app-site-association` or `assetlinks.json` files on a domain. Not required to launch; needed if web or marketing links should open the app. About 4–8 hours including domain setup. |

### Push notifications

**MISSING entirely.** No `expo-notifications`, no Apple push key, no Firebase `google-services.json`, no token storage and no sending tool. What it takes is item A5 above, **12 / 20 / 32 hours**, plus a sending mechanism for the shop (Expo push tool or OneSignal) and an updated privacy label and data safety form.

### Crash reporting / analytics

**Absent.**

- No Sentry, Bugsnag, Firebase or analytics SDK.
- **No `expo-updates`.** The generated Android manifest shows `expo.modules.updates.ENABLED=false`.
- Consequences: you will not know when it crashes, and every fix or menu change requires a full store release and review.

### Offline and error states

| Situation | Status | Behavior |
|---|---|---|
| No network | DONE (by default) | The app loads nothing, so it renders fully offline from bundled data. |
| Toast page fails to load | PARTIAL | This happens in Safari or Chrome, outside the app. The app has no visibility and offers no recovery. |
| OS refuses to open the URL | PARTIAL | `lib/toast.ts:41` `Linking.openURL` has no try/catch. `index.tsx:30` calls `openToast` fire-and-forget, so a failure is an unhandled promise rejection. Rare. |
| Loading states | N/A today | Nothing loads. They become required as soon as the menu is fetched remotely. |
| Stale content | **Risk** | Prices are hard-coded (`constants/menu.ts:32,46,60,74`), and I could not verify they are real. They will drift from Toast, with no way to update them without a release. |

### Accessibility

| Item | Status | Note |
|---|---|---|
| Labels on interactive elements | DONE | Every pressable passes an `accessibilityLabel`; decorative barcodes, QR blocks and the pattern are hidden from screen readers. |
| Dead buttons | **FAIL** | `account.tsx:60-65`: six rows are announced as buttons and do nothing. |
| Touch targets (44pt minimum) | PARTIAL | Most are 44pt or more. The "Full menu" link is about 38pt even with `hitSlop` (`SectionHeader.tsx:45`). |
| Dynamic Type | PARTIAL | Text does scale: nothing sets `allowFontScaling={false}`. But there is **no `maxFontSizeMultiplier` anywhere**, and several containers have fixed heights (`PrimaryButton.tsx:61,71`; status chip `order.tsx:122`). Expect clipping at the largest accessibility text sizes. Untested. |
| Reduce Motion | PARTIAL | The entrance and progress animations (`HomeHero.tsx`, `BoardingClubCard.tsx`, `MembershipCard.tsx`) don't check the Reduce Motion setting. The animations are small. |
| Color contrast (WCAG AA) | **PARTIAL** | Measured below. |

WCAG AA requires 4.5:1 for normal text and 3:1 for large text.

| Text | Ratio | Result |
|---|---|---|
| Main text on background | 7.73:1 | PASS |
| Green eyebrow text on background | 5.58:1 | PASS |
| Off-white text on green cards | 5.58:1 | PASS |
| Secondary text (`inkSoft`) | 4.46:1 | large text only |
| **Footnotes (`inkFaint`)** | **2.76:1** | FAIL |
| **Browned Sugar labels** | **2.28–2.66:1** | FAIL |
| **Inactive tab labels** | **2.91:1** | FAIL |
| **Faint labels on green cards** | **2.73:1** | FAIL |
| Muted "coming soon" button text | 3.58:1 | large text only |

### Secrets, keys and test URLs

| Item | Status | Note |
|---|---|---|
| API keys / tokens | DONE (none) | Nothing found. |
| Test or staging URLs | DONE (none) | Nothing hard-coded. |
| Public environment variables | Note | `EXPO_PUBLIC_*` values are compiled into the app in plain text. Fine for public Toast URLs; never put a secret there. |
| Preview flag fails open | **Risk** | `lib/toast.ts:14`: `previewMode` is **true unless the variable is exactly `'false'`**. Any build without the variable ships the fake "420 points" and "Good morning, Kyle" (`HomeHero.tsx:35`). Only `eas.json:23` protects production. |

---

## Task 4 — Hours and cost

### Assumptions

- **Developer:** experienced in React and web; has **never** submitted a native app. First-time overhead is weighted into setup (b) and review cycles (c).
- **Builds:** cloud builds through EAS, so **no Mac is required**. The developer owns an iPhone and has access to at least one Android phone.
- **Client:**
  - creates and owns the Apple, Google Play and Expo organization accounts promptly;
  - supplies the official logo files, product photos, the real menu and prices, hours, and privacy-policy content.
- **Toast:** Online Ordering is live with a public URL. **No Toast API access is assumed.** If it is granted, native menu or loyalty sync is additional scope.
- **Scope:** the "pass package" in Task 2, not native checkout.
- **Rate:** $75–$150/hr (typical US freelance mobile). Substitute your own.
- **Calendar wait is excluded from hours:** Apple enrollment (1–3 weeks), the Play closed test if the account is personal (14 days), and review rounds (1–7 days each). Expect **5–8 weeks elapsed**.

### a) Making it pass store review

See items A1–A10 in Task 2. **63 / 109 / 175 hours.**

### b) Store setup, assets, listings, submissions (both stores)

| Task | Low | Likely | High |
|---|---|---|---|
| Apple organization enrollment support (D-U-N-S, verification, team roles) | 2 | 4 | 8 |
| Google Play organization account and identity verification | 1 | 3 | 6 |
| Expo organization, EAS project, credentials (Apple API key, certificates and profiles, Android upload key, Play App Signing), first working builds on both platforms | 4 | 8 | 16 |
| App Store Connect: record, privacy label, age rating, review notes, export compliance, pricing | 3 | 5 | 8 |
| Play Console: listing, data safety, content rating, audience, ads, app access, first **manual** upload, test tracks | 3 | 5 | 8 |
| Store creative: screenshots for both stores, feature graphic, descriptions, keywords | 4 | 8 | 14 |
| Privacy policy and support page hosted on the client's domain | 2 | 3 | 6 |
| Play 12-tester, 14-day closed test (only if the account is personal) | 0 | 3 | 8 |
| **Subtotal** | **19** | **39** | **74** |

### c) Review cycles (at least one rejection and resubmission)

| Task | Low | Likely | High |
|---|---|---|---|
| Apple: first submission, at least one rejection, Resolution Center replies, fixes, resubmission | 6 | 14 | 30 |
| Google: review, pre-launch report issues, corrected policy declarations | 2 | 4 | 10 |
| Metadata-only rejections (screenshots, URLs, review notes) | 1 | 3 | 6 |
| **Subtotal** | **9** | **21** | **46** |

### d) Testing on real devices

| Task | Low | Likely | High |
|---|---|---|---|
| TestFlight and Play internal-track setup, tester onboarding | 2 | 3 | 6 |
| Functional and visual pass on small, medium and large iPhones and two Android devices | 4 | 7 | 12 |
| Accessibility pass: VoiceOver, TalkBack, largest text sizes | 2 | 4 | 8 |
| End-to-end real Toast order and push delivery test | 2 | 3 | 5 |
| Regression testing after review fixes | 2 | 3 | 6 |
| **Subtotal** | **12** | **20** | **37** |

### e) Ongoing annual maintenance (per year)

| Task | Low | Likely | High |
|---|---|---|---|
| Expo SDK upgrades (1–2 a year), dependency updates, regressions | 8 | 16 | 30 |
| Store-mandated updates (Apple minimum Xcode/SDK each spring, Google target API each August) and resubmissions | 3 | 6 | 12 |
| Menu and content updates (low with a CMS, high if hard-coded) | 2 | 8 | 24 |
| Policy form updates, certificate renewals, account admin | 2 | 4 | 8 |
| New iOS/Android release regressions and bug fixes | 4 | 10 | 20 |
| **Subtotal per year** | **19** | **44** | **94** |

### Totals

| | Low | Likely | High |
|---|---|---|---|
| **One-time remaining work (a+b+c+d)** | **103 h** | **189 h** | **332 h** |
| at $75/hr | $7,725 | $14,175 | $24,900 |
| at $100/hr | $10,300 | $18,900 | $33,200 |
| at $150/hr | $15,450 | $28,350 | $49,800 |
| **Annual maintenance (e)** | **19 h** | **44 h** | **94 h** |
| at $100/hr | $1,900/yr | $4,400/yr | $9,400/yr |

**Costs paid by the client, not you:**

- Apple Developer Program: $99/yr.
- Google Play: $25 one-time.
- Expo EAS: the free tier may be enough at low volume; check current plan pricing.
- Crash reporting and push: free tiers exist (Sentry free tier, Expo push service).
- An Android test phone if you don't have one.

**Before you quote:**

1. **Bid the one-time work in phases, not as one fixed price.** Suggested phases: config and cleanup, features, then submission. Most of the downside sits in the Apple review cycles.
2. **Sell maintenance as a retainer.** The app breaks without annual SDK work.
3. **Ask the client's Toast rep** whether Toast's own branded-app product is available to them, and at what price. If it is, it bundles native ordering, loyalty and push, which is exactly what this app lacks. You want to know that before the client asks.

---

## Task 5 — The honest verdict

It is a real native app, not a reskinned Toast page. There is no WebView; every pixel is React Native. But it is a native **brochure**: four hard-coded menu items, a points card with sample data, six dead settings rows, and one real action, which throws the customer out to Safari to order on Toast's website. It does nothing an installable website can't. In a production build it doesn't even do that, because no Toast URL is configured anywhere.

**Should it ship?** Not in this form. If the goal is "customers can order from their phone," the website already does that at zero upkeep. Ship only if the client wants, and will pay for, what only an app does well: push notifications, a real menu they can update, favorites, store info, and ordering that stays inside the app. That is roughly 190 more hours and about 45 hours a year to keep alive.

**Biggest risk:** Apple rejecting it under 2.1 and 4.2 while you're on a fixed bid, absorbing the rework. Close behind: the flagship Boarding Club card can never show real points without Toast API approval you don't have.
