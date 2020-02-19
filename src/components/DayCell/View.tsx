import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '@app/reducers';
import { DayCellDesktopView, DayCellMobileView } from './views';
import { DayCellProps } from './index.d';
import styles from './styles.module.css';

const DayCell: React.FC<DayCellProps> = ({ day, today, mobile }) => {
  const { months } = useSelector((state: RootState) => state.date);
  const isWeekend = day.day() === 0 || day.day() === 6;
  const disabled = months !== day.month();

  return (
    <div className={classNames(styles.container)}>
      {!mobile && (
        <DayCellDesktopView
          day={day}
          today={today}
          isWeekend={isWeekend}
          disabled={disabled}
        />
      )}
      {mobile && (
        <DayCellMobileView
          day={day}
          today={today}
          isWeekend={isWeekend}
        />
      )}
    </div>
  );
};

export default DayCell;
