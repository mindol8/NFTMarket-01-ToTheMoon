import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import "../../assets/css/custermized.css"
const MySwal = withReactContent(Swal)

export default (el) => {
    MySwal.fire({
        title: <p>Details</p>,
        html:
            <div className="text-align-left">
                <div>Name: {el.name}</div>
                <div>External Link: {el.link}</div>
                <div>Block chain: {el.chain}</div>
                <div>Type: {el.type}</div>
                <div>Description: {el.description}</div>
            </div>

    })
}


/*
 `\n
        \n
        \n
        \n
        
        `

*/