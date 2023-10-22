import React from 'react';

type Props = {
  children?: React.ReactNode;
};

const Root: React.FC<Props> = ({ children }) => <div>{children}</div>;

export default Root;
