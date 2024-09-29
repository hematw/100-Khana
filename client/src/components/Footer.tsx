import { Facebook, GitHub, Linkedin, Twitter } from "react-feather";

export const Footer = () => {
  return (
    <footer className="relative bg-gray-200 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          {/*  Left column  */}
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold text-gray-700">
              Let's keep in touch!
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-gray-600">
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6 flex">
              {/*  Social Media Icons  */}
              <a
                href="https://www.x.com/_hematw"
                className="bg-blue-400 text-white shadow-lg h-10 w-10 flex items-center justify-center rounded-full mr-2"
              >
                <Twitter />
              </a>
              <a
                href="https://www.facebook.com/hemat.w"
                className="bg-blue-500 text-white shadow-lg h-10 w-10 flex items-center justify-center rounded-full mr-2"
              >
                <Facebook />
              </a>
              <a
                href="https://www.linkedin.com/in/hematw"
                className="bg-sky-600 text-white shadow-lg h-10 w-10 flex items-center justify-center rounded-full mr-2"
              >
                <Linkedin />
              </a>
              <a
                href="https://www.github.com/hematw"
                className="bg-gray-800 text-white shadow-lg h-10 w-10 flex items-center justify-center rounded-full mr-2"
              >
                <GitHub />
              </a>
            </div>
          </div>

          {/*  Right column  */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              {/*  Useful Links  */}
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-gray-500 text-sm font-semibold mb-2">
                  Useful Links
                </span>
                <ul className="list-none">
                  <li>
                    <a
                      className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Free Products
                    </a>
                  </li>
                </ul>
              </div>

              {/*  Other Resources  */}
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-gray-500 text-sm font-semibold mb-2">
                  Other Resources
                </span>
                <ul className="list-none">
                  <li>
                    <a
                      className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/*  Footer Bottom Section  */}
        <div className="flex flex-wrap items-center justify-between text-center">
          <div className="w-full  px-4 mx-auto tracking-wide">
            <div className="text-sm text-gray-500 font-semibold py-1">
              Copyright ©{" "}
              <span id="get-current-year">{new Date().getFullYear()}</span>
              <a href="#" className="text-gray-500 hover:text-gray-800">
                {" "}
                100-Khana by Hematullah Waziri(Atom).
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
