import type { ReactNode } from 'react';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';

export function MarketingLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen overflow-x-clip bg-ice text-navy">
            <Navbar />
            <main className="overflow-x-clip">{children}</main>
            <Footer />
        </div>
    );
}
