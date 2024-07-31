module.exports = {
    sendIdAndPassword: (name, id, password) => {
        return `<html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            /* Add some styles to the body to ensure full height */
            body, html {
              height: 100%;
              margin: 0;
            }
        
            /* Style the container div */
            div {
              background-color: yellow;
              width: 80%;
              height: 80%;
              padding: 20px;
            }
            h3{
              margin: 0px;
              padding: 0px;
            }
        
            /* Style the paragraphs inside the container */
            p {
              color: black; /* You can adjust the text color as needed */
              font-weight: 600;
              margin: 0px;
            }
          </style>
        </head>
        <body>
          <div>
            <h3>Hi,${name}</h3>
            <h4>Heres your credentials</h4>
            <p>Id : ${id}</p>
            <p>Password : ${password}</p>
          </div>
        </body>
        </html>`
    }
}