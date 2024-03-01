import React, { useState } from 'react';
import './support.css';

const Support = (props) => {
  const [faqOpen, setFaqOpen] = useState(false);
  const [questionOpen, setQuestionOpen] = useState(null);

  const toggleFaq = () => {
    setFaqOpen(!faqOpen);
    if (!faqOpen && questionOpen !== null) {
      setQuestionOpen(null); // Close nested accordion when main FAQ accordion is opened
    }
  };

  const toggleQuestion = (questionId, event) => {
    event.stopPropagation(); // Prevent event propagation to parent elements
    setQuestionOpen(questionId === questionOpen ? null : questionId);
  };

  return (
    <div style={{ cursor: 'pointer' }} className="support-container">
      <div className="support-frame511" onClick={toggleFaq}>
        <span className="support-text02 18Medium">
          <span>FAQs</span>
        </span>
        <div className={`support-arrows-diagrams-arrow1 ${faqOpen ? 'open' : ''}`}>
          <div className="support-group02">
            <div className="support-group03">
              <img
                alt="PathI780"
                src="/external/pathi780-7plp.svg"
                className="support-path03"
              />
              <img
                alt="PathI780"
                src="/external/pathi780-igt.svg"
                className="support-path04"
              />
              <img
                alt="PathI780"
                src="/external/pathi780-hv46.svg"
                className="support-path05"
              />
            </div>
          </div>
        </div>
      </div>
      {faqOpen && (
        <div className="support-frame215">
          <div className="support-frame471">
            <div className="support-arrows-diagrams-arrow2">
              <div className="support-group04">
                {/* <div className="support-group05">
                  <img
                    alt="PathI780"
                    src="/external/pathi780-fyw.svg"
                    className="support-path06"
                  />
                  <img
                    alt="PathI780"
                    src="/external/pathi780-uuj.svg"
                    className="support-path07"
                  />
                  <img
                    alt="PathI780"
                    src="/external/pathi780-nclj.svg"
                    className="support-path08"
                  />
                </div> */}
              </div>
            </div>
            {/* <div className="support-frame381">
              <span className="support-text04 16Medium">
                <span>FAQs</span>
              </span>
            </div> */}
          </div>
          {/* FAQ items */}
          <div className="support-frame281">
            <div className="support-frame514">
           
              <div style={{ cursor: 'pointer' }} className="support-frame513" onClick={(event) => toggleQuestion(1, event)}>
                <span className="support-text06 16Medium">
                  <span>Question No. 1: Why do we use it?</span>
                </span>
                <div className="support-arrows-diagrams-arrow3">
                  <div className="support-group06">
                    <img
                      alt="PathI780"
                      src="/external/pathi780-0q08.svg"
                      className="support-path09"
                    />
                  </div>
                </div>
                {questionOpen === 1 && (
                  <div className="answer">
                    Answer: We use Lorem Ipsum as placeholder text in design and publishing.
                  </div>
                )}
              </div>
              <div style={{ cursor: 'pointer' }} className="support-frame513" onClick={(event) => toggleQuestion(2, event)}>
                <span className="support-text06 16Medium">
                  <span>Question No. 2: Why do we use it?</span>
                </span>
                <div className="support-arrows-diagrams-arrow3">
                  <div className="support-group06">
                    <img
                      alt="PathI780"
                      src="/external/pathi780-0q08.svg"
                      className="support-path09"
                    />
                  </div>
                </div>
                {questionOpen === 2 && (
                  <div className="answer">
                    Answer: We use Lorem Ipsum as placeholder text in design and publishing.
                  </div>
                )}
              </div>
              <div style={{ cursor: 'pointer' }} className="support-frame513" onClick={(event) => toggleQuestion(3, event)}>
                <span className="support-text06 16Medium">
                  <span>Question No. 3: Where does it come from?</span>
                </span>
                <div className="support-arrows-diagrams-arrow3">
                  <div className="support-group06">
                    <img
                      alt="PathI780"
                      src="/external/pathi780-0q08.svg"
                      className="support-path09"
                    />
                  </div>
                </div>
                {questionOpen === 3 && (
                  <div className="answer">
                    Answer: Lorem Ipsum is derived from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
