import '../src/styles.css';

export const metadata={
  title:{default:'Hunters FC Nirannaparambu',template:'%s | Hunters FC'},
  description:'Hunters FC Nirannaparambu — football, community, brotherhood and purpose.',
};

export default function RootLayout({children}){
  return <html lang="en" data-theme="dark"><body>{children}</body></html>;
}
