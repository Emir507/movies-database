import Link from '../Link';
import styles from '../../styles/main.module.scss';
import { Navbar } from 'react-bootstrap';
import { AuthUserContext } from '../Session/withAuthent';
import SignOut from '../SignOut';

import firebase from '../Firebase';
import { useState, useEffect } from 'react';

const NavComponent = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => authUser ? <NavAuth authUser={authUser} /> : <NavNonAuth />}
    </AuthUserContext.Consumer>
  )
}


const NavAuth = ({ authUser }) => {
  return (
    <>
      <style jsx>{`
        .brand-link {
          color: inherit;
        }
      `}</style>
      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand>
          <Link href="/">
            <a className='brand-link'>My Next.JS app</a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <ul className='d-lg-flex m-0 align-items-center'>
            <li>
              <Link activeClassName={styles.active} href='/'>
                <a className="nav-link">Home</a>
              </Link>
            </li>
            <li>
              <Link activeClassName={styles.active} href='/about'>
                <a className="nav-link">About</a>
              </Link>
            </li>
            <li>
              <Link activeClassName={styles.active} href='/posts'>
                <a className="nav-link">Posts</a>
              </Link>
            </li>
            <li>
              <Link activeClassName={styles.active} href='/users'>
                <a className="nav-link">Users</a>
              </Link>
            </li>
            <li>
              <Link activeClassName={styles.active} href='/photos'>
                <a className="nav-link">Photos</a>
              </Link>
            </li>
            <li>
              <Link activeClassName={styles.active} href='/movies'>
                <a className="nav-link">Movies</a>
              </Link>
            </li>
            <li>
              <Link activeClassName={styles.active} href='/account'>
                <a className="nav-link">Account</a>
              </Link>
            </li>
            <li>
              <SignOut />
            </li>
            <li>{authUser.email}</li>
          </ul>
        </Navbar.Collapse>
        
      </Navbar>
    </>
  )
}

const NavNonAuth = () => {
  return (
    <>
      <style jsx>{`
        .brand-link {
          color: inherit;
        }
      `}</style>
      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand>
          <Link href="/">
            <a className='brand-link'>My Next.JS app</a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <ul className='d-lg-flex m-0'>
            <li>
              <Link activeClassName={styles.active} href='/'>
                <a className="nav-link">Home</a>
              </Link>
            </li>
            <li>
              <Link activeClassName={styles.active} href='/about'>
                <a className="nav-link">About</a>
              </Link>
            </li>
            <li>
              <Link activeClassName={styles.active} href='/sign-in'>
                <a className="nav-link">Sign in</a>
              </Link>
            </li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default NavComponent;