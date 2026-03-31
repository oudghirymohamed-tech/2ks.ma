export const BRAND_ROUTE_PATHS = {
    home: '/',
    about: '/about',
    howItWorks: '/how-it-works',
    whyItMatters: '/why-it-matters',
    team: '/team',
    contact: '/contact'
} as const;

export type BrandRouteKey = keyof typeof BRAND_ROUTE_PATHS;

export const BRAND_NAV_ORDER: BrandRouteKey[] = ['home', 'about', 'howItWorks', 'whyItMatters', 'team', 'contact'];
