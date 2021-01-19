import React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'
import Results from './Results'
import { ThemeConsumer } from '../contexts/theme'
import {Link} from 'react-router-dom'

function Instructions() {
	return (
    <ThemeConsumer>
    {(t) => (
        <div className='instructions-container'>
        <h1 className='center-text header-lg'>
          Instructions
        </h1>
        <ol className='container-sm grid center-text battle-instructions'>
          <li>
            <h3 className='header-sm'>
              Enter two Github users
            </h3>
            <FaUserFriends className={`bg-${t.theme}`} color='rgb(255,191,116)' size={140} />
          </li>
          <li>
            <h3 className='header-sm'>
              Battle
            </h3>
            <FaFighterJet className={`bg-${t.theme}`} color='#727272' size={140} />
          </li>
          <li>
            <h3 className='header-sm'>
              SeeTheWinners
            </h3>
            <FaTrophy className={`bg-${t.theme}`} color='rgb(255,215,0)' size={140} />
          </li>
        </ol>
      </div>
    )}
    </ThemeConsumer>
	)
}

class PlayerInput extends React.Component {
  state = {
    username: ''
  }

	handleSubmit = (event) => {
		event.preventDefault()

		this.props.onSubmit(this.state.username)
	}
	//STEP 2: Handlechange is called
	handleChange = (event) => {
		this.setState({
			//STEP 3: which sets the state of username to changed input
			username: event.target.value
		})
	}

	render() {
		return (
      <ThemeConsumer>
      {({ theme }) => (
        <form className='column player' onSubmit={this.handleSubmit}>
          <label className='label' htmlFor='username'>
            {this.props.label}
          </label>
          <div className='row player-inputs'>
            <input
              type='text'
              id='username'
              className={`input-${theme}`}
              placeholder='github username'
              autoComplete='off'
              //STEP 4: which updates the value of the input field
              value={this.state.username}
              //STEP 1: when user types something in input box
              onChange={this.handleChange}
            />
            <button
              className={`btn ${theme === 'dark' ? 'light' : 'dark'}-btn`}
              type='submit'
              disabled={!this.state.username}
            >
            Submit
            </button>
          </div>
        </form>
      )}
      </ThemeConsumer>
		)
	}
}

PlayerInput.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired
}

function PlayerPreview ({ username, onReset, label }) {
  return (
    <div className='column player'>
      <h3 className='player-label'>{label}</h3>
      <div className='row bg-light'>
        <div className='player-info'>
          <img
            className='avatar-small'
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
          />
          <a
            href={`https://github.com/${username}`}
            className='link'>
              {username}
          </a>
        </div>
        <button className='btn-clear flex-center' onClick={onReset}>
          <FaTimesCircle color='rgb(194, 57, 42)' size={26} />
        </button>
      </div>
    </div>
  )
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default class Battle extends React.Component {
  state = {
    playerOne: null,
    playerTwo: null,
  }

	handleSubmit = (id, player) => {
		this.setState({
			[id]: player
		})
		console.log(this.state)
	}

	handleReset = (id) => {
		this.setState({
			[id]: null
		})
	}

	render() {
		const {playerOne, playerTwo} = this.state


		return (
			<React.Fragment>
				<Instructions />

				<div className='players-containers'>
					<h1 className='center text header-lg'>
						Players
					</h1>
					<div className='row space-around'>
						{playerOne === null
              ? <PlayerInput
                  label='Player One'
                  onSubmit={(player) => this.handleSubmit('playerOne', player)}
                />
              : <PlayerPreview
                  username={playerOne}
                  label='Player One'
                  onReset={() => this.handleReset('playerOne')}
                />
            }

            {playerTwo === null
              ? <PlayerInput
                  label='Player Two'
                  onSubmit={(player) => this.handleSubmit('playerTwo', player)}
                />
              : <PlayerPreview
                  username={playerTwo}
                  label='Player Two'
                  onReset={() => this.handleReset('playerTwo')}
                />
            }
					</div>

					<div>
						{playerOne && playerTwo && (
							// <button
							// 	className='btn dark-btn btn-space'
							// 	onClick={()=> this.setState({
							// 		battle: true
							// 	})}
							// >
							// 	Battle
							// </button>
              <Link
                className='btn dark-btn btn-space'
                to={{
                  pathname: '/battle/results',
                  search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
                }}
              >
                Battle
              </Link>
						)}
					</div>
				</div>
			</React.Fragment>
		)
	}
}