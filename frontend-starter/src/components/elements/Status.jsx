const Status = ({active}) => {
    return (
        <>
            {active === 1 ? (
                <span className='badge badge-success'>Active</span>
            ) : (
                <span className='badge badge-primary'>Inactive</span>
            )}

        </>
    )
}

export default Status
