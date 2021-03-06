const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes');


// express app
const app = express();

// CONNECTION TO MONGODB AND LISTENING FOR REQUESTS
const dbURI = 'mongodb+srv://Vicky:test12345@blog-site.gxcfd.mongodb.net/blog-site?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));


// register view engine
app.set('view engine', 'ejs');


// listen for requests
// app.listen(3000);

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
/*
  app.get('/add-blog', (req,res) => {
    const blog = new Blog({
      title: 'new blog 2',
      snippet: 'about my new blog',
      body: 'more about my new blog'
    });

    blog.save()
      .then((result) => {
        res.send(result)
      })
      .catch((err) => {
        console.log(err);
      });
  })

  app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
  })

  app.get('/single-blog', (req, res) => {
    Blog.findById('5f6c56c05b08a918a05d0495')
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  */

/*
app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path)
  console.log('method: ', req.method);
  next();
});

app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
});
*/
app.get('/', (req,res) => {
 // res.send('<p>Home page</p>');
   //res.sendFile('./views/index.html', { root:__dirname});

   res.redirect('/blogs');

  //  const blogs = [
  //    {
  //      title: "Yoshi finds eggs",
  //      snippet: "Lorem ipsum dolor sit amet consectetur",
  //    },
  //    {
  //      title: "Mario finds stars",
  //      snippet: "Lorem ipsum dolor sit amet consectetur",
  //    },
  //    {
  //      title: "How to defeat bowser",
  //      snippet: "Lorem ipsum dolor sit amet consectetur",
  //    },
    
  //  ];
  //  res.render('index', { title: 'Home', blogs});
});

app.get('/about', (req, res) => {
//  res.send("<p>About page</p>");
  // res.sendFile('./views/about.html', { root:__dirname});
  res.render('about', { title: 'About'});
});



/*
// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});
*/

// blog routes
app.use('/blogs', blogRoutes);



// 404 page
app.use((req, res) => {
 // res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.status(404).render("404", { title: '404' });
});