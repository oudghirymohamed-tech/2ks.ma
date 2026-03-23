import type { ReactNode } from 'react';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';

export function MarketingLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-ice text-navy">
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
