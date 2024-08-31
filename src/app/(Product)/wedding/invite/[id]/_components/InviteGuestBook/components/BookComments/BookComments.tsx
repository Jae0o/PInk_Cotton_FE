'use client';

import { useCallback } from 'react';

import { AlertModal, LoginModal, PasswordModal } from '@/components/client';
import { QUERY_OPTIONS } from '@/constants';
import { useToggle } from '@/hooks';
import { GuestBook } from '@/types/response';
import { useQuery } from '@tanstack/react-query';

import { BookCommentsProps } from './BookComments.type';
import { BookCommentItem } from './components';
import { useAdminDeleteComment, useCheckLogin, useCommentId, useDeleteComment } from './hooks';

export const BookComments = ({ inviteId }: BookCommentsProps) => {
  const { isToggle, handleSetTrue, handleSetFalse } = useToggle();
  const {
    isToggle: isAlertModal,
    handleSetTrue: handleOpenAlert,
    handleSetFalse: handleCloseAlert,
  } = useToggle();

  const {
    isToggle: isLoginModal,
    handleSetTrue: handleOpenLogin,
    handleSetFalse: handleCloseLogin,
  } = useToggle();

  const { data, refetch } = useQuery<GuestBook>(QUERY_OPTIONS.GET_GUEST_BOOKS({ inviteId: 'key' }));

  const { commentId, handleChangeId } = useCommentId(handleSetTrue);

  const handleDelete = useDeleteComment({
    commentId,
    inviteId,
    onSuccess: () => {
      refetch();
      handleOpenAlert();
    },
  });

  const handleAdminDelete = useAdminDeleteComment({
    commentId,
    inviteId,
    onSuccess: () => {
      refetch();
      handleOpenAlert();
    },
  });

  const isLogin = useCheckLogin();

  const convertDate = useCallback((date: string) => {
    const changedDate = new Date(date);

    return `${changedDate.getFullYear()}.${changedDate.getMonth() + 1}.${changedDate.getDate()}`;
  }, []);

  if (!data) {
    return null;
  }

  return (
    <ul className='w-full px-[1.6rem] flex flex-col gap-[2rem]'>
      {data.result.content.map(({ message, created, name, id }) => (
        <BookCommentItem
          key={created + name}
          message={message}
          name={name}
          created={convertDate(created)}
          id={id}
          onDelete={handleChangeId}
        />
      ))}

      <PasswordModal
        isShow={isToggle}
        isLogin={isLogin}
        onClose={handleSetFalse}
        onAccept={handleDelete}
        onLogin={handleOpenLogin}
        onAdminDelete={handleAdminDelete}
      />

      <AlertModal
        isShow={isAlertModal}
        onClose={handleCloseAlert}
        message='메세지가 정상적으로 제거되었습니다.'
      />

      <LoginModal
        isShow={isLoginModal}
        onClose={handleCloseLogin}
      />
    </ul>
  );
};

export default BookComments;
