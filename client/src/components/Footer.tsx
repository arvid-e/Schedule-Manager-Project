
function Footer() {
    const date: Date = new Date();

    return(
        <footer>
            <ul>
                <li>{date.getFullYear()}</li>
                <li>Schedule Manager</li>
            </ul>
        </footer>
    )
}

export default Footer;