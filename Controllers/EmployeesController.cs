using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using ThynkWebApp.Models;

namespace ThynkWebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeesController : Controller
    {
        private readonly ThynkTaskContext _context;

        public EmployeesController(ThynkTaskContext context)
        {
            _context = context;
        }

        [HttpGet()]
        [Route("[action]")]
        public IEnumerable<Employee> GetAll()
        {
            ThynkTaskContext db = new();
            return db.Employees.ToArray();
        }

        [HttpGet()]
        [Route("[action]/{id?}")]
        public Employee GetEmployee(int? id)
        {
            ThynkTaskContext db = new();
            return db.Employees.Where(x => x.EmployeeId == id).SingleOrDefault();   
          
        }

        [HttpPost()]
        [Route("[action]")]
        public int AddEmployee(JObject employee)
        {
            ThynkTaskContext db = new();
            Employee emp = new Employee();
            emp.Name = (string)employee["name"];
            emp.JobRole = (string)employee["jobRole"];
            emp.Motto = (string)employee["motto"];
            emp.Hobbies = (string)employee["hobbies"];
            emp.Hometown = (string)employee["hometown"];
            emp.PersonalBlog = (string)employee["personalBlog"];
            emp.Photo = (string)employee["photo"] != null ? Convert.FromBase64String((string)employee["photo"]) : null;
            db.Employees.Add(emp);
            return db.SaveChanges();            
        }

        [HttpPost()]
        [Route("[action]")]
        public int UpdateEmployee(JObject employee)
        {
            ThynkTaskContext db = new();
            var employeeResult = db.Employees.Where(x => x.EmployeeId == (int)employee["employeeId"]).SingleOrDefault();
            
            if (employeeResult != null)
            {
                employeeResult.Name = (string)employee["name"];
                employeeResult.JobRole = (string)employee["jobRole"];
                employeeResult.Motto = (string)employee["motto"];
                employeeResult.Hobbies = (string)employee["hobbies"];
                employeeResult.Hometown = (string)employee["hometown"];
                employeeResult.PersonalBlog = (string)employee["personalBlog"];              
                employeeResult.Photo = (string)employee["photo"] != null ? Convert.FromBase64String((string)employee["photo"]) : null;
                       
                           
                return db.SaveChanges();
            }
            return 0;
        }

        [HttpDelete()]
        [Route("[action]/{id?}")]
        public int DeleteEmployee(int? id)
        {
            ThynkTaskContext db = new();
            var employeeResult = db.Employees.Where(x => x.EmployeeId == id).SingleOrDefault();
            db.Employees.Remove(employeeResult);
            return db.SaveChanges();          
        }

    }
}
