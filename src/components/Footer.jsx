import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <div>
      <div className="mt-5">
        <footer
          className="text-center text-lg-start text-white"
          style={{ backgroundColor: "#323232" }}
        >
          <div className="container p-4 pb-0">
            <section className="">
              <div className="row">
                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">
                    The Original Dish
                  </h6>
                  <p>
                    The Original Dish is a recipe sharing platform where you can
                    find and share your favorite recipes.
                  </p>
                </div>

                <hr className="w-100 clearfix d-md-none" />

                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">
                    Recipes
                  </h6>
                  <p>
                    <a className="text-white">Bangladeshi</a>
                  </p>
                  <p>
                    <a className="text-white">Indian</a>
                  </p>
                  <p>
                    <a className="text-white">Chiness</a>
                  </p>
                  <p>
                    <a className="text-white">American</a>
                  </p>
                </div>

                <hr className="w-100 clearfix d-md-none" />

                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">
                    Useful links
                  </h6>
                  <p>
                    <a className="text-white">Account</a>
                  </p>
                  <p>
                    <a className="text-white">Become an Affiliate</a>
                  </p>
                  <p>
                    <a className="text-white">Help</a>
                  </p>
                </div>

                <hr className="w-100 clearfix d-md-none" />

                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                  <h6 className="text-uppercase mb-4 font-weight-bold">
                    Contact
                  </h6>
                  <p>
                    <i className="fas fa-home mr-3"></i> Mirpur, Dhaka,
                    Bangladesh
                  </p>
                  <p>
                    <i className="fas fa-envelope mr-3"></i>{" "}
                    theoriginaldish@gmail.com
                  </p>
                  <p>
                    <i className="fas fa-phone mr-3"></i> + 880 172 222 2222
                  </p>
                  <p>
                    <i className="fas fa-print mr-3"></i> + 880 172 333 3333
                  </p>
                </div>
              </div>
            </section>

            <hr className="my-3" />

            <section className="p-3 pt-0">
              <div className="row d-flex align-items-center">
                <div className="col-md-7 col-lg-8 text-center text-md-start">
                  <div className="p-3">
                    © 2024 Copyright :
                    <a className="text-white" href="#">
                      Rokonuzzaman Robin
                    </a>
                  </div>
                </div>

                <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                  <a
                    className="btn btn-outline-primary btn-floating m-1 text-white"
                    role="button"
                    href="https://www.linkedin.com/in/rokonuzzaman-robin-2a9721186/"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    className="btn btn-outline-primary btn-floating m-1 text-white"
                    role="button"
                    href="https://github.com/ZmnRobin"
                  >
                    <FaGithub />
                  </a>
                  <a
                    className="btn btn-outline-primary btn-floating m-1 text-white"
                    role="button"
                    href="https://www.facebook.com/profile.php?id=100023371494101"
                  >
                    <FaFacebook />
                  </a>
                </div>
              </div>
            </section>
          </div>
        </footer>
      </div>
    </div>
  );
}
