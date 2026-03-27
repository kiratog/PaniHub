import Categories from "../Categories/Categories"
import "./navbar.css"

interface NavProps{
    category:string;
    setCategory: (name:string) => void;
}

function Navbar({category, setCategory}: NavProps){
    return(
        <nav>
            <div className="navbar">
                <div className="logo"><p className="logo">Pani<span>Hub</span></p></div>
                <Categories category = {category} setCategory = {setCategory}/>
                <div className="search-bar">
                    <input type="text" placeholder="Search"/>
                    <button><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10z" fill="#14FFEC"/></svg></button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar