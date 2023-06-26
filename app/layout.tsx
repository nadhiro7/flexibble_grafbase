import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import '@/styles/globals.css'
export const metadata = {
    title: 'Flexible',
    description: 'show and discover developer projects'
}

export default function RootLayout({children} : {children: React.ReactNode}){
    return(
        <html>
            <body lang='en'>
                <Navbar />
                <main>
                {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}