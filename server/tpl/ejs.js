module.exports = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/4.1.1/css/bootstrap.min.css">
        <script src="https://cdn.bootcss.com/bootstrap/4.1.1/js/bootstrap.bundle.js"></script>
        <script src="https://cdn.bootcss.com/jquery/3.3.0/jquery.min.js"></script>
        <title>koa server HTML</title>
    </head>
    <body>
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <h1>hello<%= you %></h1>
                    <p>this is <%= me %></p>
                </div>
                <div class="col-md-4">
                    <p>hello world</p>
                </div>
            </div>
        </div>
    </body>
    </html>
`


// <% if (names.length) { %>
//     <ul>
//       <% names.forEach(function(name){ %>
//         <li foo='<%= name + "'" %>'><%= name %></li>
//       <% }) %>
//     </ul>
//   <% } %>


//   <html>
//   <head>
//     <script src="../ejs.js"></script>
//     <script id="users" type="text/template">
//       <% if (names.length) { %>
//         <ul>
//           <% names.forEach(function(name){ %>
//             <li><%= name %></li>
//           <% }) %>
//         </ul>
//       <% } %>
//     </script>
//     <script>
//       onload = function(){
//         var users = document.getElementById('users').innerHTML;
//         var names = ['loki', 'tobi', 'jane'];
//         var html = ejs.render(users, { names: names });
//         document.body.innerHTML = html;
//       }
//     </script>
//   </head>
//   <body>
//   </body>
// </html>