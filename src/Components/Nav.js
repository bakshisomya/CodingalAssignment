import codingallogo from "../assets/images/codingallogo.png";
import React, { useState,useRef,useEffect } from "react";

function Nav() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const Ref = useRef(null);
  const [timer, setTimer] = useState('00:00:00');
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 * 60 * 60) % 24);
    return {
        total, hours, minutes, seconds
    };
}
const startTimer = (e) => {
    let { total, hours, minutes, seconds } 
                = getTimeRemaining(e);
    if (total >= 0) {

        // update the timer
        // check if less than 10 then we need to 
        // add '0' at the begining of the variable
        setTimer(
            (hours > 9 ? hours : '0' + hours) + ':' +
            (minutes > 9 ? minutes : '0' + minutes) + ':'
            + (seconds > 9 ? seconds : '0' + seconds)
        )
    }
}
const clearTimer = (e) => {
  
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next    
    setTimer('00:00:10');

    // If you try to remove this line the 
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
        startTimer(e);
    }, 1000)
    Ref.current = id;
}
const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if 
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
}
useEffect(() => {
    clearTimer(getDeadTime());
}, []);
  return (
    <div>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed flex justify-center items-center mr-4 py-2 whitespace-nowrap uppercase"
              href="#codingal"
            >
              <img
                className="w-12 sm:w-14 lg:w-10 mr-12"
                src={codingallogo}
                alt="logo"
              />
              <h2 className="font-semibold text-gray-500">
              Trial Lesson [Grade1-3]
            </h2>
            </a>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none text-gray-500"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i class="ri-menu-line"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <p className="px-3 py-2 flex items-center text-s uppercase font-bold leading-snug hover:opacity-75 text-gray-500">
                  <span className="ml-2">{timer}</span>
                </p>
              </li>
              <li className="nav-item">
                <button className="block py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red hover:bg-red-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-dark">
                  End Class
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
