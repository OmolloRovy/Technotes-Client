import React from 'react';
import { Link } from 'react-router-dom';


const Public = () => {
    return (
        <section className="public">
            <header className='public__header'>
                <h1 className="nowrap">IntoTech Repairs</h1>
            </header>
            <main className="public__main">
                <h3>Welcome to <span className="nowrap1">IntoTech Repairs!</span></h3>
                <br />
                <p className='public__p1'>We are located in Beautiful Downtown City. We provide a trained staff ready to meet your tech repair needs. Let's bring your machine back to life again.</p>
                
            </main>
            <footer>
                <ul>
                    <li><a href="tel:+254714924394"><i className="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                </ul>
                <Link to="/login">Employee Login</Link>
                <p className='FindUs'>Find Us At</p>
                <div className='addr'>
                    <address className="public__addr">
                        IntoTech Repairs<br />
                        555 Night Drive<br />
                        Downtown City, 13345<br />
                        <a href="tel:+254714924394">(+254) 7149-24394</a>
                    </address>
                </div>
                <br />
            </footer>
        </section>
    );
};

export default Public;
