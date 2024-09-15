import "./../CSS/Header.css"

export const Header = ({onHeaderClick}) => {

    return(
        <div className="header" onClick={onHeaderClick}>Домой</div>
    )
}

