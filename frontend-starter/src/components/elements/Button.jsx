import {twMerge} from "tailwind-merge";

const Button = ({...props}) => {
    return (
      <button type={props.type} className={twMerge("btn btn-primary", props.className)} onClick={props.onClick} disabled={props.loading}>
        {props.loading ? (
          <>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span> Loading...</span>
          </>
        ): (
          <>
            {props.hasId ? 'Save Changes': (<>{props.label}</>)}
          </>
        )}
      </button>
    )
}

export default Button
