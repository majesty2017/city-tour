const NoDataFound = ({title}) => {
    return (
        <div style={{
          width: '100%',
          minHeight: 40
        }}>
          <div className='mt-3 w-100 text-center' style={{
            position: "absolute",
            top: 150
          }}>
            <p className='text-warning'>No {title} Found!</p>
          </div>
        </div>
    )
}

export default NoDataFound
