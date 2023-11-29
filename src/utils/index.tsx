export function shorten(input: string, max: number) {
  return input.length > max ? input.substr(0, max) + '...' : input
}

export function updateItem<T extends { _id: string }>(
  array: T[],
  id: string,
  update: Partial<T>,
) {
  const index = array.findIndex((el) => el._id === id)
  if (index === -1) return array
  const new_array = [...array]
  new_array[index] = {
    ...new_array[index],
    ...update,
  }
  return new_array
}

export function deleteItem<T extends { _id: string }>(array: T[], id: string) {
  const new_array = array.filter((el) => el._id !== id)
  return new_array
}
