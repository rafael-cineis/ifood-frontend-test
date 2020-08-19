/**
 *
 * PlaylistsPage
 *
 */

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import hashes from '../../utils/getTokenFromHash'
import PlaylistCard from '../../components/PlaylistCard'
import { StyledRouterLink } from '../../components/StyledLink'
import Text from '../../components/Text'

import {
  selectFiltersResource,
  selectFiltersIsLoading,
  selectPlaylistsError,
  selectPlaylistsResource,
} from './selectors'
import {
  fetchFiltersAction,
  fetchPlaylistsAction,
} from './actions'
import { ErrorWrapper, PlaylistsWrapper } from './styles'

const INTERVAL_TIME_TO_FETCH_PLAYLISTS = 30000

export function PlaylistsPage(props) {
  const {
    fetchFilters,
    fetchPlaylists,
    history,
    playlistsError,
  } = props

  useEffect(() => {
    let interval = null

    if (hashes.access_token) {
      fetchFilters()
      fetchPlaylists()

      interval = setInterval(() => {
        fetchPlaylists()
      }, INTERVAL_TIME_TO_FETCH_PLAYLISTS)
    } else {
      history.replace('/')
    }

    return () => {
      clearInterval(interval)
    }
  }, [fetchFilters, fetchPlaylists, history])

  const renderErrorMessage = () => (
    <ErrorWrapper>
      <p>Um erro ocorreu, tente novamente mais tarde!</p>
      <StyledRouterLink
        id="backToHome"
        to="/"
      >
        Voltar a tela inicial
      </StyledRouterLink>
    </ErrorWrapper>
  )

  const renderFiltersAndPlaylists = () => {
    const {
      playlistResponse: {
        message,
        playlists,
      },
    } = props

    return playlists ? (
      <div>
        <Text bold uppercase big>
          {message}
        </Text>
        <PlaylistsWrapper>
          {playlists.items.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              {...playlist}
            />
          ))}
        </PlaylistsWrapper>
      </div>
    ) : null
  }

  return (
    <div>
      {playlistsError ? renderErrorMessage() : renderFiltersAndPlaylists()}
    </div>
  )
}

PlaylistsPage.propTypes = {
  history: PropTypes.object.isRequired,
  fetchFilters: PropTypes.func.isRequired,
  fetchPlaylists: PropTypes.func.isRequired,
  playlistsError: PropTypes.object,
  playlistResponse: PropTypes.object.isRequired,
}

/* istanbul ignore next */
const mapStateToProps = createStructuredSelector({
  filters: selectFiltersResource,
  filtersIsLoading: selectFiltersIsLoading,
  playlistsError: selectPlaylistsError,
  playlistResponse: selectPlaylistsResource,
})

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => ({
  fetchFilters: () => {
    dispatch(fetchFiltersAction())
  },
  fetchPlaylists: () => {
    dispatch(fetchPlaylistsAction())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsPage)
