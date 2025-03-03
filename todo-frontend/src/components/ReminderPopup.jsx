import React from "react";
import "../App.css";

const ReminderPopup = ({ reminders, removeReminder }) => {
  return (
    <div className={`reminder-container ${reminders.length > 0 ? "show" : ""}`}>
      {reminders.map((reminder) => (
        <div key={reminder.id} className="reminder">
          <span className="reminder-text">
            <strong>{reminder.title}</strong> is {reminder.message}
          </span>
          <button className="close-reminder" onClick={() => removeReminder(reminder.id)}>❌</button>
        </div>
      ))}
    </div>
  );
};

export default ReminderPopup;
