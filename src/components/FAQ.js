import React, { useState } from 'react';

import Collapse from 'react-collapse';

const FAQ = () => {
  const [isOpen, setIsOpen] = useState({}); // Object to track open/closed states

  const questions = [
    {
      question: 'What services do you offer?',
      answer: (
        <p>
          We offer a wide range of repair services for computers, smartphones, tablets, and other devices. Visit our services page for a complete list. We handle common issues like screen repairs, battery replacements, data recovery, and more.
        </p>
      ),
    },
    {
      question: 'How much does a repair cost?',
      answer: (
        <p>
          Our repair costs vary depending on the service needed, device model, and parts required. We offer flat rates for common repairs and hourly rates for more complex issues. Get a free quote by contacting us or using our online quote form.
        </p>
      ),
    },
    {
      question: 'How long will it take to repair my device?',
      answer: (
        <p>
          Our typical repair turnaround times range from 1-3 business days for simple repairs to 5-7 business days for more complex issues. We'll provide an estimated timeframe when you drop off your device or request a quote.
        </p>
      ),
    },
    {
      question: 'Do you offer data backup services?',
      answer: (
        <p>
          Yes, we offer data backup services to ensure your important information is safe during the repair process. We can back up your data to a secure external drive or cloud storage for an additional fee.
        </p>
      ),
    },
    {
      question: 'What warranty do you offer on repairs?',
      answer: (
        <p>
          We offer a 30-day warranty on all repairs, covering parts and labor. This means if your device experiences the same issue within 30 days of the repair, we'll fix it at no additional cost.
        </p>
      ),
    },
    
  ];

  return (
    <section className="faq">
      <h2>Frequently Asked Questions</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <h3>{question.question}</h3>
            <button
              onClick={() =>
                setIsOpen({ ...isOpen, [index]: !isOpen[index] }) // Toggle open/closed state
              }
            >
              {isOpen[index] ? 'Hide Answer' : 'Show Answer'}
            </button>
            <Collapse isOpened={isOpen[index]}>
              {question.answer}
            </Collapse>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FAQ;
