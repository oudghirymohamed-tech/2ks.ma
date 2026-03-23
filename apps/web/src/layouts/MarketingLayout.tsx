import type { ReactNode } from 'react';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';

export function MarketingLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-canvas text-ink">
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
