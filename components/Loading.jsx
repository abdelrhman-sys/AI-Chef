export default function Loading(props) {
    if (props.loading) {
      return (<span id="container">
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
        </span>)  
    } else {
        return null;
    }
    
}