import { FC } from 'react';

const Admin: FC = () => {
  // eslint-disable-next-line no-restricted-globals
  const url = 'Das ist eine Test';
  return <p>{url?.toString() ?? 'no parent'}</p>;
};

export default Admin;
