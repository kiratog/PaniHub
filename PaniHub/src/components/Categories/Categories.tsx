import { categories } from "../../utils/data"
import "./Categories.css"

interface CategoryProps{
    category: string;
    setCategory: (name: string) => void
}

const Categories = ({category, setCategory}: CategoryProps) =>{

    return(
        <div className="categories">
            {categories.map((item)=>(
                <button onClick={()=>setCategory(item.query)} style={{backgroundColor: item.query === category ? "#14FFEC": "#323232", color: item.query === category ? "#212121":"#0D7377" }} className="category-name" key={item.name}>
                    {item.name}
                </button>
            ))}
        </div>
    )
}

export default Categories