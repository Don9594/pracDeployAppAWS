//this page is used for content that does not need to be re-rendered and is shared among other pages.

//This is the top most layout. hence why we call it the root layout. must have the html and body tags.

import './globals.css';
import { Inter } from 'next/font/google';
import SessionProvider  from '@/app/_components/SessionProvider';
import { getServerSession } from 'next-auth';
import NavMenu from './_components/NavMenu';



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Document Submission Application using AWS',
  description: 'This application is designed to implement AWS services.',
}



export default async function RootLayout({ children }) {

  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <NavMenu/>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
