'use client';

import Image from 'next/image';

import { useGetElementWidth } from '@/hooks';

import { WeddingTemplateProps } from '../../WeddingTemplates.type';
import TemplateInfo from '../TemplateInfo/TemplateInfo';

const WeddingTemplate1 = ({ details, groomName, brideName, imageUrl }: WeddingTemplateProps) => {
  const { ref, width } = useGetElementWidth();

  return (
    <figure
      ref={ref}
      className='w-full h-full flex flex-col items-center justify-center'
      style={{
        gap: `${width * 0.0702}px`,
        height: `${width * 1.77}px`,
      }}
    >
      <h3
        style={{
          fontSize: `${width * 0.05}px`,
          letterSpacing: `${width * 0.008}px`,
        }}
      >
        우리결혼합니다
      </h3>

      <div
        className='relative'
        style={{
          width: `${width * 0.614}px`,
          height: `${width * 0.614}px`,
        }}
      >
        <Image
          src={imageUrl}
          className='object-top object-cover'
          fill
          sizes='100% 100%'
          priority
          alt='template - 1 Image'
        />
      </div>

      <TemplateInfo
        width={width}
        brideName={brideName}
        groomName={groomName}
        details={details}
      />
    </figure>
  );
};

export default WeddingTemplate1;
