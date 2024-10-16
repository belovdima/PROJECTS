export const Footer = () => {
    return (
        <footer className="footer" id="contacts">
            <div className="footer__content">
                <div className="footer__section">
                    <h3 className="footer__title">О компании</h3>
                    <p className="footer__text">
                        Лаборатория Гостеприимства — это центр знаний, обмена
                        опытом и сотрудничества для всех, кто заинтересован в
                        сфере гостеприимства.
                    </p>
                </div>
                <div className="footer__section">
                    <h3 className="footer__title">Полезные ссылки</h3>
                    <ul className="footer__links">
                        <li>
                            <a href="#">Услуги</a>
                        </li>
                        <li>
                            <a href="#">Контакты</a>
                        </li>
                        <li>
                            <a href="#">Политика конфиденциальности</a>
                        </li>
                    </ul>
                </div>
                <div className="footer__section">
                    <h3 className="footer__title">Контакты</h3>
                    <p className="footer__text">Телефон: +7 123 456 7890</p>
                    <p className="footer__text">
                        Email: info@hospitalitylab.ru
                    </p>
                </div>
            </div>
            <div className="footer__bottom">
                <p>© 2024 Лаборатория Гостеприимства. Все права защищены.</p>
            </div>
        </footer>
    );
};
