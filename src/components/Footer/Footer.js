import React from 'react';
import { Link } from "react-router-dom";
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="footer">
        <p className="footer__copyright">© 2020 Supersite, Powered by News API</p>
        <div className="footer__menu">
          <ul class="footer__links">
            <li>
              <Link className="footer__link footer__link_home" to="/" exact={true}>Home</Link>
            </li>
            <li>
              <a className="footer__link footer__link_practicum" href="https://practicum.yandex.com/" target="_tab">
                Practicum by Yandex
              </a>
            </li>
          </ul>
          <ul className="footer__social">
            <li>
              <button
                className="footer__social-button"
                type="button"
                aria-label="Twitter"
                onClick=""
              >
                <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9998 0.89473C5.41678 0.89473 0.894531 5.42318 0.894531 11C0.894531 15.4664 3.7915 19.2505 7.80507 20.5904C8.30754 20.6834 8.49364 20.3733 8.49364 20.1003C8.49364 19.8584 8.48744 19.2256 8.48123 18.382C5.67111 18.9899 5.07559 17.0297 5.07559 17.0297C4.61654 15.8634 3.95278 15.5533 3.95278 15.5533C3.03469 14.9267 4.02102 14.9391 4.02102 14.9391C5.03217 15.0136 5.57186 15.9813 5.57186 15.9813C6.47135 17.5259 7.93534 17.0793 8.51225 16.8187C8.6053 16.1674 8.86584 15.7207 9.15119 15.4664C6.90558 15.2121 4.54831 14.3436 4.54831 10.4727C4.54831 9.36851 4.93912 8.46902 5.59047 7.76184C5.48501 7.5075 5.13762 6.47775 5.68972 5.0882C5.68972 5.0882 6.53958 4.81525 8.46882 6.12416C9.27526 5.90084 10.1375 5.78918 10.9998 5.78297C11.8559 5.78918 12.7243 5.90084 13.5308 6.12416C15.46 4.81525 16.3099 5.0882 16.3099 5.0882C16.862 6.47775 16.5146 7.5075 16.4091 7.76184C17.0543 8.46902 17.4451 9.36851 17.4451 10.4727C17.4451 14.356 15.0816 15.2059 12.8298 15.4602C13.1896 15.7704 13.5184 16.3907 13.5184 17.3336C13.5184 18.6859 13.5059 19.7715 13.5059 20.1065C13.5059 20.3795 13.6858 20.6896 14.2007 20.5904C18.2143 19.2505 21.1051 15.4664 21.1051 11.0062C21.1051 5.42318 16.5828 0.89473 10.9998 0.89473Z" fill="#191717" />
                </svg>
              </button>
            </li>
            <li>
              <button
                className="footer__social-button"
                type="button"
                aria-label="Facebook"
                onClick=""
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.8958 0H1.10417C0.494167 0 0 0.494167 0 1.10417V18.8967C0 19.5058 0.494167 20 1.10417 20H10.6833V12.255H8.07667V9.23667H10.6833V7.01083C10.6833 4.4275 12.2608 3.02083 14.5658 3.02083C15.67 3.02083 16.6183 3.10333 16.895 3.14V5.84L15.2967 5.84083C14.0433 5.84083 13.8008 6.43667 13.8008 7.31V9.2375H16.79L16.4008 12.2558H13.8008V20H18.8975C19.5058 20 20 19.5058 20 18.8958V1.10417C20 0.494167 19.5058 0 18.8958 0V0Z" fill="black" />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>

    </footer>
  );
}
