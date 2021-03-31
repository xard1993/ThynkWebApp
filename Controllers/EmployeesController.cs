using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
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
    }
}
