import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Card from '../Card'
import {APIUrl} from './utils.js';


export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch(`${APIUrl}/api/foodData`, {               //takes data from api json file lie axios
            method: "POST",
            headers: {
                'Content-Type': 'Application/json'
            }
        })
        response = await response.json();
        // console.log(response[0]);
        setFoodItem(response[0])
        setFoodCat(response[1])

    }
    useEffect(() => {
        loadData()
    }, [])   //we can specify in bracket like of gooter changes apply effect here its loadData

    return (
        <div>
            <div> <Navbar /> </div>
            <div>                           {/*this holds the carousel */}
            <div id="carouselExample" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>

<div className="carousel-inner" id='crousel'>
    <div className='carousel-caption inline' style={{ zIndex: 10 }}>
        <div className="d-flex justify-content-center">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                {/* <button className="btn btn-outline-success my-2 my-sm-0 text-white bg-success" type="submit">Search</button> */}
        </div>
    </div>
    <div id='crousel-img'>
    <div className="carousel-item active">
        <img
            src="https://foodish-api.com/images/biryani/biryani32.jpg"
            className="d-block w-100"
            alt="Biryani"
        />
    </div>
    <div className="carousel-item">
        <img
            src="https://foodish-api.com/images/pizza/pizza32.jpg"
            className="d-block w-100"
            alt="Pizza"
        />
    </div>
    <div className="carousel-item">
        <img
            src="https://foodish-api.com/images/burger/burger32.jpg"
            className="d-block w-100"
            alt="Burger"
        />
    </div></div>
</div>
<button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
</button>
</div>
            </div>
            <div className='container'>
                {/* map function to show all card from json as loop */}
                {
                    foodCat !== []     //when foodCat arry is empty not fetch terneray condition used
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3'>
                                <div key={data._id} className='fs-3 m-3'>
                                    {data.CategoryName}
                                </div>
                                <hr />
                                {foodItem !== []
                                    ?
                                    foodItem.filter((item)=> (item.CategoryName === data.CategoryName)&&(item.name.toLowerCase().includes(search.toLocaleLowerCase())))  
                                    .map(filterItems=>{
                                        return(
                                            <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 mx-2'>
                                                <Card 
                                                foodItem={filterItems}
                                                options={filterItems.options[0]}
                                                ></Card>
                                            </div>
                                        )
                                    })
                                    :<div>No such Data Found</div>
                                }
                                </div>
                            )
                        })
                        : <div>Loading data</div>             //terneray condition till food api not fetched
                }
            </div>
            <div> <Footer /> </div>
        </div>
    )
}
