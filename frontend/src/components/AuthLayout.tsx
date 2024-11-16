import React from 'react';

export default function AuthLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-3xl" />
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center backdrop-blur-lg dark:bg-black/20" />
            {children}
        </div>
    );
}