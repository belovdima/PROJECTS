export const Classes = () => {
    return (
        <div className="classes">
            <h2 className="classes__title" id="classes">
                Наши Классы
            </h2>
            <div className="classes__list">
                {Array(4)
                    .fill(null)
                    .map((_, index) => (
                        <div key={index} className="classes__item"></div>
                    ))}
            </div>
        </div>
    );
};
