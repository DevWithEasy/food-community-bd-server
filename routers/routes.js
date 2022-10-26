const authRouter = require("./authRouter")
const aboutRouter = require("./aboutRouter")
const jobRouter = require("./jobRouter")
const postRouter = require("./postRouter")
const commentRouter = require("./commentRouter")
const replyRouter = require("./replyRouter")

const routes = [
  {
    path: "/api/auth",
    handler : authRouter
  },
  {
    path: "/api/friend",
    handler : authRouter
  },
  {
    path: "/api/about",
    handler : aboutRouter
  },
  {
    path: "/api/job",
    handler : jobRouter
  },
  {
    path: "/api/post",
    handler : postRouter
  },
  {
    path: "/api/comment",
    handler : commentRouter
  },
  {
    path: "/api/reply",
    handler : replyRouter
  },
  {
    path: "/",
    handler : (req, res) =>{
      res.send("Alhamdulillah.Server is ready !")
    }
  }
]

const applyRoutes = (app)=>{
  routes.map(r=>{
    if(r.path === "/"){
      app.get(r.path,r.handler)
    }else{
      app.use(r.path,r.handler)
    }
  })
}

module.exports = applyRoutes
