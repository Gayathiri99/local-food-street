import { useNavigate } from "react-router-dom";
import { useAuth } from "../../6-user/AuthContext";
import "../Home.css";

function QuickCategories(){
const navigate = useNavigate();
const { isAuthenticated } = useAuth();

const categories = [
    {
        icon:"🍛",
        name:"South Indian"
    },
    {
        icon:"🍔",
        name:"Fast Food"
    },
    {
        icon:"🥗",
        name:"Healthy Food"
    },
    {
        icon:"🍰",
        name:"Desserts"
    },
    {
        icon:"🥤",
        name:"Drinks"
    }
];


return(

<section className="category-section">

<h2>Explore Categories</h2>

<p className="category-text">
Find your favourite food category
</p>


<div className="category-container">

{
categories.map((item,index)=>(

<div className="category-card" key={index}>

<div className="category-icon">
{item.icon}
</div>

<h3>{item.name}</h3>

<button
  onClick={() =>
    navigate(
      isAuthenticated
        ? `/listing?category=${encodeURIComponent(item.name)}`
        : "/login"
    )
  }
>
Explore
</button>

</div>

))
}

</div>


</section>

);

}

export default QuickCategories;