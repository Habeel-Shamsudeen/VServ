'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from "@/components/ui/toaster";
import { RecoilRoot } from 'recoil';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
    </RecoilRoot>
  );
};