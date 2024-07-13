import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import Link from 'next/link'
import Burger from '@components/icons/Burger'
import BurgerClose from '@components/icons/BurgerClose'
import style from './Hamburger.module.css'

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '40px',
    padding: '8px',
    height: '40px',
    left: '16px',
    top: '20px',
  },
  bmBurgerBars: {
    background: 'var(--white-primary)',
    borderRadius: '8px',
    strokeWidth: '1px',
  },
  bmBurgerBarsHover: {
    background: 'var(--secondary)',
  },
  bmCrossButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40px',
    width: '40px',
    top: '20px',
    right: '16px',
  },
  bmCross: {
    background: 'transparent',
    width: '24px',
    height: '24px',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    maxWidth: '100vw',
  },
  bmMenu: {
    background: 'var(--secondary)',
    padding: '5em 0.5em 0',
    fontSize: '1em',
    fontWeight: '700',
    maxWidth: '100vw',
    textTransform: 'uppercase',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: 'var(--primary)',
    padding: '0.8em',
    gap: '0.875em',
    display: 'flex',
    flexDirection: 'column',
  },
  bmItem: {
    display: 'inline-block',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
}

const Hamburger = ({ menuList }: { menuList: TCategory[] }) => {
  return (
    <Menu
      customBurgerIcon={<Burger className={style.burgerIcon} />}
      burgerButtonClassName={'rounded-full hover:bg-primary-20'}
      crossButtonClassName={'rounded-full hover:bg-primary-20'}
      customCrossIcon={<BurgerClose className={style.crossIcon} />}
      styles={styles}
    >
      <Link href={`/`}>
        <a id="pocetna" className="menu-item hover:text-accent">
          Почетна
        </a>
      </Link>
      {menuList.map((menuItem) => (
        <Link key={menuItem?.id} href={`/${menuItem.slug}`}>
          <a
            id={menuItem?.id.toString()}
            className="menu-item hover:text-accent"
          >
            {menuItem?.title}
          </a>
        </Link>
      ))}
    </Menu>
  )
}

export default Hamburger
