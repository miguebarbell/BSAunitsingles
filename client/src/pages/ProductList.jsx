import styled from "styled-components";
import Announcement, {announcementHeight} from "../components/Announcement";
// import Footer from "../components/Footer";
// import { navbarHeight } from "../components/Navbar";
// import { announcementHeight } from "../components/Announcement";
import Products from "../components/Products";
import {useLocation} from "react-router-dom";
import {useState} from "react";
import {navbarHeight} from "../components/Navbar";

const Container = styled.div`
  background-color: white;
  margin-top: calc(${navbarHeight} + ${announcementHeight});
`
// const Title = styled.h1`
//   margin-top: calc(${navbarHeight} + ${announcementHeight} + 20px);
//   text-transform:capitalize;
// `
const FilterContainer = styled.div`
    //margin-top: calc(${navbarHeight} + ${announcementHeight});
  margin-top: calc(${navbarHeight} + ${announcementHeight});
  padding-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`
const FilterText = styled.span`
  font-size: 20px;
  font-weight: bold;
`

const Filter = styled.div`

`

const Select = styled.select`
  padding: 5px;`
const Option = styled.option``

const ProductList = () => {
    const title = useLocation().pathname.split("/")[2];

    const [filter, setFilter] = useState({});
    const [sort, setSort] = useState("newest");
    const handleFilters = (e) => {
        const value = e.target.value;
        setFilter({
            ...filter,
            [e.target.name]: value,
        });
    }
    return (
        <Container>
            <Announcement/>
            {/*<Navbar/>*/}
            <FilterContainer>
                <Filter>
                    <FilterText>Motorcycle Model: </FilterText>
                    <Select name="model" onChange={handleFilters}>
                        <Option defaultValue value="All">All Models</Option>
                        <Option value="Fits All">Fits all</Option>
                        <Option value="C15">C15</Option>
                        {/*<Option>C15 Star</Option>*/}
                        {/*<Option>C15T Trials</Option>*/}
                        {/*<Option>C15S Scrambler</Option>*/}
                        {/*<Option>C15SS Sport Star</Option>*/}
                        {/*<Option>C15 Pastoral</Option>*/}
                        {/*<Option>C15 Starfire</Option>*/}
                        {/*<Option>C15 Roadster</Option>*/}
                        <Option value="B40">B40</Option>
                        {/*<Option>B40 Star</Option>*/}
                        {/*<Option>B40SS Sport Star</Option>*/}
                        {/*<Option>B40 Enduro Star</Option>*/}
                        {/*<Option>B40 Roughrider</Option>*/}
                        {/*<Option>WDB40</Option>*/}
                        {/*<Option>BSA 441</Option>*/}
                        {/*<Option>B44GP Grand Prix</Option>*/}
                        {/*<Option>B44 Enduro</Option>*/}
                        {/*<Option>B44 Victor</Option>*/}
                        {/*<Option>B44 Victor Special</Option>*/}
                        {/*<Option>B44 Roadster</Option>*/}
                        <Option value="C25">C25</Option>
                        {/*<Option>C25 Barracuda</Option>*/}
                        <Option value="B25">B25</Option>
                        {/*<Option>B25 Starfire</Option>*/}
                        {/*<Option>B25 Fleetstar</Option>*/}
                        <Option value="B44">B44</Option>
                        {/*<Option>B44 Shooting Star</Option>*/}
                        {/*<Option>B25T</Option>*/}
                        {/*<Option>B25SS</Option>*/}
                        {/*<Option>B50SS</Option>*/}
                        {/*<Option>B50T Trail</Option>*/}
                        {/*<Option>B50MX</Option>*/}
                        <Option value="B50">B50</Option>
                        <Option value="TR25">TR25</Option>
                        {/*<Option>TR25W Trophy</Option>*/}
                        {/*<Option>T25T</Option>*/}
                    </Select>
                </Filter>
                <Filter><FilterText>Sort: </FilterText>
                    <Select onChange={(e) => setSort(e.target.value)}>
                        <Option defaultValue value="newest" >Newest</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={title} filter={filter} sort={sort}/>
            {/*<Footer/>*/}
        </Container>
    )
}

export default ProductList