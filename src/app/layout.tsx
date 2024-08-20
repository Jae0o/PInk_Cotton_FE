import '@/styles/globals.css';

import type { Metadata } from 'next';
import Script from 'next/script';

import { PretendardFont } from '@/assets/font/index';

import { GoogleAnalytics, MswProvider, TanstackProvider, ToastProvider } from './_components';

export const metadata: Metadata = {
  title: 'Pink Cotton',
  description: '결혼식 청첩장',
};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
const URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services,clusterer,drawing&autoload=false`;

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang='ko'
      className={`${PretendardFont.className} mobile:text-[55%] tablet:text-[55%] text-black_900`}
    >
      <body>
        <TanstackProvider>
          <Script
            type='text/javascript'
            src={URL}
            strategy='beforeInteractive'
          />
          <Script
            src='https://developers.kakao.com/sdk/js/kakao.js'
            strategy='afterInteractive'
          />
          {process.env.NEXT_PUBLIC_G_TAG ? <GoogleAnalytics /> : null}
          <MswProvider />
          <main
            id='app'
            className='min-w-[40rem]'
          >
            {children}
          </main>
          <ToastProvider />
        </TanstackProvider>
      </body>
    </html>
  );
};

export default RootLayout;
