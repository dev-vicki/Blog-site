const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { result } = require('lodash');


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


// routes



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

app.get('/blogs/create', (req,res) => {
  res.render('create', { title: 'Create a new Blog' });
})

// blog routes

app.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    })
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
        res.render('details', { blog: result, title: 'Blog Details' });
      })
      .catch(err => {
        console.log(err);
      });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
     .catch(err => {
       console.log(err);
     })
});

/*
// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});
*/


// 404 page
app.use((req, res) => {
 // res.status(404).sendFile('./views/404.html', { root: __dirname });
  res.status(404).render("404", { title: '404' });
});