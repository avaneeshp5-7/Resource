import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { APT_CALL } from '../services/apiCall';

class ResorceList extends Component {
    constructor(props) {
        super();
        this.state = {
            resorce: []
        }
    }
    componentDidMount() {
        this.getResorce();
    }
    getResorce() {
        APT_CALL.resorceList().then((res) => {
            if (res && res?.result) {
                this.setState({ resorce: res.result })
            }
        });
    }
    render() {
        return (
            <div>
                <div className='col-md-6 mt-5 resource border-light shadow-sm' style={{ margin: 'auto' }}>
                    <h3>Resources</h3>
                    {this.state.resorce?.length?
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Resource</th>
                                <th>Vendor</th>
                                <th>Technology</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.resorce?.map((val,i)=><tr key={i}>
                                <td>{val?.full_name}</td>
                                <td>{val?.vendor_name}</td>
                                <td>{val?.technology}</td>
                            </tr>)}
                        </tbody>
                    </table>:"No data found"}
                    <Link className='mt-2 ml-3' to="/">Go Back</Link>
                </div>
            </div>
        );
    }
}

export default ResorceList;