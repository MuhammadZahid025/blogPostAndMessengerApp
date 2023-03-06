import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";



const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLogedIn, setIsLogedIn] = useState(false)

    const checkUserToken = () => {
        const userToken = localStorage.getItem('token');
        if (!userToken || userToken === 'undefined' || userToken === null) {
            setIsLogedIn(false)
            return navigate("/signin")
        }
        setIsLogedIn(true)

    }
    useEffect(() => {
        checkUserToken();
    }, [isLogedIn]);

    return (
        <>
            {isLogedIn ? props.children : navigate('/signin')}
        </>
    )
}
export default ProtectedRoute;