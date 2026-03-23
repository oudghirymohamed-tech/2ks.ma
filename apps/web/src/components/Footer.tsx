import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-slate-600 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
                <div>
                    <p className="text-lg font-semibold text-slate-950">HayatID by 2KS</p>
                    <p className="mt-3 max-w-md leading-7">
                        Demo startup experience for Gitex Africa 2026. Mock data only. No protected medical data is exposed from the frontend.
                    </p>
                </div>
                <div>
                    <p className="font-semibold text-slate-950">Flows</p>
                    <div className="mt-3 flex flex-col gap-2">
                        <Link to="/demo">Demo hub</Link>
                        <Link to="/u/demo-token">Emergency scan</Link>
                        <Link to="/dashboard">Patient dashboard</Link>
                    </div>
                </div>
                <div>
                    <p className="font-semibold text-slate-950">Deploy targets</p>
                    <div className="mt-3 flex flex-col gap-2">
                        <span>Frontend: Vercel</span>
                        <span>Backend: Railway</span>
                        <span>Future stack: Supabase, Redis, Resend</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
