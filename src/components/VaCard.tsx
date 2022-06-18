import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import CopyToClipboard from 'react-copy-to-clipboard';
import { vaSearch_Page_staff, vaSearch_Page_staff_characters_edges } from '../graphql/types/vaSearch';

type Props = {
  staff: vaSearch_Page_staff;
  className?: string;
};

const VaCard = (props: Props) => {
  const { staff, className } = props;

  const handleOnCopy = useCallback(() => {
    toast('Feed URL copied to clipboard', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, []);

  const popularMedia = useMemo(() => {
    return staff.characters?.edges
      ?.filter((e): e is vaSearch_Page_staff_characters_edges => !!e)
      .map((edge) => {
        return (
          <div className={'basis-1/3'} key={edge.node?.id}>
            <img
              className={'h-full object-cover'}
              src={edge.node?.image?.large ?? ''}
              alt={edge.node?.name?.userPreferred ?? ''}
            />
          </div>
        );
      });
  }, [staff]);

  return (
    <CopyToClipboard text={window.origin + `/.netlify/functions/staff?id=${staff.id}`} onCopy={handleOnCopy}>
      <div
        className={classNames(
          'm-4 flex flex-col items-center overflow-hidden rounded-md border shadow-md hover:shadow-lg',
          className
        )}
      >
        <div className={'relative'}>
          <img src={staff.image?.large ?? ''} alt={staff.name?.userPreferred ?? ''} />
          <div className={'absolute bottom-0 bg-slate-50 bg-opacity-50 p-1'}>
            <p className={'text-sm'}>{staff.name?.userPreferred}</p>
          </div>
        </div>
        <div className={'flex flex-row'}>{popularMedia}</div>
      </div>
    </CopyToClipboard>
  );
};

export default VaCard;
