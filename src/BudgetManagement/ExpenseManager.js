import React from 'react';
import ExpenseList from '../BudgetManagement/ExpenseList';
import Budget from './PreDefinedBudget/Budget';
import AddExpense from './AddExpense';
const ExpenseManager = () => {
    return (
        <div className="abstractbudget">
            <video
                className="background-video"
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '200%',
                    objectFit: 'cover', // Ensures the video covers the entire div
                    zIndex: -1, // Ensures the video stays in the background
                }}
            >
                <source src="https://cdn.pixabay.com/video/2015/10/02/877-141149926_medium.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <Budget/>
            <AddExpense/>
            <ExpenseList />
            
        </div>
    );
};

export default ExpenseManager;
