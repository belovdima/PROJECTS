import React from "react";

interface Resource {
    id: number;
    title: string;
    description: string;
    link: string; // Ссылка на скачивание
}

const resourcesData: Resource[] = [
    {
        id: 1,
        title: "Методическое пособие по управлению гостиницей",
        description:
            "Полное руководство по эффективному управлению гостиницей.",
        link: "https://example.com/resource1.pdf", // Замените на актуальную ссылку
    },
    {
        id: 2,
        title: "Рекомендации по обслуживанию клиентов",
        description: "Лучшие практики для обеспечения отличного обслуживания.",
        link: "https://example.com/resource2.pdf",
    },
    {
        id: 3,
        title: "Инструменты для анализа рынка гостеприимства",
        description: "Методики и инструменты для анализа рыночной ситуации.",
        link: "https://example.com/resource3.pdf",
    },
    // Добавьте больше материалов по мере необходимости
];

export const Ready: React.FC = () => {
    return (
        <div className="ready-outer" id="ready">
            <div className="resources-library">
                <h1 className="resources-library__title">
                    Готовые материалы в помощь гостеприимщику РФ
                </h1>
                <div className="resources-library__items">
                    {resourcesData.map((resource) => (
                        <div
                            key={resource.id}
                            className="resources-library__item">
                            <h2 className="resources-library__item-title">
                                {resource.title}
                            </h2>
                            <p className="resources-library__item-description">
                                {resource.description}
                            </p>
                            <a
                                href={resource.link}
                                className="resources-library__item-link"
                                download>
                                Скачать
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
