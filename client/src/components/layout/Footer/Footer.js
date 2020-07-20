import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h1 className="logo-text"><span>Cardboard</span> Express</h1>
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit 
                        voluptatem accusantium doloremque laudantium. Nemo enim ipsam voluptatem 
                        quia voluptas sit aspernatur aut odit aut fugit.
                    </p>
                    <div className="contact">
                        <span><i className="fas fa-phone"></i> &nbsp; 123-456-7890</span>
                        <span><i className="fas fa-envelope"></i> &nbsp; info@cardboardexpress.com</span>
                    </div>
                    <div className="socials">
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>
                <div className="footer-section links">
                    <h2>Quick Links</h2>
                    <br />
                    <ul>
                        <li><a href="#">Events</a></li>
                        <li><a href="#">Team</a></li>
                        <li><a href="#">Mentores</a></li>
                        <li><a href="#">Gallery</a></li>
                        <li><a href="#">Terms and Conditions</a></li>
                    </ul>
                </div>
                <div className="footer-section contact-form">
                    <h2>Contact us</h2>
                    <br />
                    <form>
                        <input type="email" name="email" className="text-input contact-input" placeholder="Your email address..." />
                        <textarea name="message" className="text-input contact-input" placeholder="Your message..." />
                        <button type="submit">
                            <i className="fas fa-envelope"></i>{' '}
                            Send
                        </button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <p>Cardboard Express, Copyright &copy; 2020</p>
            </div>
            {/* <p>Contact Us: service@cardboardexpress.com</p> */}
            
        </footer>
    )
}

export default Footer;
