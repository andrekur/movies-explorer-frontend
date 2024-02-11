import { paginationMoviesSettings} from '../consts/consts'


export function getCountItemOnPage() {
  const windowWidth = window.screen.availWidth

  if (windowWidth >= 1280) {
    return paginationMoviesSettings.more
  }
  if (windowWidth >= 1001) {
    return paginationMoviesSettings.many
  }
  if (windowWidth >= 768) {
    return paginationMoviesSettings.medium
  }

  return paginationMoviesSettings.little
}