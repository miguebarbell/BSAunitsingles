import styled from "styled-components";
import {Container} from "./Success";
import {useLocation} from "react-router-dom";
import Fuse from "fuse.js";
import {findProduct} from "../redux/apiCalls";


const SearchResults = () => {
    const location = useLocation();
    // console.log(location.pathname)
    const query = location.pathname.split('/').slice(2,location.pathname.split('/').length)
    // console.log(query)
    const Results = async (query) => {
        // console.log(query)
        const options = {
            keys: [
                {
                    name: 'title',
                    weight: 0.4
                }, {
                    name: 'desc',
                    weight: 0.3
                }, {
                    name: 'sku',
                    weight: 0.3
                }]
        }
        const res = await findProduct(query)
        // const fuse = new Fuse(res.data, options)
        // const results = fuse.search(query.join('/').toLowerCase()).map(item => item.item)
        console.log(res)
    }
    Results(query.join('/'))

    return (
        <Container style={{backgroundColor:"white"}}>
            <h1>Showing search results for: <strong>{query.join('/')}</strong></h1>

        </Container>

    )

}

export default SearchResults