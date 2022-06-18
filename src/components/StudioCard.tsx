import React, { useCallback } from 'react';
import classNames from 'classnames';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

type Props = {
  id: number;
  name: string;
  className?: string;
};

const StudioCard = (props: Props) => {
  const { id, name, className } = props;

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

  return (
    <CopyToClipboard text={window.origin + `/.netlify/functions/studio?id=${id}`} onCopy={handleOnCopy}>
      <div
        className={classNames(
          'm-4 cursor-pointer rounded-md border bg-white p-2 shadow-md hover:bg-slate-100',
          className
        )}
      >
        <img src={`/.netlify/functions/studioLogo?id=${id}`} alt={name} />
        {/*<p>{name}</p>*/}
      </div>
    </CopyToClipboard>
  );
};

export default StudioCard;
