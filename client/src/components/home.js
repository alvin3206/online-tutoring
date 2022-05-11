import React, { Component } from 'react';
import { Container, Row, Col, Button, Carousel, Form } from 'react-bootstrap';

class Home extends React.Component {

    render() {
        return (
            <div>
                <Container className="p-4 mt-4">
                    <Row className="flex-lg-row-reverse align-items-center g-5">
                        <Col lg="6">
                            <Carousel indicators={false}>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="./images/landing-image-1.jpg"
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="./images/landing-image-2.jpg"
                                        alt="Second slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="/images/landing-image-3.jpg"
                                        alt="Third slide"
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                        <Col lg="6">
                            <h1 className="display-6 fw-bold lh-1 mb-3 brand-font">Always Exploring</h1>
                            <p className="lead">Get a tutor 24/7 in 40+ subjects including Math, Science and English. We help thousands of
                                students get better grades every day. Get an expert tutor now.</p>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                <Button variant="success" size="lg" className="px-4 me-md-2" href="/register">Start Explore</Button>
                                <Button variant="outline-secondary" size="lg" className="px-4" href="#benefit">Learn More</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container id="benefit" className="p-4">
                    <Col>
                        <h2 className="pb-2 border-bottom brand-font">Benefits</h2>
                        <Row className="g-4 py-4 row-cols-1 row-cols-lg-3">
                            <Col>
                                <div className="feature-icon bg-success bg-gradient">
                                    <i className="bi bi-person-check"></i>
                                </div>
                                <h2 className="brand-font">Verified tutors</h2>
                                <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and
                                    probably just keep going until we run out of words.</p>
                                <a href="#" className="/register">
                                    Call to action
                                    <i className="bi bi-chevron-right"></i>
                                </a>
                            </Col>
                            <Col>
                                <div className="feature-icon bg-success bg-gradient">
                                    <i className="bi bi-calendar4-week"></i>
                                </div>
                                <h2 className="brand-font">Flexible time</h2>
                                <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and
                                    probably just keep going until we run out of words.</p>
                                <a href="#" className="/register">
                                    Call to action
                                    <i className="bi bi-chevron-right"></i>
                                </a>
                            </Col>
                            <Col>
                                <div className="feature-icon bg-success bg-gradient">
                                    <i className="bi bi-piggy-bank"></i>
                                </div>
                                <h2 className="brand-font">Money saver</h2>
                                <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and
                                    probably just keep going until we run out of words.</p>
                                <a href="#" className="/register">
                                    Call to action
                                    <i className="bi bi-chevron-right"></i>
                                </a>
                            </Col>
                        </Row>
                    </Col>
                </Container>

                <Container className="p-4">
                    <Row className="align-items-center g-lg-5 py-5 justify-content-center">
                    <Col lg="7">
                            <h1 className="text-center display-6 fw-bold lh-1 mb-3 brand-font">Get your free lessons</h1>
                            <figure>
                                <blockquote className="text-center blockquote">
                                    <p>You don’t have to be great to start, but you have to start to be great.</p>
                                </blockquote>
                                <figcaption className="text-center blockquote-footer">
                                    Zig Ziglar
                                </figcaption>
                            </figure>
                        </Col>
                        {/* <Col lg="7" className="text-center text-lg-start">
                            <h1 className="display-6 fw-bold lh-1 mb-3 brand-font">Get your free lessons</h1>
                            <figure>
                                <blockquote className="blockquote">
                                    <p>You don’t have to be great to start, but you have to start to be great.</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    Zig Ziglar
                                </figcaption>
                            </figure>
                        </Col>
                        <Col lg="5" className="mx-auto">
                            <Form className="p-4 p-md-5 border rounded-3 bg-light">
                                <div className="form-floating mb-3">
                                    <Form.Control type="email" id="floatingInput" placeholder="name@example.com" />
                                    <Form.Label >Email address</Form.Label>
                                </div>
                                <div className="form-floating mb-3">
                                    <Form.Control type="password" id="floatingPassword" placeholder="Password" />
                                    <Form.Label >Password</Form.Label>
                                </div>
                                <div className="checkbox mb-3">
                                    <Form.Check type="checkbox" value="remember-me" label="Remember me" />
                                </div>
                                <Button variant="success" size="lg" className="w-100" type="submit">Sign up</Button>
                                <hr className="my-4" />
                                <small className="text-muted">By clicking Sign up, you agree to the terms of use.</small>
                            </Form>
                        </Col> */}
                    </Row>
                </Container>

            </div>
        );
    }
}

export default Home;