import React, { useState, useRef } from "react";

interface Question {
    id: number;
    question: string;
    answer: string;
}

const questionsData: Question[] = [
    {
        id: 1,
        question: "Какова ваша политика возврата?",
        answer: "Вы можете вернуть товары в течение 30 дней для полного возврата средств.",
    },
    {
        id: 2,
        question: "Как я могу отследить мой заказ?",
        answer: "Мы отправим вам ссылку для отслеживания по электронной почте, как только ваш заказ будет отправлен.",
    },
    {
        id: 3,
        question: "Могу ли я приобрести товары оптом?",
        answer: "Да, пожалуйста, свяжитесь с нашей командой продаж для получения дополнительной информации.",
    },
];

export const FAQ: React.FC = () => {
    const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
    const answerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({}); // Ref для хранения всех вопросов

    const toggleQuestion = (id: number) => {
        setActiveQuestion(activeQuestion === id ? null : id);
    };

    return (
        <div className="faq-outer">
            <div className="faq">
                <h1 className="faq__title">Часто задаваемые вопросы</h1>
                <div className="faq__questions">
                    {questionsData.map((question) => (
                        <div
                            key={question.id}
                            className={`faq__question-card ${
                                activeQuestion === question.id ? "active" : ""
                            }`}
                            onClick={() => toggleQuestion(question.id)}>
                            <div className="faq__question">
                                {question.question}
                                <span className="faq__icon">
                                    {activeQuestion === question.id ? "-" : "+"}
                                </span>
                            </div>
                            <div
                                ref={(el) =>
                                    (answerRefs.current[question.id] = el)
                                }
                                className="faq__answer"
                                style={{
                                    maxHeight:
                                        activeQuestion === question.id
                                            ? answerRefs.current[question.id]
                                                  ?.scrollHeight + "px"
                                            : "0px",
                                }}>
                                {question.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
