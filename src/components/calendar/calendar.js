import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Segment } from 'semantic-ui-react';
import Button from '../button';
import TodayButton from '../today-button';
import CalendarCell from '../cell';
import { getToday } from '../../utils';
import './calendar.css';

const styles = {
  leftBtn: { textAlign: 'start' },
  rightBtn: { textAlign: 'end' },
};

const pointings = {
  'top left': 'clndr-top clndr-left',
  'top right': 'clndr-top clndr-right',
  left: 'clndr-left',
  right: 'clndr-right',
};

const Calendar = ({
  calendars,
  filterDate,
  getBackProps,
  getDateProps,
  getForwardProps,
  maxDate,
  minDate,
  months,
  nextMonth,
  nextYear,
  previousMonth,
  previousYear,
  showToday,
  todayButton,
  weekdays,
  pointing,
}) => (
  <Segment className={cn('clndr-calendars-segment', pointings[pointing])}>
    <div
      className="clndr-calendars-wrapper"
      style={{ '--n': calendars.length }}
    >
      {calendars.map((calendar, calendarIdx) => (
        <div key={`${calendar.year}-${calendar.month}`}>
          <div className="clndr-control">
            <div style={styles.leftBtn}>
              {calendarIdx === 0 && (
                <Fragment>
                  <Button
                    icon="angle double left"
                    title={previousYear}
                    {...getBackProps({ calendars, offset: 12 })}
                  />
                  <Button
                    icon="angle left"
                    style={{ marginRight: 0 }}
                    title={previousMonth}
                    {...getBackProps({ calendars })}
                  />
                </Fragment>
              )}
            </div>

            <span title={`${months[calendar.month]} ${calendar.year}`}>
              {months[calendar.month].slice(0, 3)} {calendar.year}
            </span>

            <div style={styles.rightBtn}>
              {calendarIdx === calendars.length - 1 && (
                <Fragment>
                  <Button
                    icon="angle right"
                    title={nextMonth}
                    {...getForwardProps({ calendars })}
                  />
                  <Button
                    icon="angle double right"
                    style={{ marginRight: 0 }}
                    title={nextYear}
                    {...getForwardProps({ calendars, offset: 12 })}
                  />
                </Fragment>
              )}
            </div>
          </div>
          <div className="clndr-days">
            {weekdays.map(weekday => (
              <CalendarCell
                key={`${calendar.year}-${calendar.month}-${weekday}`}
                title={weekday}
              >
                {weekday.slice(0, 2)}
              </CalendarCell>
            ))}
            {calendar.weeks.map(week =>
              week.map((dateObj, weekIdx) => {
                const key = `${calendar.year}-${calendar.month}-${weekIdx}`;

                if (!dateObj) {
                  return <CalendarCell key={key} />;
                }

                const selectable =
                  dateObj.selectable && filterDate(dateObj.date);

                return (
                  <CalendarCell
                    key={key}
                    {...dateObj}
                    {...getDateProps({ dateObj: { ...dateObj, selectable } })}
                    selectable={selectable}
                  >
                    {dateObj.date.getDate()}
                  </CalendarCell>
                );
              })
            )}
          </div>
        </div>
      ))}
    </div>
    {showToday && (
      <TodayButton
        {...getToday(minDate, maxDate)}
        {...getDateProps({
          dateObj: getToday(minDate, maxDate),
        })}
      >
        {todayButton}
      </TodayButton>
    )}
  </Segment>
);

Calendar.propTypes = {
  calendars: PropTypes.array.isRequired,
  filterDate: PropTypes.func.isRequired,
  getBackProps: PropTypes.func.isRequired,
  getDateProps: PropTypes.func.isRequired,
  getForwardProps: PropTypes.func.isRequired,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  months: PropTypes.array.isRequired,
  nextMonth: PropTypes.string.isRequired,
  nextYear: PropTypes.string.isRequired,
  pointing: PropTypes.oneOf(['left', 'right', 'top left', 'top right']),
  previousMonth: PropTypes.string.isRequired,
  previousYear: PropTypes.string.isRequired,
  showToday: PropTypes.bool,
  todayButton: PropTypes.string.isRequired,
  weekdays: PropTypes.array.isRequired,
};

Calendar.defaultProps = {
  pointing: 'left',
  maxDate: null,
  minDate: null,
  showToday: true,
};

export default Calendar;
