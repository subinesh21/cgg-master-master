"use client"
import React from "react";

function ContactForm() {
    return (
        <form onSubmit={(e) => e.preventDefault()} id="contactForm" className="contact-form rmb-65 wow fadeInLeft delay-0-2s" name="contactForm" action="assets/php/form-process.php" method="post">
            <div className="section-title contact-title mb-55">
                <span className="sub-title mb-15">Contact With Us</span>
                <h3>Send Us Message</h3>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="text" id="name" name="name" className="form-control" defaultValue="" placeholder="Full Name" required="" data-error="Please enter your name" />
                        <div className="help-block with-errors" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="text" id="phone" name="phone" className="form-control" defaultValue="" placeholder="Phone Number" required="" data-error="Please enter your Phone Number" />
                        <div className="help-block with-errors" />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <input type="email" id="email" name="email" className="form-control" defaultValue="" placeholder="Email Address" required="" data-error="Please enter your Adderss" />
                        <div className="help-block with-errors" />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <textarea name="message" id="message" className="form-control" rows={4} placeholder="Write Message" required="" data-error="Please enter your Message" defaultValue={""} />
                        <div className="help-block with-errors" />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group mb-0">
                        <button type="submit" className="theme-btn style-two">
                            Send Message
                            <i className="fas fa-angle-double-right" />
                        </button>
                        <div id="msgSubmit" className="hidden" />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default ContactForm;
