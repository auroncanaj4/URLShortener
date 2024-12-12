const homeUrl = `http://localhost:5173/`;
const errorPage = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>URL Expired</title>
        <style>
          body {
            text-align: center;
            margin: 0;
            display: flex;
            height:100vh;
            justify-content: center;
            flex-direction: column;
            align-content: center;
            align-items: center;
            gap: 1rem;
            font-family: Arial;
            background-color: #eef5f3;
          }
          h1 {
            margin: 0;
            color: #92278f;
            font-size: 100px;
            font-weight: 900;
          }
          span{
            font-size: 18px;
            font-weight: 800;
          }
          p {
            margin:0
          }
          a {
            text-decoration: none;
            padding: 0.5rem;
            border-radius: 1rem;
            color: white;
            background-color: #92278f;
            transition: 0.5s ease
          }
          a:hover{   
            box-shadow:0 0 8px 1px #00000080;
            cursor:pointer;
          }
        </style>
      </head>
      <body>
        <h1>Oops!!</h1>
        <span>404 - PAGE NOT FOUND</span>
        <p>The link you are trying to visit has <i>expired</i> and is no longer valid.</p>
        <a href=${homeUrl}>Go back to homepage</a>
      </body>
    </html>
  `;

export default { errorPage };
