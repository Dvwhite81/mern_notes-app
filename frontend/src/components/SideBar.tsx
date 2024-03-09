import { useEffect, useState } from 'react';
import '../styles/SideBar.css';

interface SideBarProps {
  sidebarVisible: boolean;
}

const SideBar = ({ sidebarVisible }: SideBarProps) => {
  const [leftPosition, setLeftPosition] = useState('-50vw');

  useEffect(() => {
    if (sidebarVisible) {
      setLeftPosition('0');
    } else {
      setLeftPosition('-50vw');
    }
  }, [sidebarVisible]);

  return (
    <div id="sidebar" style={{ left: leftPosition }}>
      <ul>
        <li>one</li>
        <li>two</li>
        <li>three</li>
      </ul>
    </div>
  );
};

export default SideBar;
