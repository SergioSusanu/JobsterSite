import React from 'react'
import { useSelector } from 'react-redux'
import {FaSuitcaseRolling, FaCalendarCheck, FaBug} from 'react-icons/fa'
import StatItem from './StatItem' 
import Wrapper from '../assets/wrappers/StatsContainer'

const StatsContainer = () => {

    const {stats} = useSelector(store => store.allJobs)

    const defaultStats = [
      {
        title: "pending applications",
        count: stats.pending || 0,
        icon: <FaSuitcaseRolling />,
        color: "#e9b949",
        bgc: "#fcefc7",
      },
      {
        title: "interviews scheduled",
        count: stats.interview || 0,
        icon: <FaCalendarCheck />,
        color: "#647acb",
        bgc: "#e0e8f9",
      },
      {
        title: "jobs declined",
        count: stats.declined || 0,
        icon: <FaBug/>,
        color: "#d66a6a",
        bgc: "#ffeeee",
      },
    ];

  return (
    
      <Wrapper>
        {defaultStats.map((item, index) => {
          return <StatItem key={index} {...item} />;
        })}
      </Wrapper>
    
  );
}

export default StatsContainer