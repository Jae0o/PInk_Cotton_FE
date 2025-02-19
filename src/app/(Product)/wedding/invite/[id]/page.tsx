import { Metadata } from 'next';
import { Nanum_Myeongjo } from 'next/font/google';

import { QUERY_KEYS, QUERY_OPTIONS, getQueryClient } from '@/constants';
import { INVITATION_META_DATA } from '@/constants/MetaData';
import { getInvitation } from '@/services/server';
import { InvitationResponse } from '@/types/response';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import {
  InviteAccount,
  InviteArticle,
  InviteCalender,
  InviteContact,
  InviteCover,
  InviteGallery,
  InviteGuestBook,
  InviteLocation,
} from './_components';

interface Props {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  try {
    const response: InvitationResponse = await getInvitation(params.id);

    return INVITATION_META_DATA(response);
  } catch (error) {
    return {};
  }
};

const NanumMyeongjo = Nanum_Myeongjo({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--nanum',
});

const InvitePage = async ({ params }: Props) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(QUERY_OPTIONS.INVITATION(params.id));

  const data = queryClient.getQueryData<InvitationResponse>(QUERY_KEYS.INVITATION(params.id));

  if (!data?.result) {
    return null;
  }

  const { account, cover, article, contact, gallery, place, transport } = data.result;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className='w-full h-full flex justify-center bg-gray_900'>
        <div
          className={`max-w-[45rem] w-full h-full overflow-scroll bg-white scrollbar-hide shadow-shadow_500 font-nanum ${NanumMyeongjo.className}`}
        >
          <InviteCover coverData={cover} />
          <InviteArticle article={article} />
          <InviteContact contactData={contact} />
          <InviteCalender calenderData={cover.weddingDate} />
          <InviteGallery galleryData={gallery} />
          <InviteLocation
            placeData={place}
            transportData={transport}
          />
          <InviteAccount accountData={account} />
          <InviteGuestBook inviteId={params.id} />
        </div>
      </section>
    </HydrationBoundary>
  );
};

export default InvitePage;
