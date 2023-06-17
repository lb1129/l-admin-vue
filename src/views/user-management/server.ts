interface UserType {}

interface UserQueryParams {}

export const getUserById = (id: string) => {}

export const saveUser = (user: UserType) => {}

export const getUsers = (queryParams: UserQueryParams) => {}

export const deleteUsersByIds = (ids: string[]) => {}
