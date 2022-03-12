import React from 'react';

import './Footer.css';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-content'>
                <div className='team-members'>

                </div>

                <div className='footer-header'>Created by Chiew Saetern, James Chen, Laura Maser, and Mia Joubert</div>
                <div className='footer-icon'>
                    <a href='https://github.com/miajoubert/petsy' target='_blank' rel='noopener noreferrer'>
                        <i className="fab fa-github"></i>
                    </a>
                </div>
                <div className='footer-technologies'>JavaScript • CSS • React • Redux • Flask • SQLAlchemy • Alembic • PostgreSQL</div>
            </div>
        </div>
    );
};

export default Footer;
