const MINUTES_IN_HOUR = 60;

const getMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * MINUTES_IN_HOUR + minutes;
};

const isMeetingInWorkday = (workStart, workEnd, meetingStart, meetingDuration) => {
  const meetingStartMinutes = getMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= getMinutes(workStart) && meetingEndMinutes <= getMinutes(workEnd);
};

isMeetingInWorkday('08:00', '17:30', '14:00', 90); // true
isMeetingInWorkday('8:0', '10:0', '8:0', 120); // true
isMeetingInWorkday('08:00', '14:30', '14:00', 90); // false
isMeetingInWorkday('14:00', '17:30', '08:0', 90); // false
isMeetingInWorkday('8:00', '17:30', '08:00', 900); // false
