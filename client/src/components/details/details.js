import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import "../../assets/css/custermized.css"
const MySwal = withReactContent(Swal)

export default (el) => {
    MySwal.fire({
        title: <p>Details</p>,
        html:
            <div className="text-align-left">
                <div>Name: {el.data.metadata.name}</div>
                <div>Owner: 0x{el._id}</div>
                <div>External Link: {el.data.metadata.external_url}</div>
                <div>Block chain: {el.data.metadata.chain}</div>
                <div>Type: {el.data.metadata.type}</div>
                <div>Description: {el.data.metadata.description}</div>
            </div>

    })
}

