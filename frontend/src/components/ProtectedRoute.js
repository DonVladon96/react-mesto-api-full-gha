import { Navigate } from 'react-router-dom';

function ProtectedRoute(props, children) {
	if (!props.isLoggiedIn) {
		return <Navigate to='/sign-in' />;
	}

	return props.children;
}

export default ProtectedRoute;