import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const SkillsGraph: React.FC = () => {
    const chartRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const chart = echarts.init(chartRef.current!);

        // Данные
        const data = [
            {
                name: "Финансовый аналитик",
                mainSkills: ["Excel", "SQL", "VBA", "1С"],
                otherSkills: ["Power BI", "Python"],
            },
            {
                name: "Предприниматель",
                mainSkills: ["1C", "Excel", "Power BI"],
                otherSkills: [
                    "Google Analytics",
                    "Яндекс.Метрика",
                    "Python",
                    "SQL",
                    "Tilda",
                ],
            },
            {
                name: "Продуктовый дизайнер",
                mainSkills: [
                    "Figma",
                    "Sketch",
                    "Illustrator",
                    "Photoshop",
                    "Principle",
                    "Tilda",
                ],
                otherSkills: ["Shopify", "Protopie", "Cinema 4D"],
            },
            {
                name: "Менеджер проекта",
                mainSkills: [
                    "Visio",
                    "1C",
                    "Google Analytics",
                    "Яндекс.Метрика",
                    "Python",
                    "SQL",
                    "Tilda",
                ],
                otherSkills: ["Figma", "Sketch", "Shopify"],
            },
            {
                name: "Финансовый менеджер",
                mainSkills: ["1C", "Excel", "Power BI"],
                otherSkills: ["BPMN"],
            },
            {
                name: "Руководитель финансового департамента компании",
                mainSkills: ["Sketch", "Figma"],
                otherSkills: ["Shopify", "HQL"],
            },
            {
                name: "Продуктовый аналитик",
                mainSkills: [
                    "Google Analytics",
                    "Яндекс.Метрика",
                    "SQL",
                    "Power BI",
                    "Python",
                    "Excel",
                ],
                otherSkills: ["HQL", "Tableau", "R", "Machine learning"],
            },
            {
                name: "Руководитель финансового продукта",
                mainSkills: ["Visio"],
                otherSkills: ["Python"],
            },
            {
                name: "Менеджер по маркетингу",
                mainSkills: [
                    "Google Analytics",
                    "Яндекс.Метрика",
                    "Google Ads",
                    "Ahrefs",
                    "Главред",
                    "My Target",
                ],
                otherSkills: ["Tilda", "Photoshop", "Xenu", "Python"],
            },
            {
                name: "Менеджер по цифровой трансформации",
                mainSkills: [
                    "Visio",
                    "Google Analytics",
                    "Яндекс.Метрика",
                    "Python",
                    "SQL",
                    "Tilda",
                ],
                otherSkills: ["Figma", "Sketch", "Shopify"],
            },
        ];

        // Обработка данных для диаграммы
        const nodes = data.flatMap((item, index) => {
            const mainSkillNodes = item.mainSkills.map((skill, skillIndex) => ({
                name: `${skill}_${item.name}`, // Уникальное имя
                category: 1,
                symbolSize: 20,
                value: 100,
                // Расположение в круге для основных навыков
                x:
                    300 +
                    80 *
                        Math.cos(
                            (2 * Math.PI * skillIndex) / item.mainSkills.length
                        ),
                y:
                    300 +
                    80 *
                        Math.sin(
                            (2 * Math.PI * skillIndex) / item.mainSkills.length
                        ),
            }));

            const otherSkillNodes = item.otherSkills.map(
                (skill, skillIndex) => ({
                    name: `${skill}_${item.name}`, // Уникальное имя
                    category: 2,
                    symbolSize: 15,
                    value: 100,
                    // Расположение в круге для дополнительных навыков
                    x:
                        300 +
                        120 *
                            Math.cos(
                                (2 * Math.PI * skillIndex) /
                                    item.otherSkills.length
                            ),
                    y:
                        300 +
                        120 *
                            Math.sin(
                                (2 * Math.PI * skillIndex) /
                                    item.otherSkills.length
                            ),
                })
            );

            return [
                {
                    name: item.name,
                    category: 0,
                    symbolSize: 40,
                    value: 100,
                    // Фиксированное положение для компетенции
                    x: 300,
                    y: 300,
                },
                ...mainSkillNodes,
                ...otherSkillNodes,
            ];
        });

        const option = {
            title: {
                text: "Навыки и компетенции",
            },
            tooltip: {},
            series: [
                {
                    type: "graph",
                    layout: "none", // Фиксированное расположение
                    data: nodes,
                    categories: [
                        { name: "Компетенции" },
                        { name: "Основные навыки" },
                        { name: "Дополнительные навыки" },
                    ],
                    roam: true,
                    label: {
                        position: "right",
                        formatter: (params: { data: { name: string } }) =>
                            params.data.name,
                    },
                    lineStyle: {
                        width: 1,
                        curveness: 0.2,
                    },
                },
            ],
        };

        // Проверка на существующий график и установка параметров
        if (chart) {
            chart.setOption(option);
        }

        return () => {
            chart.dispose();
        };
    }, []);

    return <div ref={chartRef} style={{ width: "100%", height: "600px" }} />;
};

export default SkillsGraph;
