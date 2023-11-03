import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactElement, ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Library',
  description: 'Book management system',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="menu flex justify-center m-5">
          <a
            key="link_home"
            className="menu_link m-5 hover:opacity-70"
            href="/"
          >
            Accueil
          </a>
          <a
            key="link_books"
            className="menu_link m-5 hover:opacity-70"
            href="/books"
          >
            Livres
          </a>
          <a
            key="link_users"
            className="menu_link m-5 hover:opacity-70"
            href="/users"
          >
            Utilisateurs
          </a>
          <a
            key="link_authors"
            className="menu_link m-5 hover:opacity-70"
            href="/authors"
          >
            Auteurs
          </a>
        </div>
        {children}
      </body>
    </html>
  );
}
