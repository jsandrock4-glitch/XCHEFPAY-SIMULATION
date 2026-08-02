'use client';
import { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import GlassCard from '@/components/common/GlassCard';
import BalanceCard from '@/components/wallet/BlananceCard';

export default function FarmerPage() {
  // Verification State
  const [isVerified, setIsVerified] = useState(false);
  const [step, setStep] = useState(1); // 1: Input, 2: Confirm Farm & GPS
  const [gpsConfirmed, setGpsConfirmed] = useState(false);

  // Form State
  const [farmerData, setFarmerData] = useState({
    firstName: '',
    lastName: '',
    agriNumber: '',
    farmName: '',
    farmingType: '',
    location: ''
  });

  // Handle Initial Search/Verify
  const handleVerifySearch = (e) => {
    e.preventDefault();
    if (!farmerData.firstName || !farmerData.agriNumber) return;

    // Simulate database lookup based on user input
    setFarmerData((prev) => ({
      ...prev,
      farmName: `${prev.lastName || prev.firstName} Tradisionele Boerdery (Edms) Bpk`,
      farmingType: 'Gemengde Landbou & Varsprodukte',
      location: 'Potchefstroom, Noordwes (-26.7145, 27.0970)'
    }));

    setStep(2);
  };

  // Final Complete Step
  const handleCompleteOnboarding = () => {
    if (!gpsConfirmed) return;
    setIsVerified(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      <Navbar />

      <main className="max-w-md mx-auto px-4 pt-6">
        
        {/* ==================== STAP 1 & 2: VERIFIKASIE PROSES ==================== */}
        {!isVerified ? (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-3xl">🌾</span>
              <h1 className="text-2xl font-bold mt-2 text-emerald-400">Boer Identiteit & Verifikasie</h1>
              <p className="text-xs text-slate-400 mt-1">
                Aangesien jy die Boer-rol betree, moet jou landbou-registrasie gekoppel word vir die dual-wallet infrastruktuur.
              </p>
            </div>

            {/* STEP 1: INPUT FORM */}
            {step === 1 && (
              <GlassCard className="p-5 border-emerald-500/30">
                <form onSubmit={handleVerifySearch} className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1">Naam</label>
                    <input
                      type="text"
                      required
                      placeholder="Bv. Johan"
                      value={farmerData.firstName}
                      onChange={(e) => setFarmerData({ ...farmerData, firstName: e.target.value })}
                      className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1">Van</label>
                    <input
                      type="text"
                      required
                      placeholder="Bv. van der Merwe"
                      value={farmerData.lastName}
                      onChange={(e) => setFarmerData({ ...farmerData, lastName: e.target.value })}
                      className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1">Geregistreerde Landbou Nommer</label>
                    <input
                      type="text"
                      required
                      placeholder="Bv. AGRI-99481-ZA"
                      value={farmerData.agriNumber}
                      onChange={(e) => setFarmerData({ ...farmerData, agriNumber: e.target.value })}
                      className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-lg text-sm transition shadow-lg shadow-emerald-950/50"
                  >
                    Verifieer Landbou Register 🔍
                  </button>
                </form>
              </GlassCard>
            )}

            {/* STEP 2: CONFIRMATION & GPS */}
            {step === 2 && (
              <GlassCard className="p-5 border-emerald-500/50 space-y-4">
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-lg text-center">
                  <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                    Geregistreerde Rekord Gevind ✅
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Produsent:</span>
                    <span className="font-semibold text-slate-200">{farmerData.firstName} {farmerData.lastName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Landbou No:</span>
                    <span className="font-mono text-emerald-400">{farmerData.agriNumber}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Geregistreerde Plaas:</span>
                    <span className="font-semibold text-slate-200">{farmerData.farmName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Boerdery Tipe:</span>
                    <span className="text-slate-300">{farmerData.farmingType}</span>
                  </div>
                </div>

                {/* GPS Confirm Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setGpsConfirmed(true)}
                    className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border transition ${
                      gpsConfirmed
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-emerald-500'
                    }`}
                  >
                    <span>📍</span>
                    {gpsConfirmed
                      ? `Ligging Bevestig: ${farmerData.location}`
                      : 'Kliek om Plaas GPS Ligging te Bevestig'}
                  </button>
                </div>

                {/* Final Done Button */}
                <button
                  onClick={handleCompleteOnboarding}
                  disabled={!gpsConfirmed}
                  className={`w-full py-3 rounded-lg font-bold text-sm transition shadow-lg ${
                    gpsConfirmed
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Voltooi & Betree Boer Dashboard 🚀
                </button>
              </GlassCard>
            )}
          </div>
        ) : (

          /* ==================== STAP 3: BOER DASHBOARD & DUAL WALLETS ==================== */
          <div className="space-y-6">
            
            {/* Header met Boer Inligting */}
            <div className="flex justify-between items-center bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div>
                <h1 className="text-lg font-bold text-emerald-400">{farmerData.farmName}</h1>
                <p className="text-xs text-slate-400">Produsent: {farmerData.firstName} {farmerData.lastName} | Reg: {farmerData.agriNumber}</p>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-500/30">
                Verifieer
              </span>
            </div>

            {/* DUAL WALLETS */}
            <div>
              <h2 className="text-xs font-semibold uppercase text-slate-400 mb-3 tracking-wider">
                Gekoppelde Beurse (Dual-Wallet)
              </h2>
              <div className="space-y-4">
                {/* 1. Landbou / Besigheid Wallet */}
                <BalanceCard
                  title="Landbou-Bedryfsbeurs (Business)"
                  balance="12,450.00"
                  currency="XCHEF"
                  subtitle="Vir varsvaring, voorraad verkoop & leweransier betalings"
                />

                {/* 2. Persoonlike Wallet */}
                <BalanceCard
                  title="Persoonlike Beurs (Personal)"
                  balance="2,180.00"
                  currency="CHEFCOIN"
                  subtitle="Verbrandings-belonings & eie verbruik"
                />
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}