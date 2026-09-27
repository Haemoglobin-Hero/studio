import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GeoLab — O/L Geography',
  description: 'Textbook-grounded O/L Geography study workspace for Grades 10 and 11.'
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
