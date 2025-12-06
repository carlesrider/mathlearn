import './globals.css';
import { ReactNode } from 'react';
import { GameProvider } from '@/context/GameContext';
import NavBar from '@/components/NavBar';

export const metadata = {
  title: 'Mates per a petits',
  description: 'Aprèn matemàtiques amb jocs divertits'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ca">
      <body className="min-h-screen bg-gradient-to-br from-skySplash/30 via-white to-candyPink/30">
        <GameProvider>
          <div className="flex min-h-screen flex-col">
            <NavBar />
            <main className="flex-1">{children}</main>
          </div>
        </GameProvider>
      </body>
    </html>
  );
}
