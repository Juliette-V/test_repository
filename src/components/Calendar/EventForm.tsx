import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { FormEvent, useEffect, useState } from 'react';
import { createEventId } from '../../event-utils';
import { COLORS } from '../../constants/colors';
import { EventFormLocation, EventFormMode } from '../../types';
import { getTimeString } from '../../utils';

interface IProps {
  onClose: () => void;
  location?: EventFormLocation | null;
  formMode: EventFormMode;
  selectInfo?: DateSelectArg;
  clickInfo?: EventClickArg;
}

export const EventForm = ({ onClose, location, selectInfo, formMode, clickInfo }: IProps) => {
  const [title, setTitle] = useState<string | undefined>('');
  const [date, setDate] = useState<string | undefined>('');
  const [allDay, setAllDay] = useState(true);
  const [timeStart, setTimeStart] = useState<string | undefined>('');
  const [timeEnd, setTimeEnd] = useState<string | undefined>('');
  const [note, setNote] = useState<string | undefined>('');
  const [color, setColor] = useState(COLORS[0].value);

  const clearForm = () => {
    setTitle('');
    setDate('');
    setTimeStart('');
    setTimeEnd('');
    setNote('');
    setColor(COLORS[0].value);
  };

  const setInitialFormData = () => {
    if (!clickInfo) {
      clearForm();
      return;
    }
    setTitle(clickInfo?.event.title);
    setDate(clickInfo.event.startStr.slice(0, 10));
    setTimeStart(getTimeString(clickInfo.event.start));
    setTimeEnd(getTimeString(clickInfo.event.end));
    setAllDay(clickInfo.event.allDay);
    setColor(clickInfo.event.backgroundColor);
    setNote(clickInfo.event.extendedProps.note);
  };

  const handleClose = () => {
    onClose();
    clearForm();
  };

  const createEvent = (start: string, end: string | undefined) => {
    if (!selectInfo) return;
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    calendarApi.addEvent({
      id: createEventId(),
      title,
      start,
      end: end || selectInfo.endStr,
      allDay,
      color,
      note,
    });
  };

  const editEvent = (start: string, end: string | undefined) => {
    if (!clickInfo) return;

    clickInfo.event.setStart(start);
    clickInfo.event.setEnd(end || '');
    clickInfo.event.setExtendedProp('note', note);
    clickInfo.event.setProp('backgroundColor', color);
    clickInfo.event.setProp('borderColor', color);

    clickInfo.event.mutate({
      standardProps: {
        title,
        allDay,
      },
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date) return;

    const start = date && timeStart ? `${date}T${timeStart}:00` : date;
    const end = allDay
      ? new Date(+new Date(date) + 24 * 60 * 60 * 1000).toUTCString()
      : date && timeEnd && `${date}T${timeEnd}:00`;

    formMode === 'create' ? createEvent(start, end) : editEvent(start, end);

    handleClose();
  };

  const onDeleteClick = () => {
    clickInfo?.event.remove();
    handleClose();
  };

  const onCancelClick = () => {
    handleClose();
  };

  useEffect(() => {
    formMode === 'create' ? clearForm() : setInitialFormData();
  }, [selectInfo, clickInfo, formMode]);

  return (
    <>
      {!!location && (
        <form
          onSubmit={onSubmit}
          style={{ position: 'absolute', left: location.left + 'px', top: location.top + 'px' }}
          className="event_form"
        >
          <div className="event_form__triangle"></div>
          <button className="event_form__close" onClick={handleClose}>
            +
          </button>
          <input
            className="event_form__text-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="event name"
          />
          <div className="input-container">
            <input
              className="event_form__text-input "
              required
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="event date"
              onFocus={(e) => (e.target.type = 'date')}
            />
            <img src="icon-calendar.svg" alt="" />
          </div>
          <div className="input-container">
            <input
              className="event_form__text-input"
              type="text"
              value={timeStart}
              onChange={(e) => setTimeStart(e.target.value)}
              placeholder="event time"
              onFocus={(e) => (e.target.type = 'time')}
            />
            <img src="icon-clock.svg" alt="" />
          </div>
          <div className="event_form__checkbox-container">
            <label htmlFor="allDay">All Day</label>
            <input
              type="checkbox"
              name="allDay"
              checked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
            />
          </div>
          {!allDay && (
            <div className="input-container">
              {' '}
              <input
                className="event_form__text-input "
                type="text"
                value={timeEnd}
                onChange={(e) => setTimeEnd(e.target.value)}
                placeholder="event end time"
                onFocus={(e) => (e.target.type = 'time')}
              />
              <img src="icon-clock.svg" alt="" />
            </div>
          )}
          <select
            className="event_form__select"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          >
            {COLORS.map((color) => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>
          <input
            className="event_form__text-input notes"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="notes"
          />
          <div className="event_form__buttons">
            <button
              className="event_form__cancel-btn"
              onClick={formMode === 'create' ? onCancelClick : onDeleteClick}
              type="button"
            >
              {formMode === 'create' ? 'Cancel' : 'Discard'}
            </button>
            <button className="event_form__save-btn" type="submit">
              {formMode === 'create' ? 'Save' : 'Edit'}
            </button>
          </div>
        </form>
      )}
    </>
  );
};
