import React, { useState } from 'react';
import logo from '../assets/logo.png'
import pic1 from '../assets/testimonials-pic1.jpg'
import pic2 from '../assets/testimonials-pic2.avif'
import { Link, useNavigate } from 'react-router-dom';
import CraftCard from '../components/CraftCard'
import { Card } from 'react-bootstrap';
import { getHomeCraftAPI } from '../services/allAPI';
import { useEffect } from 'react';


const Home = () => {

    const [allHomeCrafts, setAllHomeCrafts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllHomeCrafts()
    }, [])

    const getAllHomeCrafts = async () => {
        try {
            const result = await getHomeCraftAPI()
            if (result.status == 200) {
                setAllHomeCrafts(result.data)
            }
        } catch (err) {

        }
    }

    const handleProjects = () => {
        if (sessionStorage.getItem("token")) {
            navigate('/crafts')
        } else {
            alert("please login to get full Access!!")
        }
    }


    return (
        <>
            <div>
                {/* Full-screen landing area */}
                <div
                    style={{ width: "100%", height: '100vh' }}
                    className='landing d-flex align-items-center'>
                    {/* White box on the left side */}
                    <div
                        style={{ width: '600px', height: '500px', marginLeft: '100px' }}
                        className='d-flex flex-column align-items-center justify-content-center p-3  ' >
                        {/* Button */}

                        <img style={{ width: '200px' }} src={logo} alt="" />
                        <h1 style={{ fontSize: '80px' }} className='text-danger'> CRAFTSY</h1>
                        <h1 style={{ color: 'white' }} className='text-danger'>Ignite your </h1>
                        <h2 style={{ color: 'white' }} className='text-danger'>Creativity</h2>
                        <div className='mt-5'>
                            {
                                sessionStorage.getItem("token") ?

                                    <Link to={'/dashboard'}> <button type="button" className="btn btn-danger rounded text-light" fdprocessedid="pek81j" >Explore Your Craftsy Studio</button></Link>

                                    :
                                    <Link to={'/login'}> <button type="button" className="btn btn-danger rounded text-light" fdprocessedid="pek81j" >GET STARTED</button></Link>
                            }
                        </div>

                    </div>
                </div>
                {/* explore project */}
                <div className='mt-5 text-center'>
                    <h1 className='mb-5 text-danger'>EXPLORE OUR CRAFT WORKS</h1>
                    <marquee >
                        <div className='d-flex'>
                            {
                                allHomeCrafts?.map(craft => (
                                    <div className='me-5'>
                                        <CraftCard craft={craft} />
                                    </div>
                                ))
                            }

                        </div>
                    </marquee>
                    <button onClick={handleProjects} className='btn btn-link-dark mt-5 text-danger'><h5>CLICK HERE TO VIEW MORE PROJECTS...</h5></button>
                </div>
                {/* testimonials */}
                <div className='d-flex justify-content-center align-items-center mt-5 flex-column'>
                    <h1>Our Testimonials</h1>
                    <div className='d-flex justify-content-evenly align-items-center mt-3 w-100'>
                        <Card style={{ width: '18rem',height:'20rem' }}>

                            <Card.Body>
                                <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                                    <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src={pic1} alt="" />
                                    Max Miller</Card.Title>
                                <Card.Text>
                                    <div className='d-flex justify-content-center mb-4'>
                                        <i className='fa-solid fa-star text-warning'></i>
                                        <i className='fa-solid fa-star text-warning'></i>
                                        <i className='fa-solid fa-star text-warning'></i>
                                        <i className='fa-solid fa-star text-warning'></i>
                                        <i className='fa-solid fa-star text-warning'></i>

                                    </div>
                                    <p style={{ textAlign: 'justify' }}>Craftsy has been my go-to platform for inspiration. Every day I discover something new and beautiful from fellow artists</p>
                                </Card.Text>


                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem',height:'20rem' }}>

                            <Card.Body>
                                <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                                    <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src={pic2} alt="" />
                                    Neha Kapoor</Card.Title>
                                <Card.Text>
                                    <div className='d-flex justify-content-center mb-4'>
                                        <i className='fa-solid fa-star text-warning'></i>
                                        <i className='fa-solid fa-star text-warning'></i>
                                        <i className='fa-solid fa-star text-warning'></i>
                                        <i className='fa-solid fa-star text-warning'></i>
                                        <i className='fa-solid fa-star text-warning'></i>

                                    </div>
                                    <p style={{ textAlign: 'justify' }}>Craftsy is such a vibrant space for sharing and learning. I posted my handmade greeting cards and the support from the community has been amazing! Truly a creative haven.</p>
                                </Card.Text>


                            </Card.Body>
                        </Card>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Home;
