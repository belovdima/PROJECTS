export const Header = () => {
    return (
        <div className="header">
            <div className="header__left">
                <div className="header__left--logo">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="115"
                        height="40"
                        viewBox="0 0 115 40"
                        fill="none">
                        <path
                            d="M26 11.2L26 28.8L0 40L1.77577e-06 0L26 11.2Z"
                            fill="white"
                        />
                        <path
                            d="M19.5 3.6V7.675L13 4.85V1.11901e-06L19.5 3.6Z"
                            fill="white"
                        />
                        <path
                            d="M26 7.2V10.5L20.3125 8.02813V4.05L26 7.2Z"
                            fill="white"
                        />
                        <path
                            d="M38 16.5721V12.7589H55.347V16.5721H49.3345V26.7351H44.0159V16.5721H38Z"
                            fill="white"
                        />
                        <path
                            d="M62.9135 26.7385L55.8718 12.7589H61.9046L66.5867 22.511L70.9878 12.7589H76.5128L69.9755 26.7385H62.9135Z"
                            fill="white"
                        />
                        <path
                            d="M86.8723 12.4941C95.8641 12.4941 97.0253 16.7963 97.0253 19.4278V19.9915C97.0253 22.6027 95.881 27 86.8723 27H86.0294C77.0004 27 75.8561 22.6027 75.8561 19.9915V19.4278C75.8561 16.7963 77.0004 12.4941 86.0294 12.4941H86.8723ZM91.5172 19.5569C91.5172 18.073 90.5625 16.2496 86.4424 16.2496C82.3223 16.2496 81.3676 18.073 81.3676 19.5569V19.781C81.3676 21.2479 82.3223 23.2207 86.4424 23.2207C90.5625 23.2207 91.5172 21.3226 91.5172 19.8183V19.5569Z"
                            fill="white"
                        />
                        <path
                            d="M113.848 12.7589V16.1782H103.678V17.927H113.645V21.3293H103.678V23.2444H114V26.7385H98.4337V12.7589H113.851H113.848ZM105.868 11.9134H101.261V9H105.868V11.9134ZM111.356 11.9134H106.765V9H111.356V11.9134Z"
                            fill="white"
                        />
                    </svg>
                </div>
                <div className="header__left--buttons">
                    <div className="left--buttons left--buttons__main">
                        Главная
                    </div>
                    <div className="left--buttons left--buttons__films">
                        Фильмы
                    </div>
                    <div className="left--buttons left--buttons__serial">
                        Сериалы
                    </div>
                    <div className="left--buttons left--buttons__tv">ТВ</div>
                </div>
            </div>
            <div className="header__right">
                <div className="header__right--buttons">
                    <button className="right--buttons__download" type="button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none">
                            <path
                                d="M4.04918 15.625H15.977V17.5H4.04918V15.625ZM9.01911 2.5V10.5494L4.75193 6.52469L3.34644 7.85031L10.0131 14.1381L16.6798 7.85031L15.2743 6.52469L11.0071 10.5494V2.5H9.01911Z"
                                fill="white"
                            />
                        </svg>{" "}
                        Установить
                    </button>
                    <button className="right--buttons__pay" type="button">
                        7 дней за 0 ₽
                    </button>
                    <button className="right--buttons__promo" type="button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="26"
                            viewBox="0 0 24 26"
                            fill="none">
                            <path
                                d="M20.9412 11.0058C20.3815 11.5149 20.0518 12.2213 20.0518 12.9749C20.0518 13.7284 20.3815 14.4348 20.9412 14.9439C21.3122 15.2814 21.765 15.5156 22.2506 15.6345V18.9749C22.2506 19.2822 22.117 19.5931 21.8519 19.8342C21.5845 20.0775 21.2078 20.2249 20.8018 20.2249H3.21138C2.8054 20.2249 2.42868 20.0775 2.16124 19.8342C1.89617 19.5931 1.76257 19.2822 1.76257 18.9749V15.6345C2.24819 15.5156 2.70101 15.2814 3.07202 14.9439C3.63165 14.4348 3.96138 13.7284 3.96138 12.9749C3.96138 12.2213 3.63165 11.5149 3.07202 11.0058C2.70101 10.6684 2.24819 10.4341 1.76257 10.3152V6.97485C1.76257 6.6675 1.89617 6.35656 2.16124 6.11546C2.42868 5.8722 2.8054 5.72485 3.21138 5.72485H20.8018C21.2078 5.72485 21.5845 5.8722 21.8519 6.11546C22.117 6.35656 22.2506 6.6675 22.2506 6.97485V10.3152C21.765 10.4341 21.3122 10.6684 20.9412 11.0058Z"
                                stroke="white"
                                stroke-width="1.5"
                            />
                            <path
                                d="M12.0131 8.97485L13.1933 11.3503L15.8173 11.7388L13.9228 13.5954L14.3642 16.2109L12.0131 14.9829L9.66192 16.2109L10.1033 13.5954L8.20884 11.7388L10.8328 11.3503L12.0131 8.97485Z"
                                fill="white"
                            />
                        </svg>{" "}
                        Промокод
                    </button>
                    <button className="right--buttons__search" type="button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none">
                            <path
                                d="M10.6465 18.646C12.4215 18.6456 14.1453 18.0514 15.5435 16.958L19.9395 21.354L21.3535 19.94L16.9575 15.544C18.0515 14.1457 18.6461 12.4214 18.6465 10.646C18.6465 6.235 15.0575 2.646 10.6465 2.646C6.23548 2.646 2.64648 6.235 2.64648 10.646C2.64648 15.057 6.23548 18.646 10.6465 18.646ZM10.6465 4.646C13.9555 4.646 16.6465 7.337 16.6465 10.646C16.6465 13.955 13.9555 16.646 10.6465 16.646C7.33748 16.646 4.64648 13.955 4.64648 10.646C4.64648 7.337 7.33748 4.646 10.6465 4.646Z"
                                fill="#BABABA"
                            />
                        </svg>{" "}
                    </button>
                    <button className="right--buttons__login" type="button">
                        Войти
                    </button>
                </div>
            </div>
        </div>
    );
};