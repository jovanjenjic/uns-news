import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import Link from 'next/link'

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '26px',
    height: '20px',
    left: '20px',
    top: '26px'
  },
  bmBurgerBars: {
    background: 'var(--white-primary)'
  },
  bmBurgerBarsHover: {
    background: 'var(--secondary)'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
  },
  bmMenu: {
    background: 'var(--secondary)',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: 'var(--primary)',
    padding: '0.8em',
    display: 'flex',
    flexDirection: "column"
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}


const Hamburger = () => {
  return (
    <Menu styles={ styles }>
        <Link href={`/`}>
            <a id="pocetna" className="menu-item">
                Почетна
            </a>
        </Link>
        <Link href={`/`}>
            <a id="novosti" className="menu-item">
                Новости
            </a>
        </Link>
        <Link href={`/oglasi`}>
            <a id="oglasi" className="menu-item">
                Огласи
            </a>
        </Link>
    </Menu>
  );
};

export default Hamburger;
