import React from "react";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import '../../../css/ComponentStyle.css'

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class AwesomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    render() {
        return (
            <div className="sweet-loading" id="spinning_page">
                <HashLoader css={override} size={50} color={"#FF0DE0"} loading={this.state.loading} speedMultiplier={1.5} />
            </div>
        );
    }
}

export default AwesomeComponent;
