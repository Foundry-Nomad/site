/**
 * ILLUSTRATIVE SAMPLE DATA.
 *
 * None of the figures below describe a live product, a real track record, or a
 * real subscription book. They exist so the interface can be designed and
 * reviewed against realistic shapes.
 *
 * Each 30-session path is generated from a fixed seed (so every build produces
 * identical output) and then pinned to a chosen 30-day return, which keeps the
 * headline figures inside a plausible range instead of drifting wherever the
 * random walk happens to land.
 */

const SESSIONS = 30;
const DAYS_PER_YEAR = 365;

/** Small deterministic PRNG. Same seed always yields the same series. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussian(random: () => number): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = random();
  while (v === 0) v = random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/**
 * Net asset value path of SESSIONS + 1 points, starting at 1.
 * Daily log returns carry `dailyVol` of noise, then get re-centred so the
 * total return over the window lands exactly on `monthReturn`.
 */
function buildSeries(seed: number, monthReturn: number, dailyVol: number): number[] {
  const random = mulberry32(seed);
  const noise = Array.from({ length: SESSIONS }, () => dailyVol * gaussian(random));
  const drift = noise.reduce((sum, x) => sum + x, 0) / SESSIONS;
  const target = Math.log(1 + monthReturn) / SESSIONS;

  const nav = [1];
  for (const step of noise) {
    nav.push(nav[nav.length - 1] * Math.exp(step - drift + target));
  }
  return nav;
}

function maxDrawdown(nav: number[]): number {
  let peak = nav[0];
  let worst = 0;
  for (const point of nav) {
    if (point > peak) peak = point;
    const drop = point / peak - 1;
    if (drop < worst) worst = drop;
  }
  return worst;
}

type ProductSeed = {
  name: string;
  code: string;
  strategy: string;
  /** How many individual strategies and instruments sit inside the sleeve. */
  components: number;
  /** Annualised volatility the sleeve is managed to. */
  volTarget: number;
  totalShares: number;
  availableShares: number;
  seed: number;
  monthReturn: number;
  dailyVol: number;
};

const SEEDS: ProductSeed[] = [
  {
    name: "Bellwether",
    code: "FN-BW-01",
    strategy: "Multi-strategy composite",
    components: 9,
    volTarget: 0.06,
    totalShares: 1_850_000,
    availableShares: 214_600,
    seed: 1011,
    monthReturn: 0.0163,
    dailyVol: 0.0021,
  },
  {
    name: "Coldforge",
    code: "FN-CF-04",
    strategy: "Equity market neutral",
    components: 5,
    volTarget: 0.04,
    totalShares: 1_200_000,
    availableShares: 0,
    seed: 2027,
    monthReturn: 0.0107,
    dailyVol: 0.0012,
  },
  {
    name: "Saltline",
    code: "FN-SL-02",
    strategy: "Cross-asset trend following",
    components: 4,
    volTarget: 0.12,
    totalShares: 640_000,
    availableShares: 158_900,
    seed: 3049,
    monthReturn: 0.0224,
    dailyVol: 0.0058,
  },
  {
    name: "Wayfare",
    code: "FN-WF-03",
    strategy: "Basis and funding carry",
    components: 3,
    volTarget: 0.03,
    totalShares: 780_000,
    availableShares: 92_400,
    seed: 4073,
    monthReturn: 0.0071,
    dailyVol: 0.0009,
  },
  {
    name: "Ridgeway",
    code: "FN-RW-05",
    strategy: "Convertible and volatility",
    components: 2,
    volTarget: 0.1,
    totalShares: 550_000,
    availableShares: 146_500,
    seed: 5099,
    monthReturn: -0.0038,
    dailyVol: 0.0041,
  },
];

export type Product = {
  name: string;
  code: string;
  strategy: string;
  components: number;
  volTarget: number;
  totalShares: number;
  availableShares: number;
  /** Share of the book already taken up, 0 to 1. */
  subscribed: number;
  isOpen: boolean;
  /** SESSIONS + 1 daily net asset values, starting at 1. */
  nav: number[];
  monthReturn: number;
  /** 30-day return extrapolated to a full year. A short-window estimate. */
  annualized: number;
  maxDrawdown: number;
};

function toProduct(seed: ProductSeed): Product {
  const nav = buildSeries(seed.seed, seed.monthReturn, seed.dailyVol);
  const monthReturn = nav[nav.length - 1] / nav[0] - 1;

  return {
    name: seed.name,
    code: seed.code,
    strategy: seed.strategy,
    components: seed.components,
    volTarget: seed.volTarget,
    totalShares: seed.totalShares,
    availableShares: seed.availableShares,
    subscribed: (seed.totalShares - seed.availableShares) / seed.totalShares,
    isOpen: seed.availableShares > 0,
    nav,
    monthReturn,
    annualized: Math.pow(1 + monthReturn, DAYS_PER_YEAR / SESSIONS) - 1,
    maxDrawdown: maxDrawdown(nav),
  };
}

export const products: Product[] = SEEDS.map(toProduct);

export const [featuredProduct, ...otherProducts] = products;

/** Share-weighted average of every sleeve, rebased to 1. */
export const compositeNav: number[] = (() => {
  const weightTotal = products.reduce((sum, p) => sum + p.totalShares, 0);
  return Array.from({ length: SESSIONS + 1 }, (_, day) =>
    products.reduce((sum, p) => sum + (p.nav[day] * p.totalShares) / weightTotal, 0),
  );
})();

export const compositeMonthReturn =
  compositeNav[compositeNav.length - 1] / compositeNav[0] - 1;

export const compositeAnnualized =
  Math.pow(1 + compositeMonthReturn, DAYS_PER_YEAR / SESSIONS) - 1;

export const totalShares = products.reduce((sum, p) => sum + p.totalShares, 0);
export const availableShares = products.reduce((sum, p) => sum + p.availableShares, 0);
export const totalComponents = products.reduce((sum, p) => sum + p.components, 0);

/**
 * What Bellwether is made of. Weights are illustrative and sum to 100.
 */
export const compositeSleeves = [
  { label: "Statistical arbitrage", weight: 34 },
  { label: "Cross-asset trend", weight: 22 },
  { label: "Basis and funding carry", weight: 19 },
  { label: "Volatility and convertibles", weight: 15 },
  { label: "Treasury bills and cash", weight: 10 },
];

const shareFormat = new Intl.NumberFormat("en-US");

export function formatShares(value: number): string {
  return shareFormat.format(value);
}

export function formatSigned(value: number, digits = 1): string {
  const percent = value * 100;
  const sign = percent > 0 ? "+" : percent < 0 ? "-" : "";
  return `${sign}${Math.abs(percent).toFixed(digits)}%`;
}

export function formatPercent(value: number, digits = 1): string {
  return `${(value * 100).toFixed(digits)}%`;
}

/**
 * Window covered by the sample series, resolved when the site is built.
 */
export function windowLabel(): string {
  const format = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return format.format(new Date());
}

export const sessionCount = SESSIONS;
