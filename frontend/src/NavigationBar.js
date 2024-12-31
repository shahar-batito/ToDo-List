
// The NavigationBar component defines the top navigation bar for the application
const NavigationBar = () => {
    return (
        <nav className="NavigationBar">
            <h1>To-Do List</h1>
            <div className="links">
                <a href="/">Home</a>
                <a href="/create">Create New</a>

            </div>
        </nav>
    );
}

export default NavigationBar;