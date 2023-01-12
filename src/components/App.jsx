import { useState } from 'react';
import { GlobalStyle } from '../GlobalStyles';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './FeedbackStatistics/Statistics';
import { Notification } from './Notification/Notification';
import { Box } from './Box';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countValue = option => {
    switch (option) {
      case 'Good':
        return setGood(prevState => prevState + 1);
      case 'Neutral':
        return setNeutral(prevState => prevState + 1);
      case 'Bad':
        return setBad(prevState => prevState + 1);
      default:
        return;
    }
  };

  const countTotalFeedback = () =>
    Object.values([good, neutral, bad]).reduce(
      (previous, current) => previous + current
    );

  const countPositiveFeedbackPercentage = () =>
    ((good / countTotalFeedback()) * 100).toFixed(0);

  const options = ['Good', 'Neutral', 'Bad'];

  return (
    <Box m="0 auto" p="40px" width="600px">
      <Box mb="40px">
        <Section title="Please leave feedback">
          <FeedbackOptions options={options} onLeaveFeedback={countValue} />
        </Section>
      </Box>

      <Section title="Statistics">
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>

      <GlobalStyle />
    </Box>
  );
};
