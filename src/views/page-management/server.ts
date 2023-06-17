interface PageType {}

interface PageQueryParams {}

export const getPageById = (id: string) => {}

export const savePage = (page: PageType) => {}

export const getPages = (queryParams: PageQueryParams) => {}

export const deletePagesByIds = (ids: string[]) => {}
