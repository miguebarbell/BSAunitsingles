import styled from "styled-components";
import {navbarHeight, yellow} from "../components/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../redux/userRedux";

const Container = styled.div`
    margin-top: ${navbarHeight};
    width: 70vw;
    min-width: 200px;
    max-width: 1980px;
`;
const LogoutBtn = styled.button`
    font-weight: bold;
    border-radius: 5px;
background-color: red;
    border: 0;
    padding: 0.25rem 0.5rem;
    &:hover {
        background-color: ${yellow};
        color: red;
    }
`;
const EditBtn = styled.button`
    font-weight: bold;
    border-radius: 5px;
    background-color: dodgerblue;
    border: 0;
    padding: 0.25rem 0.5rem;
    &:hover {
        background-color: ${yellow};
        color: dodgerblue;
    }
`;
const Profile = () => {
    const user = useSelector(state => state.user.currentUser);

    const dispatch = useDispatch()
    const logout = () => dispatch(logOut());
    return (
        <Container>
            <h1>Hello {user.name} {user.lastName}</h1>
            <EditBtn>Edit Account</EditBtn>
            <h2>Orders</h2>
            <div>|date|number|total|</div>
            <LogoutBtn onClick={() => logout()}>LOG OUT</LogoutBtn>
        </Container>
    )
};

export default Profile;