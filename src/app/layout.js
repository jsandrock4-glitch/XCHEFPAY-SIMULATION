import '../styles/globals.css';

export const metadata = {
  title: 'XCHEFPAY Economic Simulation',
  description: 'Simulation-First MVP for XCHEFPAY Ecosystem',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0d14] text-white min-h-screen antialiased selection:bg-[#00ff9d] selection:text-black">
        <div className="max-w-md mx-auto min-h-screen relative flex flex-col justify-between border-x border-white/5 bg-[#0c1017]">
          {children}
        </div>
      </body>
    </html>
  );
}