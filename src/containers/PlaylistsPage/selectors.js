import { createSelector } from 'reselect'
import { initialState } from './reducer'

export const selectFilters = (state) => state.filters || initialState.filters

export const selectFiltersResource = createSelector(
  selectFilters,
  (substate) => substate.resource,
)

export const selectFiltersIsLoading = createSelector(
  selectFilters,
  (substate) => substate.isLoading,
)

export const selectPlaylistsDomain = (state) => state.playlists || initialState.playlists

export const selectPlaylistsResource = createSelector(
  selectPlaylistsDomain,
  (substate) => substate.resource,
)

export const selectPlaylistsIsLoading = createSelector(
  selectPlaylistsDomain,
  (substate) => substate.isLoading,
)

export const selectPlaylistsError = createSelector(
  selectPlaylistsDomain,
  (substate) => substate.error,
)

export const selectFilterValues = (state) => state.filterValues || initialState.filterValues

export const selectNormalizedFilterValues = createSelector(
  selectFilterValues,
  (filters) => {
    const normalizedFilterValues = { ...filters }
    const page = parseInt(filters.offset, 10)

    if (page) {
      const limit = parseInt(filters.limit || 0, 10)
      normalizedFilterValues.offset = limit + page
    }

    return normalizedFilterValues
  },
)
