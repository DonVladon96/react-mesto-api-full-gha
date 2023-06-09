import React from 'react';
import { Navigate } from 'react-router-dom';

// function ProtectedRoute(props, children) {
// 	if (!props.isLoggiedIn) {
// 		return <Navigate to='/sign-in' />;
// 	}
//
// 	return props.children;
// }

function ProtectedRoute({ component: Component, ...props }) {
	return(
		props.isLoggiedIn ? <Component {...props} /> : <Navigate to='/sign-in' replace/>
	);
}

export default ProtectedRoute;