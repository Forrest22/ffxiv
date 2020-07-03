import React, { Component } from 'react'
import cn from 'classnames'

import zf from '../foundation.scss'
import styles from './HighOrLow.scss'

class HighOrLow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tb1: null,
      tb2: null,
      me: null
    }

    this.handleOnInputTb1 = this.handleOnInputTb1.bind(this)
    this.handleOnInputTb2 = this.handleOnInputTb2.bind(this)
    this.handleOnInputMe = this.handleOnInputMe.bind(this)
    this.noop = () => {}
  }

  componentDidMount () {
    document.title = 'High or Low'
  }

  handleOnInputTb1 (event) {
    this.setState({ tb1: this.getDigitFromEvent(event) })
  }

  handleOnInputTb2 (event) {
    this.setState({ tb2: this.getDigitFromEvent(event) })
  }

  handleOnInputMe (event) {
    this.setState({ me: this.getDigitFromEvent(event) })
  }

  getDigitFromEvent (event) {
    // Support 'Clear', 'Cut', 'EraseEof'?
    if (event.key === 'Backspace' || event.key === 'Delete') {
      return null
    } else {
      const digit = Number(event.key)
      return digit && digit >= 1 && digit <= 9 ? digit : null
    }
  }

  render () {
    const { tb1, tb2, me } = this.state
    const handleOnChange = this.noop

    const tb1Error = tb1 && (tb1 === tb2 || tb1 === me)
    const tb2Error = tb2 && (tb2 === tb1 || tb2 === me)
    const meError = me && (me === tb1 || me === tb2)

    let complete = false
    let tbEv, meEv
    if (tb1 && tb2 && me && !tb1Error && !tb2Error && !meError) {
      complete = true
      tbEv = 7 * (tb1 + tb2)
      meEv = 5 * me + 45
    }

    return (
      <>
        <h1>High or Low</h1>
        <div className={styles.container}>
          <div className={cn(styles.card, tb1Error && styles.error)}>
            <input type='text' onChange={handleOnChange} onKeyDown={this.handleOnInputTb1} value={tb1 || ''} />
          </div>
          <div className={cn(styles.card, tb2Error && styles.error)}>
            <input type='text' onChange={handleOnChange} onKeyDown={this.handleOnInputTb2} value={tb2 || ''} />
          </div>
          <div className={cn(styles.card, styles.hidden)} />
          <br />
          <div className={cn(styles.card, meError && styles.error)}>
            <input type='text' onChange={handleOnChange} onKeyDown={this.handleOnInputMe} value={me || ''} />
          </div>
          <div className={cn(styles.card, styles.hidden)} />
          <div className={cn(styles.card, styles.hidden)} />
          <br />
          {complete && (
            <span className={styles.result}>
              You are {meEv > tbEv ? <b>High</b> : meEv < tbEv ? <b>Low</b> : <><b>High</b> or <b>Low</b></>}
            </span>
          )}
        </div>

        <div className={cn(zf.gridX, zf.gridPaddingX)}>
          <div className={zf.cell}>
            {(tb1Error || tb2Error || meError) &&
              <><strong>Error</strong><p>Cannot have two of the same number.</p></>}
          </div>
        </div>
      </>
    )
  }
}

export default HighOrLow
