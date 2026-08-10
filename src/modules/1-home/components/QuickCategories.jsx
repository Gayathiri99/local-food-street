import "./Home.css";

function QuickCategories(){

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

<button>
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