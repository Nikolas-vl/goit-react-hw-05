import Description from './Description/Description';
import Options from './Options/Options';
import Feedback from './Feedback/Feedback';
import Notification from './Notification/Notification';
import { useState, useEffect } from 'react';

const App = () => {
  const [feedback, setFeedback] = useState(() => {
    const savedData = localStorage.getItem('feedback');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('Error parsing feedback from localStorage:', error);
        return { good: 0, neutral: 0, bad: 0 };
      }
    }
    return { good: 0, neutral: 0, bad: 0 };
  });

  const updateFeedback = feedbackType => {
    setFeedback(prev => ({
      ...prev,
      [feedbackType]: prev[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => {
    const reset = { good: 0, neutral: 0, bad: 0 };
    setFeedback(reset);
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = totalFeedback > 0 ? Math.round((feedback.good / totalFeedback) * 100) : 0;

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);

  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} reset={resetFeedback} total={totalFeedback} />
      {totalFeedback > 0 ? <Feedback feedback={feedback} total={totalFeedback} positive={positiveFeedback} /> : <Notification />}
    </>
  );
};

export default App;
