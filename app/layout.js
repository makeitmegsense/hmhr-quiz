import { LanguageProvider } from '../lib/LanguageContext';
import './globals.css';

export const metadata = {
  title: 'Hum Mein Hai Rajiv | Congress Seva Dal',
  description:
    'A quiz celebrating the life, vision and legacy of Rajiv Gandhi — India\'s youngest Prime Minister. An initiative by Congress Seva Dal.',
  keywords: 'Rajiv Gandhi, Congress Seva Dal, Hum Mein Hai Rajiv, Indian National Congress, Quiz, HMHR',
  openGraph: {
    title: 'Hum Mein Hai Rajiv',
    description: 'A Congress Seva Dal quiz on the life, vision and legacy of Rajiv Gandhi',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
