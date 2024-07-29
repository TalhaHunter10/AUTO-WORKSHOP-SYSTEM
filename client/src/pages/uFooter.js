import { InstagramFilled } from "@ant-design/icons"
import { FacebookFilled } from "@ant-design/icons"
import { TwitterSquareFilled } from "@ant-design/icons"
const UFooter = () => {
  return (
    <div className="bg-blue-950">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">

            <img src="/images/f-logo.png" className="h-12 me-8 -ml-2" alt="Auto-AI logo" />

            <div className="mt-2 text-stone-200 dark:text-stone-200 font-medium">
              <p>Block Number 6,</p><p>centre, I&T, G-7/1 G 7/1 G-7,</p> <p>Islamabad, Islamabad Capital Territory, Pakistan</p><br></br>
              <p>+92-333-5188007</p><br></br>
              <p>auto-ai-workshop@outlook.com</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Our Services</h2>
              <ul className="text-stone-200 dark:text-stone-200 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">Body Work</a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">Electrical</a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">Air Conditioning</a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">Alloy Repairing</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Mechanical</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
              <ul className="text-stone-200 dark:text-stone-200 font-medium">
                <li className="mb-4">
                  <a href="https://flowbite.com/" className="hover:underline">Privacy Policy</a>
                </li>
                <li>
                  <a href="https://tailwindcss.com/" className="hover:underline">Terms & Conditions</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white md:ml-7">Follow Us</h2>
              <div className="flex mt-4 sm:justify-center sm:mt-0">
                <a href="#" className="text-stone-200 hover:text-stone-200 dark:hover:text-white">
                  <FacebookFilled />
                  <span className="sr-only">Facebook page</span>
                </a>
                <a href="#" className="text-stone-200 hover:text-stone-200 dark:hover:text-white ms-5">
                  <InstagramFilled />
                  <span className="sr-only">Instagram page</span>
                </a>
                <a href="#" className="text-stone-200 hover:text-stone-200 dark:hover:text-white ms-5">
                <TwitterSquareFilled />
                  <span className="sr-only">X page</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-stone-200 sm:text-center dark:text-stone-200">© 2024  <a href="https://flowbite.com/" className="hover:underline">Auto Workshop System™</a>. All Rights Reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default UFooter;
