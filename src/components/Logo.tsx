import React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
};

const Logo = (props: Props) => {
  const { className } = props;
  return <div className={classNames('font-sans-sc text-5xl', className)}>AnimeFeed</div>;
};

export default Logo;
