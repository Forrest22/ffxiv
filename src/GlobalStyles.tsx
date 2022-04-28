import { makeStyles } from '@mui/material/styles'

const useStyles = makeStyles(theme => ({
  '@global': {
    section: {
      marginBottom: theme.spacing(5)
    },
    code: {
      fontFamily: 'Consolas, "Liberation Mono", Courier, monospace',
      'pre &': {
        fontSize: '1.125em'
      }
    }
  }
}))

const GlobalStyles = (): null => {
  useStyles()
  return null
}

export default GlobalStyles
