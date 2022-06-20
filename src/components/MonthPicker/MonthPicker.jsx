import { Button } from '@mui/material';
import { useState } from 'react';
import ReactMonthPicker from 'react-month-picker';
import 'react-month-picker/css/month-picker.css';
import { useDispatch } from 'react-redux';
import { loadNotesAsyncActions } from '../../redux/actions/notes-async-actions';

const MonthPicker = ({ range }) => {
  const dispatch = useDispatch();
  const [isVisible, setVisibility] = useState(false);
  const [monthYear, setMonthYear] = useState({});

  const showMonthPicker = event => {
    setVisibility(true);
    event.preventDefault();
  };

  const handleOnDismiss = () => {
    setVisibility(false);
  };

  const handleOnChange = (year, month) => {
    setMonthYear({ year, month });
    setVisibility(false);
    const dates = {
      start: new Date(year, month - 1, 1),
      end: new Date(year, month, 0),
    };
    dispatch(loadNotesAsyncActions(dates));
  };

  const getMonthValue = () => {
    const month = monthYear && monthYear.month ? monthYear.month : 0;
    const year = monthYear && monthYear.year ? monthYear.year : 0;

    return month && year ? `${String(month).padStart(2, '0')} / ${year}` : 'Текущий месяц';
  };

  return (
    <div className="MonthYearPicker">
      <Button sx={{ height: '40px', width: '160px' }} variant="contained" onClick={showMonthPicker}>
        {getMonthValue()}
      </Button>

      <ReactMonthPicker
        show={isVisible}
        lang={[
          'Январь',
          'Февраль',
          'Март',
          'Апрель',
          'Май',
          'Июнь',
          'Июль',
          'Август',
          'Сентябрь',
          'Октябрь',
          'Ноябрь',
          'Декабрь',
        ]}
        years={range}
        value={monthYear}
        onChange={handleOnChange}
        onDismiss={handleOnDismiss}
      />
    </div>
  );
};

export default MonthPicker;
