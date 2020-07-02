import React, { Component, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import cn from 'classnames'

import zf from './foundation.scss'
import styles from './App.scss'

function kebabCase (str) {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-')
}

const routes = [{
  title: 'Mini Cactpot',
  component: React.lazy(() => import('./mini-cactpot/MiniCactpot.jsx'))
}, {
  title: 'Ocean Fishing',
  component: React.lazy(() => import('./ocean-fishing/OceanFishing.jsx'))
}]

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      theme: window.localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
    }

    this.handleOnSwitchTheme = this.handleOnSwitchTheme.bind(this)

    if (this.state.theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }

  handleOnSwitchTheme () {
    const newTheme = this.state.theme === 'light' ? 'dark' : 'light'
    this.setState({ theme: newTheme })
    window.localStorage.setItem('theme', newTheme)

    if (newTheme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }

  render () {
    const { theme } = this.state

    return (
      <Router>
        <header>
          <div className={zf.gridContainer}>
            <nav className={zf.topBar}>
              <div className={zf.topBarLeft}>
                <Link to='/'>FFXIV</Link>
              </div>
              <div className={zf.topBarRight}>
                <FontAwesomeIcon icon={faSun} />
                <div className={cn(zf.switch, zf.tiny)}>
                  <input
                    type='checkbox'
                    id='theme-switch'
                    className={zf.switchInput}
                    checked={theme === 'dark'}
                    onChange={this.handleOnSwitchTheme}
                  />
                  <label className={zf.switchPaddle} htmlFor='theme-switch' />
                </div>
                <FontAwesomeIcon icon={faMoon} />
              </div>
            </nav>
          </div>
        </header>
        <main className={zf.gridContainer}>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path='/' component={Home} />
              {routes.map(route =>
                <Route
                  key={route.title}
                  path={'/' + kebabCase(route.title)}
                  component={route.component}
                />)}
              <Route component={_404} />
            </Switch>
          </Suspense>
        </main>
      </Router>
    )
  }
}

class Home extends Component {
  render () {
    return (
      <>
        <h1>Home</h1>
        <ul className={styles.pages}>
          {routes.map(route =>
            <li key={route.title}>
              <Link to={'/' + kebabCase(route.title)}>{route.title}</Link>
            </li>
          )}
        </ul>
        <p>
          A bunch of FFXIV-related stuff I try making.<br />
          Message Lulu Pillow@Adamantoise or Pillowfication#0538 with questions or comments.
        </p>
      </>
    )
  }
}

class _404 extends Component {
  render () {
    return (
      <>
        <h1>404</h1>
        <p>This page does not exist.</p>
        <Link to='/' className={zf.button}>Go back home?</Link>
      </>
    )
  }
}

class Loading extends Component {
  render () {
    return <p>Loading...</p>
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
