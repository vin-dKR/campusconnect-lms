import { inter, spaceGrotesk, sourceCodePro } from './fonts'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${sourceCodePro.variable}`}>
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
