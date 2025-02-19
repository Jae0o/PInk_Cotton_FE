'use client';

import { useMemo } from 'react';

import { UseAccordionStyle } from './useAccordionStyle.type';

import { twJoin } from 'tailwind-merge';

const useAccordionStyle = ({ type, isToggle }: UseAccordionStyle) => {
  const layoutStyle = useMemo(
    () =>
      twJoin(
        'w-full overflow-hidden',
        type === 'main' && 'max-w-[55rem]',
        type === 'edit' && 'max-w-[73rem] rounded-radius10 shadow-shadow_500',
        isToggle && type === 'account' && 'pb-[0.2rem]',
      ),
    [isToggle, type],
  );

  const buttonStyle = useMemo(
    () =>
      twJoin(
        'flex w-full select-none items-center break-keep text-start',
        type === 'edit' && 'h-[6rem] px-[2.4rem] text-size15 font-semibold',
        type === 'main' && 'h-[8rem] text-size16 font-semibold',
        type === 'account' &&
          'h-[6rem] px-[2rem] rounded-radius6 bg-brown_100 text-brown_500 text-size14 font-bold',
      ),
    [type],
  );

  const buttonInnerStyle = useMemo(
    () =>
      twJoin(
        'flex flex-1 items-center',
        type === 'main' && 'gap-1 pl-[1rem]',
        type === 'edit' && 'gap-2',
        type === 'account' && 'justify-center gap-[0.6rem]',
      ),
    [type],
  );

  const contentStyle = useMemo(
    () =>
      twJoin(
        'w-full',
        type === 'edit' && 'px-[2.4rem] py-2',
        type === 'main' && 'px-[1rem] pb-2',
        type === 'account' && 'rounded-radius6 bg-white_100',
      ),
    [type],
  );

  return {
    layoutStyle,
    buttonStyle,
    buttonInnerStyle,
    contentStyle,
  };
};

export default useAccordionStyle;
