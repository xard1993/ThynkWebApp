using System;
using System.Collections.Generic;

#nullable disable

namespace ThynkWebApp.Models
{
    public partial class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string JobRole { get; set; }
        public byte[] Photo { get; set; }
        public string Motto { get; set; }
        public string Hobbies { get; set; }
        public string Hometown { get; set; }
        public string PersonalBlog { get; set; }
    }
}
