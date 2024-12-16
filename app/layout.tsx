'use client';

import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { ReactNode } from "react"; // Import ReactNode from react
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { config } from './wagmi';
import { AuthContextProvider } from "@/app/lib/context/AuthContext";
import { DIDContextProvider } from "@/app/lib/context/DIDContext";
import { WalletContextProvider } from "./lib/context/WalletContext";
import { DailyActionProvider } from "@/app/lib/context/FlagContext";
import { ActivityContextProvider } from "./lib/context/ActivityContext";

const queryClient = new QueryClient();

interface RootLayoutProps {
  children: ReactNode; // Explicitly type the 'children' prop
}



export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body>
        {/* Wrap your app in the AuthContextProvider to provide context globally */}
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider locale="en-US">
              <AuthContextProvider>
                <DailyActionProvider>
                  <DIDContextProvider>
                    <WalletContextProvider>
                      <ActivityContextProvider>
                        {children}
                      </ActivityContextProvider>
                    </WalletContextProvider>
                  </DIDContextProvider>
                </DailyActionProvider>
              </AuthContextProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
