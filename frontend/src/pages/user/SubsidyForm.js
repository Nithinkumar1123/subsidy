import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Card, Button, Form, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaRegFileAlt,
  FaMoneyCheckAlt,
  FaGraduationCap,
  FaTractor,
  FaHeartbeat,
  FaGlobe,
  FaHome,
  FaCar,
  FaBolt,
  FaArrowLeft, // Adding an arrow icon for the back button
} from 'react-icons/fa';
import 'animate.css';
import Header from '../Header';
import Footer from '../Footer';

const SubsidyForm = () => {
  const { type } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || 'Guest'; // Retrieve username from state or fallback to 'Guest'
  ; // For navigating back
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    details: '',
    income: '',
    educationLevel: '',
    landSize: '',
    healthCondition: '',
    region: '',
    houseType: '',
    rentOrLoan: '',
    dependents: '',
    vehicleType: '',
    transportationCost: '',
    commuteDistance: '',
    energySource: '',
    energyBill: '',
    energyConsumption: '',
  });
  const [applicationNumber, setApplicationNumber] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Mapping form types to background images
  const bgImages = {
    education: '/images/education-bg.jpg',
    agriculture: '/images/agriculture-bg.jpg',
    health: '/images/health-bg.jpg',
    housing: '/images/housing-bg.jpg',
    transportation: '/images/transportation-bg.jpg',
    energy: '/images/energy-bg.jpg',
    default: '/images/default-bg.jpg',
  };

  // Get the background image based on the form type
  const bgImage = bgImages[type] || bgImages.default;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setApplicationNumber(null);
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/subsidy', {
        username,
        type,
        ...formData,
      });
      setApplicationNumber(response.data.applicationNumber);
      setFormData({
        name: '',
        email: '',
        phone: '',
        details: '',
        income: '',
        educationLevel: '',
        landSize: '',
        healthCondition: '',
        region: '',
        houseType: '',
        rentOrLoan: '',
        dependents: '',
        vehicleType: '',
        transportationCost: '',
        commuteDistance: '',
        energySource: '',
        energyBill: '',
        energyConsumption: '',
      });
    } catch (error) {
      setError('Failed to submit the subsidy form. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderDynamicFields = () => {
    switch (type) {
      case 'education':
        return (
          <>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formEducationLevel" className="mb-4">
                  <Form.Label>
                    <FaGraduationCap /> Highest Level of Education
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    required
                    placeholder="E.g., Undergraduate, Postgraduate"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formIncome" className="mb-4">
                  <Form.Label>
                    <FaMoneyCheckAlt /> Parent's Annual Income (INR)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="income"
                    value={formData.income}
                    onChange={handleChange}
                    required
                    placeholder="Enter annual income"
                  />
                </Form.Group>
              </Col>
            </Row>
          </>
        );

      case 'agriculture':
        return (
          <>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formLandSize" className="mb-4">
                  <Form.Label>
                    <FaTractor /> Land Size (in acres)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="landSize"
                    value={formData.landSize}
                    onChange={handleChange}
                    required
                    placeholder="Enter land size"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formRegion" className="mb-4">
                  <Form.Label>
                    <FaGlobe /> Region/Location
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                    placeholder="Enter your region"
                  />
                </Form.Group>
              </Col>
            </Row>
          </>
        );

      case 'health':
        return (
          <>
            <Row>
              <Col md={12}>
                <Form.Group controlId="formHealthCondition" className="mb-4">
                  <Form.Label>
                    <FaHeartbeat /> Health Condition
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="healthCondition"
                    value={formData.healthCondition}
                    onChange={handleChange}
                    required
                    placeholder="Describe your health condition"
                  />
                </Form.Group>
              </Col>
            </Row>
          </>
        );

      case 'housing':
        return (
          <>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formHouseType" className="mb-4">
                  <Form.Label>
                    <FaHome /> House Type
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="houseType"
                    value={formData.houseType}
                    onChange={handleChange}
                    required
                    placeholder="E.g., Rented, Owned"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formRentOrLoan" className="mb-4">
                  <Form.Label>
                    <FaMoneyCheckAlt /> Monthly Rent/Loan (INR)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="rentOrLoan"
                    value={formData.rentOrLoan}
                    onChange={handleChange}
                    required
                    placeholder="Enter monthly rent or loan"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formDependents" className="mb-4">
                  <Form.Label>
                    <FaUser /> Number of Dependents
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="dependents"
                    value={formData.dependents}
                    onChange={handleChange}
                    required
                    placeholder="Enter number of dependents"
                  />
                </Form.Group>
              </Col>
            </Row>
          </>
        );

      case 'transportation':
        return (
          <>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formVehicleType" className="mb-4">
                  <Form.Label>
                    <FaCar /> Vehicle Type
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    required
                    placeholder="E.g., Car, Bike, Public Transport"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formTransportationCost" className="mb-4">
                  <Form.Label>
                    <FaMoneyCheckAlt /> Monthly Transportation Cost ( INR)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="transportationCost"
                    value={formData.transportationCost}
                    onChange={handleChange}
                    required
                    placeholder="Enter monthly transportation cost"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formCommuteDistance" className="mb-4">
                  <Form.Label>
                    <FaGlobe /> Commute Distance (km)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="commuteDistance"
                    value={formData.commuteDistance}
                    onChange={handleChange}
                    required
                    placeholder="Enter commute distance"
                  />
                </Form.Group>
              </Col>
            </Row>
          </>
        );

      case 'energy':
        return (
          <>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formEnergySource" className="mb-4">
                  <Form.Label>
                    <FaBolt /> Energy Source
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="energySource"
                    value={formData.energySource}
                    onChange={handleChange}
                    required
                    placeholder="E.g., Solar, Electricity"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEnergyBill" className="mb-4">
                  <Form.Label>
                    <FaMoneyCheckAlt /> Monthly Energy Bill ( INR)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="energyBill"
                    value={formData.energyBill}
                    onChange={handleChange}
                    required
                    placeholder="Enter monthly energy bill"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formEnergyConsumption" className="mb-4">
                  <Form.Label>
                    <FaRegFileAlt /> Energy Consumption (kWh)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="energyConsumption"
                    value={formData.energyConsumption}
                    onChange={handleChange}
                    required
                    placeholder="Enter energy consumption"
                  />
                </Form.Group>
              </Col>
            </Row>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div
        className="subsidy-bg"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <Container className="my-5 animate__animated animate__fadeIn">
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="shadow-lg rounded-4 subsidy-card">
                <Card.Body>
                  <h1 className="text-center text-gradient mb-4">
                    Apply for {type.charAt(0).toUpperCase() + type.slice(1)} Subsidy
                  </h1>

                  

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="formName" className="mb-4">
                          <Form.Label>
                            <FaUser /> Full Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formEmail" className="mb-4">
                          <Form.Label>
                            <FaEnvelope /> Email
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="formPhone" className="mb-4">
                          <Form.Label>
                            <FaPhoneAlt /> Phone Number
                          </Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="Enter your phone"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formDetails" className="mb-4">
                          <Form.Label>
                            <FaRegFileAlt /> Additional Details
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            placeholder="Provide additional info"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    {renderDynamicFields()}
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 py-2 mt-3"
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        'Submit Application'
                      )}
                    </Button>
                  </Form>
                  {applicationNumber && (
                    <Alert variant="success" className="mt-4">
                      Application submitted successfully! Application Number:{' '}
                      <strong>{applicationNumber}</strong>
                    </Alert>
                  )}
                  {error && (
                    <Alert variant="danger" className="mt-4">
                      {error}
                    </Alert>
                  )}
                  {/* Back Button */}
                  <br></br><Button
      variant="outline"
      className="mb-3"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        borderRadius: '30px',
        border: '2px solid rgb(1, 8, 16)',
        backgroundColor: 'transparent',
        color: 'black',
        transition: 'all 0.3s ease', // Smooth transition
        boxShadow: '0 4px 8px rgba(0, 123, 255, 0.2)', // Soft shadow
      }}
      onClick={() => navigate('/login/user')} // Navigate to /user on button click
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = 'black';
        e.target.style.color = 'white';
        e.target.style.boxShadow = '0 6px 12px rgba(0, 123, 255, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'transparent';
        e.target.style.color = 'black';
        e.target.style.boxShadow = '0 4px 8px rgba(0, 123, 255, 0.2)';
      }}
    >
      <FaArrowLeft style={{ transition: 'transform 0.3s ease' }} />
      Back to Dashboard
    </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default SubsidyForm;
