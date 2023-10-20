//this page is used for content that does not need to be re-rendered and is shared among other pages.

//This is the top most layout. hence why we call it the root layout. must have the html and body tags.

import './globals.css'
import { Inter } from 'next/font/google'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Document Submission Application using AWS',
  description: 'This application is designed to implement AWS services.',
}

// export function Button({children,val}){
//   return(

//     <button onClick={children}>
//       {val}
//     </button>
//   );
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
