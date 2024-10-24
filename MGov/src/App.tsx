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
        const categories = data.map((item, index) => ({
            name: item.name,
        }));

        const nodes = data.flatMap((item, index) => {
            const mainSkillNodes = item.mainSkills.map((skill, skillIndex) => ({
                name: `${item.name}-${skill}`, // Добавление имени компетенции к навыку
                category: 1,
                symbolSize: 30,
                value: 200, // Радиус для внешнего кольца
            }));

            const otherSkillNodes = item.otherSkills.map((skill) => ({
                name: `${item.name}-${skill}`, // Аналогично для других навыков
                category: 2,
                symbolSize: 25,
                value: 200, // Радиус для внешнего кольца
            }));

            return [
                {
                    name: item.name,
                    category: 0,
                    symbolSize: 60,
                    value: 100, // Радиус для внутреннего кольца (компетенции)
                },
                ...mainSkillNodes,
                ...otherSkillNodes,
            ];
        });

        const links = data.flatMap((item) => {
            const mainSkillLinks = item.mainSkills.map((skill) => ({
                source: item.name,
                target: `${item.name}-${skill}`, // Используй полное имя с компетенцией
                lineStyle: { color: "orange" },
            }));

            const otherSkillLinks = item.otherSkills.map((skill) => ({
                source: item.name,
                target: `${item.name}-${skill}`, // То же самое для других навыков
                lineStyle: { color: "purple" },
            }));

            return [...mainSkillLinks, ...otherSkillLinks];
        });

        const option = {
            title: {
                text: "Skills and Competencies",
            },
            tooltip: {},
            legend: [
                {
                    data: ["Competencies", "Main Skills", "Other Skills"],
                },
            ],
            series: [
                {
                    type: "graph",
                    layout: "circular",
                    circular: {
                        rotateLabel: true,
                    },
                    data: nodes,
                    links: links,
                    categories: [
                        { name: "Competencies" },
                        { name: "Main Skills" },
                        { name: "Other Skills" },
                    ],
                    roam: true,
                    label: {
                        position: "right",
                        formatter: function (params: {
                            data: { name: string };
                        }) {
                            const name = params.data.name.split("-")[1];
                            return name || params.data.name;
                        },
                    },
                    lineStyle: {
                        width: 2,
                        curveness: 0.3,
                    },
                },
            ],
        };

        chart.setOption(option);

        return () => {
            chart.dispose();
        };
    }, []);

    return <div ref={chartRef} style={{ width: "100%", height: "600px" }} />;
};

export default SkillsGraph;
