import styled from "styled-components";
import {navbarHeight} from "../components/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../redux/userRedux";

const Container = styled.div`
margin-top: ${navbarHeight};
`;
const Profile = () => {
    const user = useSelector(state => state.user.currentUser);

    const dispatch = useDispatch()
    const logout = () => dispatch(logOut());
    return (
        <Container>
            <div>{user.email}</div>
            <button onClick={() => logout()}>logout</button>
        </Container>
    )
};

export default Profile;