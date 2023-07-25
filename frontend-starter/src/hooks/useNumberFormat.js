const useNumberFormat = (price) => {
  return 'GHS' + new Intl.NumberFormat('us').format(price)
}

export default useNumberFormat

