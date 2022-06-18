import React, { useCallback, useMemo } from 'react';
import { staffSearch_Page_staff, staffSearch_Page_staff_staffMedia_edges } from '../graphql/types/staffSearch';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import CopyToClipboard from 'react-copy-to-clipboard';

type Props = {
  staff: staffSearch_Page_staff;
  className?: string;
};

const StaffCard = (props: Props) => {
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
    return staff.staffMedia?.edges
      ?.filter((e): e is staffSearch_Page_staff_staffMedia_edges => !!e)
      .map((edge) => {
        return (
          <div className={'basis-1/3'} key={edge.node?.id}>
            <img
              className={'object-contain'}
              src={edge.node?.coverImage?.large ?? ''}
              alt={edge.node?.title?.userPreferred ?? ''}
            />
          </div>
        );
      });
  }, [staff]);

  return (
    <CopyToClipboard text={window.origin + `/.netlify/functions/staff?id=${staff.id}`} onCopy={handleOnCopy}>
      <div className={classNames('m-4 flex flex-col items-center border', className)}>
        <div className={'relative'}>
          <img src={staff.image?.large ?? ''} alt={staff.name?.userPreferred ?? ''} />
          <div className={'absolute bottom-0 bg-slate-50 p-2'}>
            <p className={'opacity-100'}>{staff.name?.userPreferred}</p>
            <p>{staff.primaryOccupations?.join(', ')}</p>
          </div>
        </div>
        <div className={'flex flex-row'}>{popularMedia}</div>
      </div>
    </CopyToClipboard>
  );
};

export default StaffCard;
