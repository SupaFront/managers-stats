import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorized } from '../../redux/selectors/opsSelectors';
import NameSelectAdmin from './NameSelects/NameSelectAdmin';

import NameSelectManager from './NameSelects/NameSelectManager';
export default function NameSelect() {
  const authorized = useSelector(getAuthorized);

  return <div>{authorized ? <NameSelectAdmin /> : <NameSelectManager />}</div>;
}
