import './globals.css';

export const metadata = {
  title: 'Purv Kabaria',
  description: 'Made by Purv',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
