import React from "react";
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";
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
            <div className="sweet-loading" id="spinning_page2">
                <ScaleLoader css={override} height={35} width={4} radius={2} margin={2} color={"#E90078"} loading={this.state.loading} speedMultiplier={1.5} />
            </div>
        );
    }
}

export default AwesomeComponent;
