import React, { useEffect, useState } from "react";
import "../App.css";

const ReminderPopup = ({ reminders, removeReminder }) => {
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    const lastSeenReminders = sessionStorage.getItem("lastSeenReminders");

    const currentReminders = JSON.stringify(reminders);

    if (reminders.length > 0 && lastSeenReminders !== currentReminders) {
      setShowReminder(true);
      sessionStorage.setItem("lastSeenReminders", currentReminders); 
    }
  }, [reminders]); 

  if (!showReminder) return null; 

  return (
    <div className={`reminder-container ${reminders.length > 0 ? "show" : ""}`}>
      {reminders.map((reminder) => (
        <div key={reminder.id} className="reminder">
          <span className="reminder-text">
            <strong>{reminder.title}</strong> is {reminder.message}
          </span>
          <button
            className="close-reminder"
            onClick={() => {
              removeReminder(reminder.id);
              setShowReminder(false); 
            }}
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReminderPopup;
