import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'

function Homepage() {
    return (
        <div id='body'>
            <h1 id='hompage-h1'>Tame your work, organize your life</h1>
            <h3 id='homepage-text'>Remember everything and tackle any project with your notes, tasks, and schedule all in one place.</h3>
            <Link id='homepageButt' to='/signup'>Join now for free</Link>
            <div id='img-text-container'>
                <div className='homepage-img'></div>
                <div id='text-container'>
                    <h4>WORK ANYWHERE</h4>
                    <p>Keep important info handy—your notes sync automatically to all your devices.</p>
                    <h4>REMEMBER EVERTHING</h4>
                    <p>Make notes more useful by adding text, images, audio, scans, PDFs, and documents.</p>
                    <h4>TURN TO_DO INTO DONE</h4>
                    <p>Bring your notes, tasks, and schedules together to get things done more easily.</p>
                    <h4>FIND THINGS FAST</h4>
                    <p>Get what you need, when you need it with powerful, flexible search capabilities.</p>
                </div>
            </div>
        </div>
    )
}

export default Homepage;
