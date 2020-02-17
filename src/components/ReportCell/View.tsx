import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '@app/reducers';
import { ReportCellDesktopView, ReportCellMobileView } from './views';
import { ReportCellProps } from './index.d';
import styles from './styles.module.css';

const ReportCell: React.FC<ReportCellProps> = ({ day, mobile }) => {
  const { months } = useSelector((state: RootState) => state.date);
  const isWeekend = day.day() === 0 || day.day() === 6;
  const disabled = months !== day.month();

  return (
    <div className={classNames(styles.container)}>
      {!mobile && (
        <ReportCellDesktopView
          day={day}
          isWeekend={isWeekend}
          disabled={disabled}
        />
      )}
      {mobile && (
        <ReportCellMobileView day={day} isWeekend={isWeekend} />
      )}
    </div>
  );
};

export default ReportCell;
