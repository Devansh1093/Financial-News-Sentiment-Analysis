# Frontend Style Guide — P2P Energy Trading

## 1. Reference and design intent

Reference repository: [Financial-News-Sentiment-Analysis](https://github.com/Devansh1093/Financial-News-Sentiment-Analysis)

This guide is based on the checked-in frontend source, especially:
- `frontend/src/index.css`
- `frontend/src/components/Header.tsx`
- `frontend/src/components/DashboardPage.tsx`
- `frontend/src/components/SummaryCard.tsx`
- `frontend/src/components/CompanyCard.tsx`
- `frontend/src/components/Analysis.tsx`
- `frontend/components.json`

The reference uses a restrained, light analytics dashboard: soft gray page background, white surfaces, dark text, teal/cyan accents, thin neutral borders, modest rounded corners, and subtle hover elevation. Use the same visual language for the P2P energy-trading application, while replacing financial-news semantics with energy, market, carbon, and blockchain data.

This is a design translation of the source frontend, not a claim that every component or state is already polished in the reference project.

## 2. Design principles

1. **Dashboard-first:** Users should understand current energy availability, marketplace activity, and environmental impact at a glance.
2. **Calm, data-led UI:** Use generous whitespace, clear typography, simple cards, and disciplined accent color.
3. **Meaningful color:** Teal indicates the primary action or positive renewable-energy emphasis. Status colors must remain distinct and accessible.
4. **Explainable metrics:** Always show units and context for energy, price, carbon intensity, estimated emissions, and blockchain status.
5. **Consistent components:** Reuse cards, buttons, inputs, badges, tables, and spacing rather than styling each screen independently.
6. **Responsive by default:** Preserve readability and usable controls on narrow screens; do not simply shrink desktop grids.

## 3. Color palette

The following named colors are explicitly present in the reference stylesheet. Use them as the core palette.

| Token | Hex | Use |
|---|---|---|
| Eastern Blue / primary teal | `#1DAFA1` | Primary accent, key buttons, selected navigation, energy-trading highlights |
| Storm Gray | `#6C7389` | Muted copy, secondary labels, helper text |
| Athens Gray | `#EAECF0` | Hairline borders and separators |
| Mirage | `#141729` | Deep text or dark emphasis when needed |
| Mischka | `#DCDEE5` | Secondary borders and quiet UI details |
| Page background | `#F2F4F7` | Main application canvas from the reference body rule |
| White | `#FFFFFF` | Cards, panels, inputs, dropdown surfaces |
| Cyan soft | `#CFFAFE` approx. | Subtle icon backgrounds, selected states (reference uses Tailwind `cyan-100`) |
| Cyan accent | `#0891B2` | Secondary emphasis / hover (reference uses Tailwind `cyan-600`) |
| Cyan button | `#06B6D4` | Primary action example in the reference (Tailwind `cyan-500`) |

### Energy-market semantic colors

Add semantic colors carefully; do not replace the teal/neutral identity with a rainbow palette.

| Semantic token | Suggested use |
|---|---|
| Renewable / favorable | Teal primary; pair with an icon or label |
| Buyer / demand | Blue or neutral-blue marker |
| Seller / surplus | Teal marker |
| Confirmed transaction | Green status with text/icon |
| Pending transaction | Amber status with text/icon |
| Failed/reverted transaction | Red status with text/icon |
| Muted / inactive | Storm Gray |
| Carbon intensity | Use one consistent chart scale, with visible legend and units |

Do not communicate status using color alone. Include labels such as `Confirmed`, `Pending`, `Failed`, `Buy`, and `Sell`.

### CSS variable guidance

Define project-level CSS variables in one theme file and map them into Tailwind/shadcn tokens. Prefer semantic tokens such as `--background`, `--foreground`, `--card`, `--border`, `--primary`, and `--muted-foreground` over hardcoding colors in components.

The reference stylesheet also includes shadcn-style OKLCH semantic variables and a dark-mode class. If the energy app implements dark mode, define and test a complete dark palette. Do not treat the reference's default dark theme values as automatically matching the teal brand; ensure primary/action contrast in both themes.

## 4. Typography

The reference imports `@fontsource-variable/geist` and uses **Geist Variable** as its sans-serif family.

- Font family: `"Geist Variable", sans-serif`
- Headings: 600–700 weight, dark foreground, compact line height.
- Body: 400 weight, clear line spacing.
- Labels and helper text: smaller size with muted foreground.
- Metric values: bold and large enough to scan.
- Numeric data: use consistent formatting and tabular numerals where available.

Suggested scale:

| Element | Suggested size | Weight |
|---|---:|---:|
| Main page title | 30–32px | 700 |
| Section title | 18px | 600 |
| Card title / table heading | 14–16px | 600 |
| KPI value | 30px | 700 |
| Main body | 14–16px | 400 |
| Secondary copy | 12–14px | 400 |
| Compact status/metadata | 12px | 500 |

The reference uses Tailwind classes including `text-3xl font-bold` for the welcome title and KPI values, and `text-lg font-semibold` for section titles. Keep these relative hierarchy choices.

## 5. Layout and spacing

The reference dashboard uses a centered `max-w-7xl` container with horizontal padding (`px-6`), vertical padding (`py-6`), and sections separated by `space-y-8`. Its grids use a `gap-6` rhythm.

Use these as defaults:

- App content: centered, max width about 1280px (`max-w-7xl`).
- Desktop outer padding: 24px.
- Main section vertical spacing: 32px.
- Grid gap: 24px.
- Card internal padding: 24px for dashboard panels; 16–20px for compact cards.
- Header height: content-based, with about 16px vertical and 24px horizontal padding.
- Page background: soft neutral gray; cards/panels: white.
- Divider: thin neutral line, never visually heavy.

### Responsive behavior

The reference source shows four- and three-column layouts but has limited responsive grid rules in the inspected dashboard component. For the new app, implement explicit breakpoints rather than reproducing fixed grids unchanged:

- Large desktop: 3–4 KPI cards per row; marketplace and charts can use two-column layouts.
- Tablet: 2 KPI cards per row; stack secondary panels as needed.
- Mobile: one column for cards and forms; tables should use controlled horizontal scrolling or compact row cards.
- Sidebar/navigation (if added): collapse into a drawer or compact mobile bar.
- Buttons and fields should remain comfortably tappable.

## 6. Header and navigation

Reference pattern:
- Full-width header separated by a thin bottom border.
- Centered inner container aligned to the main page.
- Left-aligned brand mark and wordmark.
- Simple square teal logo background with a white Lucide icon.
- Bold wordmark around 18px with tight letter spacing.
- Minimal decorative treatment.

For the energy-trading app:
- Product name may be `GridWise`, `WattTrade`, or the project’s chosen brand.
- Use a simple bolt, activity, sun, or Zap-style Lucide icon inside a teal square.
- Navigation should prioritize Dashboard, Marketplace, Match Center, Trades, and (if present) Carbon Impact.
- Show wallet/chain connection status on the right only if blockchain integration exists.
- On mobile, retain the product identity and place navigation in a compact menu.

Avoid large gradients, oversized hero headers, or decorative imagery that pushes core market information below the fold.

## 7. Cards and panels

The reference uses shadcn Card components and repeated rounded, bordered panels.

### Base card
- White surface.
- Thin `#EAECF0`-like border.
- Approximately 12px radius for dashboard cards (reference includes `rounded-xl` and a shadcn radius variable around 10px).
- 20–24px padding.
- Gentle shadow on hover only where the card is interactive.
- Avoid heavy shadows at rest.

### KPI card
Pattern observed in `SummaryCard.tsx`:
- Label in 14px medium muted text.
- KPI value in 30px bold text.
- Short descriptor below in muted 14px text.
- Icon in a softly colored circular background.
- Content arranged as text left, icon right.
- Light hover shadow transition.

Energy KPIs may include:
- Confirmed energy traded (kWh)
- Active sell offers
- Active buy offers
- Renewable energy matched (kWh)
- Estimated emissions difference (kgCO₂e)
- Confirmed on-chain trades

Metric labels must identify whether data is simulated, estimated, or on-chain confirmed.

### Offer cards
Build on the reference's clickable `CompanyCard` pattern:
- White card with thin neutral border and 12px radius.
- Clear title and muted metadata.
- Hover: subtle shadow and teal border.
- Whole-card interaction only when the card has a clear click action; use a button or accessible link semantics.
- Include quantity, price, source, carbon intensity, expiry, and Buy/Sell status without clutter.

### Large analytical panel
- White surface with a thin border and 12px radius.
- Section heading at top with consistent bottom margin.
- Charts or tables below.
- Keep legends, axes, units, and empty states visible.
- Use the same panel style for match explanations, carbon comparison, and trade history.

## 8. Buttons, inputs, and interaction states

The reference uses compact controls and cyan/teal accents, with shadcn-style UI primitives, Tailwind, and Lucide icons.

### Primary button
- Teal/cyan fill, white text.
- Medium font weight.
- Rounded corners (around 8px).
- Horizontal padding around 16px; vertical padding around 8–10px.
- Clear hover, focus-visible, disabled, and loading states.

### Secondary button
- White or neutral surface.
- Thin border.
- Dark foreground.
- Teal hover emphasis.

### Input/select
- White surface, neutral thin border, rounded corners.
- Comfortable padding, visible label, helper text or validation message.
- Clear focus ring using the primary color.
- Placeholder is muted, not used as the only field label.

### Interaction rules
- Use Lucide icons consistently, not mixed icon families.
- Interactive cards and buttons must have hover and focus-visible states.
- Keep transitions short and subtle (approximately 150–300ms).
- Disable repeated trade submission while a request or wallet transaction is pending.
- Never use a purely visual toast or optimistic UI to imply an on-chain transaction has confirmed.

## 9. Tables, charts, and energy visualizations

Keep a financial-analytics-style level of clarity.

- Use table headers in muted, medium-weight text.
- Prefer subtle horizontal separators over a dense grid of borders.
- Align numeric values consistently; use the same decimal precision and units.
- Format energy in kWh for most user-facing views; explicitly state the API/contract unit where relevant.
- Show price currency and unit (for example, ₹/kWh or €/kWh) consistently.
- Carbon intensity should show `gCO₂e/kWh`; estimated emissions should show `kgCO₂e` or `gCO₂e`.
- Every chart needs a title, units, a legend if multiple series are present, and an empty/loading/error state.
- Use teal as the primary data series, gray for context/baseline, and a restrained contrasting color only for comparison or warning states.
- Avoid 3D charts, excessive animation, and unlabeled axes.

Recommended visualizations:
- Energy supply vs demand over time.
- Price-only vs carbon-aware matching comparison.
- Renewable energy matched by source.
- Estimated carbon intensity and baseline comparison.
- Recent trades with transaction state.
- Optional trade flow diagram for buyer-to-seller paths.

Do not present an emissions “saved” KPI without an explicit baseline and a clear statement that it is an estimate.

## 10. Status and data trust cues

Use compact labels with text and optional icon:

- **Proposed:** match preview; no on-chain transaction yet.
- **Pending:** submitted or awaiting confirmation.
- **Confirmed:** receipt and expected contract event verified.
- **Failed:** reverted or otherwise not confirmed.
- **Simulated:** generated demo data.
- **Estimated:** modelled climate calculation.
- **Source unavailable:** no trustworthy carbon-factor source available.

Use green/teal for positive/confirmed states, amber for pending, red for failures, and neutral gray for simulated or unavailable values. Ensure accessible contrast and do not depend only on color.

## 11. Icons and assets

The reference uses `lucide-react`.

Recommended icon vocabulary:
- Energy: `Zap`, `Sun`, `Wind`, `BatteryCharging`, `Activity`
- Marketplace: `ArrowLeftRight`, `ShoppingCart`, `Store`
- Sustainability: `Leaf`, `ChartNoAxesCombined`, `Cloud`
- Blockchain: `Wallet`, `Blocks`, `ExternalLink`, `CheckCircle2`
- Navigation/actions: `LayoutDashboard`, `History`, `Settings`, `Plus`, `RefreshCw`

Check exact icon export names against the installed Lucide version. Keep icon sizing consistent: approximately 16–20px for controls and 24px for KPI tiles.

Avoid unnecessary stock photography. Use diagrams or compact visualizations only when they clarify energy matching or carbon calculations.

## 12. Component and implementation conventions

The reference frontend uses:
- React + TypeScript + Vite
- Tailwind CSS v4
- shadcn-style UI primitives
- Lucide icons
- CSS variables for theme tokens
- Geist Variable font

For the new project:
1. Preserve the current app's stack if one is already chosen; do not migrate purely for visual similarity.
2. Define the design tokens once in the global stylesheet.
3. Build reusable primitives: `AppHeader`, `PageContainer`, `SectionHeading`, `MetricCard`, `OfferCard`, `StatusBadge`, `DataTable`, `EmptyState`, and `LoadingState`.
4. Prefer semantic theme classes such as `bg-background`, `text-foreground`, `border-border`, and `text-muted-foreground`.
5. Avoid duplicating long utility-class strings across components; extract components when repeated.
6. Ensure forms and interactive cards are keyboard accessible.
7. Keep frontend visual state consistent with backend and contract transaction state.

## 13. Do / don't

### Do
- Keep the UI light, restrained, and analytical.
- Use Geist Variable and a clear heading hierarchy.
- Use teal/cyan for primary actions and renewable-energy accents.
- Use white cards on a soft gray canvas.
- Reuse consistent rounded borders and subtle hover shadows.
- Make quantities, prices, emissions units, and transaction states explicit.
- Include loading, empty, error, pending, confirmed, and failed states.
- Provide responsive grids and accessible focus states.

### Don't
- Don't change every panel to a different bright color.
- Don't use heavy gradients, glassmorphism, or giant hero sections.
- Don't overuse shadows, borders, or rounded pills.
- Don't show carbon metrics without units and a baseline.
- Don't claim that a proposed match is confirmed or that a blockchain event proves physical delivery.
- Don't assume that a seller-declared energy source is independently verified.
- Don't make the mobile layout a squeezed version of the desktop.
- Don't hardcode color values independently in every component.

## 14. Acceptance checklist

- [ ] The app uses the documented light dashboard palette and centralized theme tokens.
- [ ] Geist Variable is used when the selected build stack supports it.
- [ ] Header and page content share one centered maximum-width container.
- [ ] KPI cards, offer cards, forms, and large panels use consistent spacing and borders.
- [ ] Teal is the primary accent; status colors remain semantic and accessible.
- [ ] Responsive behavior is explicit for desktop, tablet, and mobile.
- [ ] All charts show labels, units, and legends where required.
- [ ] Carbon metrics disclose estimate/source/baseline.
- [ ] On-chain trade states are accurate and accessible.
- [ ] Keyboard focus and form labels are visible.
