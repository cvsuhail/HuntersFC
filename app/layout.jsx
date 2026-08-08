import '../src/styles.css';

export const metadata={
  metadataBase:new URL('https://hunters-fc-zeta.vercel.app'),
  title:{default:'Hunters FC Nirannaparambu',template:'%s | Hunters FC'},
  description:'Hunters FC Nirannaparambu — football, community, brotherhood and purpose.',
  icons:{icon:'/icon.png',shortcut:'/icon.png',apple:'/icon.png'},
  openGraph:{
    type:'website',
    locale:'en_IN',
    siteName:'Hunters FC Nirannaparambu',
    title:'Hunters FC Nirannaparambu',
    description:'More than football. A club built around passion, brotherhood and the community that made us.',
    images:[{url:'/assets/hunters-og.png',width:1200,height:630,alt:'Hunters FC Nirannaparambu'}],
  },
  twitter:{
    card:'summary_large_image',
    title:'Hunters FC Nirannaparambu',
    description:'More than football. Passion, brotherhood and community.',
    images:['/assets/hunters-og.png'],
  },
};

export default function RootLayout({children}){
  return <html lang="en" data-theme="dark"><body>{children}</body></html>;
}
