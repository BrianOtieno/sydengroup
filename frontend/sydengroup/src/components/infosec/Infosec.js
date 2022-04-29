import React, { useContext, useState} from 'react';
import { Link } from 'react-router-dom'; 
import { VectorMap } from "react-jvectormap"
import {Chart, ArcElement} from 'chart.js'
import axios from '../../api/axios';
import { UserContext } from '../../contexts/UserContext';
import { Form } from 'react-bootstrap';
// import DatePicker from "react-datepicker"; 

Chart.register(ArcElement);
 
const Infosec = () => {
  const [countryCode, setCountryCode] = useState(''); 
  const [offering, setOffering] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [token] = useContext(UserContext); 

   
  const handleSubmit = async (e) => {
    e.preventDefault();

    const COMPLIANCE_URL = '/faqs/add';

    const _faqRequestData = {"question" : searchTerm, "offering": offering, "jurisdiction": countryCode} 
    console.log(_faqRequestData)
    const _requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization : "Bearer " + token,
      },
      withCredentials: true,
      crossDomain: true
    } 

    try {
      const response = await axios.post(COMPLIANCE_URL, _faqRequestData, _requestOptions);
      console.log(JSON.stringify(response?.data));

    } catch (error) {
      alert("An error occurred!");
    }

  }

  const mapData = {
    // "BZ": 75.00,
    // "US": 56.25,
    // "AU": 15.45,
    // "GB": 25.00,
    // "RO": 10.25,
    // "GE": 33.25
  } 
    return (
      <div>   
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Requirements</h4>
                <div className="row">
                  <div className="col-md-5"> 
                  <Form.Group>
                    <div className="form-group">
                      <select className="form-control form-control-lg" id="exampleFormControlSelect2" value={offering} onChange={(e) => setOffering(e.target.value)}>
                        <option>Select Compliace</option>
                        <option> Financial regulatory requirements/obligations</option>
                        <option>Financial compliance (requirements/obligations and associated controls)</option>
                        <option>Financial regulatory SOC 2 compliance</option> 
                      </select>
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control form-control-lg" defaultValue={countryCode} placeholder='Select Jurisdiction From Map' id='country' required></input>
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control form-control-lg" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Enter Search Term' id='question'></input>
                    </div>
                    <div className="mt-3">
                        <Link className="d-flex btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn justify-content-center" onClick={handleSubmit} to="/dashboard">SEARCH</Link>
                    </div>
                    </Form.Group>

                    {/* <div className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-us"></i>
                            </td>
                            <td>USA</td>
                            <td className="text-right"> 1500 </td>
                            <td className="text-right font-weight-medium"> 56.35% </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-de"></i>
                            </td>
                            <td>Germany</td>
                            <td className="text-right"> 800 </td>
                            <td className="text-right font-weight-medium"> 33.25% </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-au"></i>
                            </td>
                            <td>Australia</td>
                            <td className="text-right"> 760 </td>
                            <td className="text-right font-weight-medium"> 15.45% </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-gb"></i>
                            </td>
                            <td>United Kingdom</td>
                            <td className="text-right"> 450 </td>
                            <td className="text-right font-weight-medium"> 25.00% </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-ro"></i>
                            </td>
                            <td>Romania</td>
                            <td className="text-right"> 620 </td>
                            <td className="text-right font-weight-medium"> 10.25% </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-br"></i>
                            </td>
                            <td>Brasil</td>
                            <td className="text-right"> 230 </td>
                            <td className="text-right font-weight-medium"> 75.00% </td>
                          </tr>
                        </tbody>
                      </table>
                    </div> */}
                  </div>
                  <div className="col-md-7">
                    <div id="audience-map" className="vector-map"></div>
                    <VectorMap
                    map={"world_mill"}
                    backgroundColor="transparent" //change it to ocean blue: #0077be
                    panOnDrag={true}
                    regionsSelectableOne={true}
                    markersSelectableOne={true}
                    containerClassName="dashboard-vector-map"
                    onRegionClick={(e, countryCode) => setCountryCode(countryCode)} 
                    focusOn= { {
                      x: 0.5,
                      y: 0.5,
                      scale: 1,
                      animate: true
                    }}
                    series={{
                      regions: [{
                        scale: ['#3d3c3c', '#f2f2f2'],
                        normalizeFunction: 'polynomial',
                        values: mapData
                      }]
                    }}
                  />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row ">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Recently Asked Questions</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </th>
                        <th> Name </th>
                        <th> Question </th>
                        {/* <th> Product Cost </th> */}
                        {/* <th> Project </th> */}
                        {/* <th> Payment Mode </th> */}
                        <th> Date Queried </th>
                        <th> Query Status </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="form-check form-check-muted m-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <img src={require('../../assets/images/dps/obrienotieno.jpeg')} alt="face" />
                            <span className="pl-2">Brian Otieno</span>
                          </div>
                        </td>
                        <td> Compliace on storage of credit information </td>
                        {/* <td> $14,500 </td> */}
                        {/* <td> Dashboard </td> */}
                        {/* <td> Credit card </td> */}
                        <td> 04 Mar 2022 </td>
                        <td>
                          <div className="badge badge-outline-success">Completed</div>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>       
      </div> 
    );
  // }
}

export default Infosec;