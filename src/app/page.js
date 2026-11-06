'use client';

import React from 'react';
import Link from 'next/link';
import { User, Sprout, Store, ArrowRight, ShieldCheck, Zap, Cpu } from 'lucide-react';

export default function RoleSelectionPage() {
  const roles = [
    {
      id: 'consumer',
      title: 'Consumer',
      subtitle: 'Spend XCHEF-P & earn rewards',
      desc: 'Buy fresh produce, pay restaurants, scan QR codes, and earn real-time XCHEF-E rewards.',
      icon: User,
      color: 'from-[#00ff9d]/20 to-transparent',
      borderColor: 'border-[#00ff9d]/30',
      textColor: 'text-[#00ff9d]',
      btnBg: 'bg-[#00ff9d] text-black hover:bg-[#00e5ff]',
      href: '/consumer',
      badge: '2% Fee / 1% Reward'
    },
    {
      id: 'farmer',
      title: 'Producer / Farmer',
      subtitle: 'Dual-Wallet & Harvest Management',
      desc: 'List farm produce, manage Agri Treasury vs Personal wallet, and receive direct payments.',
      icon: Sprout,
      color: 'from-[#ffb703]/20 to-transparent',
      borderColor: 'border-[#ffb703]/30',
      textColor: 'text-[#ffb703]',
      btnBg: 'bg-[#ffb703] text-black hover:bg-[#ff8800]',
      href: '/farmer',
      badge: 'Direct Supply Chain'
    },
    {
      id: 'business',
      title: 'Business / Merchant POS',
      subtitle: 'Sales, POS & Revenue Analytics',
      desc: 'Accept XCHEF payments via smart QR codes, manage inventory, and monitor daily turnover in real time.',
      icon: Store,
      color: 'from-[#00e5ff]/20 to-transparent',
      borderColor: 'border-[#00e5ff]/30',
      textColor: 'text-[#00e5ff]',
      btnBg: 'bg-[#00e5ff] text-black hover:bg-[#00ff9d]',
      href: '/business',
      badge: 'Dynamic Settlement'
    },
    {
      id: 'treasury',
      title: 'Protocol & Treasury Engine',
      subtitle: 'Tokenomics, Liquidity & Fee Revenue',
      desc: 'View central reserve pool, circulating XCHEF-P/E supply, and stress-test network transactions.',
      icon: Cpu,
      color: 'from-[#7b2cbf]/20 to-transparent',
      borderColor: 'border-[#7b2cbf]/30',
      textColor: 'text-[#c77dff]',
      btnBg: 'bg-[#7b2cbf] text-white hover:bg-[#9d4edd]',
      href: '/treasury',
      badge: 'Economic Engine'
    },
  ];

  return (
    <main className="flex-1 flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#00ff9d]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#7b2cbf]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="mt-4 mb-6 text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#00ff9d] mb-3">
          <Zap className="w-3.5 h-3.5 animate-pulse" />
          <span>Simulation-First MVP v1.0</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
          XCHEFPAY ECOSYSTEM
        </h1>
        <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
          Select your role in the food supply chain to launch the economic simulation.
        </p>
      </header>

      {/* Role Cards List */}
      <div className="space-y-4 z-10 my-auto">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <div
              key={role.id}
              className={`glass-card rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] border ${role.borderColor}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-50 pointer-events-none`} />
              
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${role.textColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white leading-tight">{role.title}</h2>
                      <p className="text-xs text-gray-400">{role.subtitle}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-300 my-3 line-clamp-2">
                  {role.desc}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400">
                    {role.badge}
                  </span>
                  <Link
                    href={role.href}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg ${role.btnBg}`}
                  >
                    <span>Enter Role</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <footer className="mt-6 text-center z-10">
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00ff9d]" />
          <span>Local Simulation Mode • No Real Crypto Required</span>
        </div>
      </footer>
    </main>
  );
}
