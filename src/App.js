import React, { useState } from 'react';

import CourseGoalList from './components/CourseGoals/CourseGoalList/CourseGoalList';
import CourseInput from './components/CourseGoals/CourseInput/CourseInput';
import './App.css';

const App = () => {
  const [courseGoals, setCourseGoals] = useState(sessionStorage.getItem("goals_list") != null ? JSON.parse(sessionStorage.getItem("goals_list")) : [
    { text: 'This is a dummy goal!', id: 'g1' }
  ]);

  const setGoalsInSessionStorage = goalsList => {
    sessionStorage.setItem("goals_list", JSON.stringify(goalsList))
  }

  const addGoalHandler = enteredText => {
    setCourseGoals(prevGoals => {
      const updatedGoals = [...prevGoals];
      updatedGoals.unshift({ text: enteredText, id: Math.random().toString() });
      setGoalsInSessionStorage(updatedGoals);
      return updatedGoals;
    });
  };

  const deleteItemHandler = goalId => {
    setCourseGoals(prevGoals => {
      const updatedGoals = prevGoals.filter(goal => goal.id !== goalId);
      setGoalsInSessionStorage(updatedGoals);
      return updatedGoals;
    });
  };

  let content = (
    <p style={{ textAlign: 'center' }}>No goals found. Maybe add one?</p>
  );

  if (courseGoals.length > 0) {
    content = (
      <CourseGoalList items={courseGoals} onDeleteItem={deleteItemHandler} />
    );
  }

  return (
    <div>
      <section id="goal-form">
        <CourseInput onAddGoal={addGoalHandler} />
        <p style={{fontSize: "12px", paddingBottom: "0.5rem"}}>PS: Click on a goal to delete it!</p>
      </section>
      <section id="goals">
        {content}
      </section>
    </div>
  );
};

export default App;
