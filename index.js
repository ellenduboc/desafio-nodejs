const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

function checkProjectsExist (req, res, next) {
  if (!projects[req.params.id]){
    
    return res.status(400).json({Error: "Project does not exists"})
  }

  return next();

}

server.post('/projects', (req,res) => {
  const { id } = req.body;
  const { title } = req.body;

  projects.push({Id: id, Title: title, tasks: []});

  return res.json(projects);
  
});

server.get('/projects', (req,res) => {
  
  return res.json(projects);

});

server.put('/projects/:id', checkProjectsExist, (req,res) => {
  const { id } = req.params
  const { title } = req.body;


  projects[id].title = title

  return res.json(projects);


});

server.delete('/projects/:id', checkProjectsExist, (req,res) => {
  const { id } = req.params

  projects.splice(id,1);

  return res.json(projects);

});

server.post('/projects/:id/tasks', checkProjectsExist, (req,res) => {
  const { title } = req.body;
  const { id } = req.params;

  projects[id].tasks.push(title); 

  return res.json(projects);

});

server.listen(4200)

