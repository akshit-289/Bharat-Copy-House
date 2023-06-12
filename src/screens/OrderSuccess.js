import { React, Link } from 'react'

function OrderSuccess() {

          return (
            // <meta charset="UTF-8">
            // <meta http-equiv="X-UA-Compatible" content="IE=edge">
            //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
            //     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
            //     <link rel="stylesheet" href="style.css" />
            //       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
          <div>
            <div className="container my-5">
              <div>
                <h1 className="text-center">Bharat Copy House</h1>
              </div>
              <div className="login-box m-auto mt-5 col-4 text-center">
                <h3 className="text-center">Order Successful</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-check-circle-fill text-success success-icon" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <h6>We will deliver your order within 6 days</h6>
                <Link to="/">Go To Home</Link>
              </div>
            </div>
            <div className="footer mt-auto bg-dark text-light fs-5 text-success text-center col">
              <h5>Useful Links</h5>
              <span>Terms</span>
              <span>Privacy</span>
              <span>About Us</span>
            </div>
          </div>
          )
}

        export default OrderSuccess;