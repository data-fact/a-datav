/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/31.
 * Description:
 * Modified By:
 */
import React from 'react'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        console.error(error,info)
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <></>;
        }
        return this.props.children;
    }
}